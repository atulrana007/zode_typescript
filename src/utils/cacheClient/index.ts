import redis, { RedisClient } from "redis";
import { ICacheClient } from "../../interface/ICacheClient";

export class CacheClient implements ICacheClient {
  private static instance: undefined | CacheClient = undefined;

  public static getInstance(client: RedisClient) {
    if (this.instance !== undefined) return this.instance;
    this.instance = new CacheClient(client);
    return this.instance;
  }
  constructor(private readonly client: RedisClient) {}

  setex = (key: string, time: number, value: string) => {
    this.client.setex(key, time, value);
  };
}

const REDIS_PORT = 6379;
const client = redis.createClient(REDIS_PORT);
export const cacheClientInstance = CacheClient.getInstance(client);
