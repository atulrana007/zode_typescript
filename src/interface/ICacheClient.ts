export interface ICacheClient {
  setex: (key: string, time: number, value: string) => void;
}
