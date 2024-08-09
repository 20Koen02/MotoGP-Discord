import Keyv from "keyv";
import { Event } from "./types/Event";
import { Session } from "./types/Session";
import { Ratelimit } from "./ratelimit";
import { Team } from "./types/Team";
import { RiderStats } from "./types/RiderStats";
import { RiderStatistics } from "./types/RiderStatistics";

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

  private async get<T>(url: string, ttl?: number): Promise<T | T[] | null> {
    const cachedData = await this.cache.get(url);
    if (cachedData) return cachedData;

    if (!this.ratelimit.check()) return null;

    const res = await fetch(url)
      .then((res) => res.json())
      .catch(() => null);
    if (!res) return null;

    await this.cache.set(url, res, ttl);
    return res as T | T[];
  }

  // 6 hour ttl
  async getEvents(seasonYear: number): Promise<Event[] | null> {
    const url = `https://api.motogp.pulselive.com/motogp/v1/events?seasonYear=${seasonYear}`;
    const data = (await this.get(url, 6 * 60 * 60 * 1000)) as Event[] | null;
    return data;
  }

  // 1 hour ttl
  async getSessions(eventUuid: string): Promise<Session | null> {
    const url = `https://api.motogp.pulselive.com/motogp/v1/events/${eventUuid}`;
    const data = (await this.get(url, 60 * 60 * 1000)) as Session | null;
    return data;
  }

  // 6 hour ttl
  async getTeams(seasonYear: number): Promise<Team[] | null> {
    const url = `https://api.motogp.pulselive.com/motogp/v1/teams?categoryUuid=737ab122-76e1-4081-bedb-334caaa18c70&seasonYear=${seasonYear}`;
    const data = (await this.get(url, 6 * 60 * 60 * 1000)) as Team[] | null;
    return data;
  }

  // 1 hour ttl
  async getRiderStats(rider: number): Promise<RiderStats | null> {
    const url = `https://api.motogp.pulselive.com/motogp/v1/riders/${rider}/stats`;
    const data = (await this.get(url, 60 * 60 * 1000)) as RiderStats | null;
    return data;
  }

  // 1 hour ttl
  async getRiderStatistics(rider: number): Promise<RiderStatistics[] | null> {
    const url = `https://api.motogp.pulselive.com/motogp/v1/riders/${rider}/statistics`;
    const data = (await this.get(url, 60 * 60 * 1000)) as
      | RiderStatistics[]
      | null;
    return data;
  }
}
