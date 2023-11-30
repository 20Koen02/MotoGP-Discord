import { notify } from "../ntfy/ntfy";

export interface Limit {
  name: string;
  interval: number;
  limit: number;
}

export interface State {
  count: number;
  interval: NodeJS.Timeout;
}

export class Ratelimit {
  limits: Limit[];
  states: Map<string, State>;

  constructor(limits: Limit[]) {
    this.limits = limits;
    this.states = new Map();

    limits.forEach((limit) => {
      this.states.set(limit.name, {
        count: 0,
        interval: setInterval(() => {
          this.reset(limit.name);
        }, limit.interval * 1000),
      });
    });
  }

  private reset(name: string) {
    const state = this.states.get(name);
    if (!state) throw new Error("Invalid ratelimit name");
    state.count = 0;
  }

  private getLimit(name: string) {
    const limit = this.limits.find((l) => l.name === name);
    if (!limit) throw new Error("Invalid ratelimit name");
    return limit.limit;
  }

  public check() {
    let ok = true;

    for (const [name, state] of this.states) {
      state.count++;
      const limit = this.getLimit(name);

      if (state.count >= limit) {
        if (state.count === limit) {
          notify(
            "MotoGP Bot: Limit reached",
            `Rate limit reached of ${limit} requests per ${name} to the Pulselive API`,
            ["warning", "ratelimit"]
          );
        }
        ok = false;
      }
    }

    return ok;
  }
}
