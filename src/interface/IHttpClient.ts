import { AxiosResponse, AxiosError } from "axios";

export interface IHttpClient {
  get<T>(url: string, config: {}): Promise<AxiosResponse<T>> | AxiosError<T>;
  post<T>(url: string, config: any, data: any): Promise<AxiosResponse<T>>;
  put<T>(url: string, config: any, data?: any): Promise<AxiosResponse<T>>;
  delete<T>(url: string, config: any, data: any): Promise<AxiosResponse<T>>;
}
