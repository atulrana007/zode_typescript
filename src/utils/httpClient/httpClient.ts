import { IHttpClient } from "../../interface";
import axios, { AxiosResponse, AxiosInstance } from "axios";

class HttpClient implements IHttpClient {
  private static instance: HttpClient | undefined = undefined;

  public static getInstance() {
    if (this.instance !== undefined) return this.instance;
    this.instance = new HttpClient(axios.create());
    return this.instance;
  }
  constructor(private readonly client: AxiosInstance) {}

  get = async <T>(url: string, config: {}): Promise<AxiosResponse<T>> => {
    const resp: AxiosResponse<T> = await this.client.get<any, AxiosResponse<T>>(
      url,
      { ...config }
    );
    return resp;
  };
  post = async <T>(
    url: string,
    config: {},
    data: any
  ): Promise<AxiosResponse<T>> => {
    const resp: AxiosResponse<T> = await this.client.post<
      any,
      AxiosResponse<T>
    >(url, { ...config }, data);
    return resp;
  };
  put = async <T>(
    url: string,
    config: {},
    data: any
  ): Promise<AxiosResponse<T>> => {
    const resp: AxiosResponse<T> = await this.client.post<
      any,
      AxiosResponse<T>
    >(url, { ...config }, data);
    return resp;
  };
  delete = async <T>(
    url: string,
    config: {},
    data: any
  ): Promise<AxiosResponse<T>> => {
    const resp: AxiosResponse<T> = await this.client.post<
      any,
      AxiosResponse<T>
    >(url, { ...config }, data);
    return resp;
  };
}

export const HttpClientInstance = HttpClient.getInstance();
