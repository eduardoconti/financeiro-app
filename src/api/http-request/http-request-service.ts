import axios, { AxiosInstance } from "axios";
import { getToken } from "common";
import { SuccessResponseData } from "./dto";

export type HttpRequestOptions = {
  url: string;
  body?: any;
}
export class HttpRequestService {
  protected api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      headers: { "Content-Type": "application/json" },
    });

    this.api.interceptors.request.use(async (config) => {
      const token = getToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });
  }

  async get<D>(url: string): Promise<SuccessResponseData<D>> {
    const { data } = await this.api.get<SuccessResponseData<D>>(url);
    return data;
  }

  async patch<D>(url: string, dto: any): Promise<SuccessResponseData<D>> {
    const { data } = await this.api.patch<SuccessResponseData<D>>(url, dto);
    return data;
  }

  async post<D>(url: string, dto: any): Promise<SuccessResponseData<D>> {
    const { data } = await this.api.post<SuccessResponseData<D>>(url, dto);
    return data;
  }

  async delete<D>(httpOptions: Pick<HttpRequestOptions, 'url'>): Promise<SuccessResponseData<D>> {
    const { data } = await this.api.delete<SuccessResponseData<D>>(httpOptions.url);
    return data;
  }
}
