import axios, { AxiosInstance } from "axios";
import { getToken } from "common";
import { SuccessResponseData } from "./dto";
import { HttpRequestErrorHandler } from "./error-handler/http-request-error-handler";

export type HttpRequestOptions = {
  url: string;
  body?: any;
};
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
    try {
      const { data } = await this.api.get<SuccessResponseData<D>>(url);
      return data;
    } catch (error) {
      throw HttpRequestErrorHandler.handle(error);
    }
  }

  async patch<D>(url: string, dto: any): Promise<SuccessResponseData<D>> {
    try {
      const { data } = await this.api.patch<SuccessResponseData<D>>(url, dto);
      return data;
    } catch (error) {
      throw HttpRequestErrorHandler.handle(error);
    }
  }

  async post<D>(url: string, dto: any): Promise<SuccessResponseData<D>> {
    try {
      const { data } = await this.api.post<SuccessResponseData<D>>(url, dto);
      return data;
    } catch (error) {
      throw HttpRequestErrorHandler.handle(error);
    }
  }

  async delete<D>(
    httpOptions: Pick<HttpRequestOptions, "url">
  ): Promise<SuccessResponseData<D>> {
    try {
      const { data } = await this.api.delete<SuccessResponseData<D>>(
        httpOptions.url
      );
      return data;
    } catch (error) {
      throw HttpRequestErrorHandler.handle(error);
    }
  }

  async put<D>(
    httpOptions: HttpRequestOptions
  ): Promise<SuccessResponseData<D>> {
    try {
      const { data } = await this.api.put<SuccessResponseData<D>>(
        httpOptions.url,
        httpOptions.body
      );
      return data;
    } catch (error) {
      throw HttpRequestErrorHandler.handle(error);
    }
  }
}
