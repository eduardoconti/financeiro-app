import axios, { AxiosInstance, AxiosResponse } from "axios";
import { getToken } from "common";
import { SuccessResponseData } from "./dto";

export class HttpRequestService {
  private api: AxiosInstance;

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
    const { data } = await this.api.get(url);
    return data;
  }

  async patch<D>(url: string, dto: any): Promise<SuccessResponseData<D>> {
    const { data } = await this.api.patch(url, dto);
    return data;
  }

  async post<D>(url: string, dto: any): Promise<SuccessResponseData<D>> {
    const { data } = await this.api.post(url, dto);
    return data;
  }
}
