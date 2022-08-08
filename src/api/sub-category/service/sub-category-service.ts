import { HttpRequestService } from "api/http-request";
import { SuccessResponseData } from "api/http-request/dto";

import { SubCategoryResponseDTO } from "../dto";
import { ISubCategoryService } from "./sub-category.service.interface";

const ENDPOINT = "subcategory";

export class SubCategoryService implements ISubCategoryService {
  private url: URL;
  private httpRequestService: HttpRequestService;
  constructor() {
    this.url = new URL((process.env.REACT_APP_API_HOST + ENDPOINT) as string);
    this.httpRequestService = new HttpRequestService();
  }
  async getAll(): Promise<SuccessResponseData<SubCategoryResponseDTO[]>> {
    try {
      const data = await this.httpRequestService.get<SubCategoryResponseDTO[]>(
        this.url.toString()
      );
      return data;
    } catch (error: any) {
      return errorResponse(error);
    }
  }

  async delete(id: number): Promise<any> {
    try {
      const data = await this.httpRequestService.delete<any>({
        url: this.url.toString() + '/' + id
      }
      );
      return data;
    } catch (error: any) {
      return errorResponse(error);
    }
  }

  async insert(body: any): Promise<any> {
    try {
      const data = await this.httpRequestService.post<any>(this.url.toString(), body
      );
      return data;
    } catch (error: any) {
      return errorResponse(error);
    }
  }

}

function errorResponse(error: any) {
  return error.response.data;
}
