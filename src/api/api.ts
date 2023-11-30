import Keyv from "keyv";
import { Event } from "./types/Event";
import { ClassConstructor, plainToInstance } from "class-transformer";
import { Session } from "./types/Session";
import { Ratelimit } from "./ratelimit";

export default class Api {
  public static instance: Api = new this();
  private ratelimit: Ratelimit;

  private cache: Keyv;

  constructor(ttl: number = 30 * 60 * 1000) {
    // 30 minutes ttl by default
    this.cache = new Keyv({ ttl });
    this.ratelimit = new Ratelimit([
      { name: "minute", interval: 60, limit: 50 },
      { name: "hour", interval: 60 * 60, limit: 200 },
      { name: "day", interval: 24 * 60 * 60, limit: 500 },
    ]);
  }

  private async get<T>(
    url: string,
    cls: ClassConstructor<T>,
    ttl?: number
  ): Promise<T | T[] | null> {
    const cachedData = await this.cache.get(url);
    if (cachedData) return cachedData;

    if (!this.ratelimit.check()) return null;

    const res = await fetch(url)
      .then((res) => res.json())
      .catch(() => null);
    if (!res) return null;
    const data = plainToInstance(cls, res);

    await this.cache.set(url, data, ttl);
    return data;
  }

  // 6 hour ttl
  async getEvents(seasonYear: number): Promise<Event[] | null> {
    const url = `https://api.motogp.pulselive.com/motogp/v1/events?seasonYear=${seasonYear}`;
    const data = (await this.get(url, Event, 6 * 60 * 60 * 1000)) as
      | Event[]
      | null;
    return data;
  }

  // 1 hour ttl
  async getSessions(eventUuid: string): Promise<Session | null> {
    const url = `https://api.motogp.pulselive.com/motogp/v1/events/${eventUuid}`;
    const data = (await this.get(
      url,
      Session,
      60 * 60 * 1000
    )) as Session | null;
    return data;
  }
}
