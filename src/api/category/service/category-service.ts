import { HttpRequestService } from "api/http-request";
import { SuccessResponseData } from "api/http-request/dto";

import { CategoryRequestDTO, CategoryResponseDTO } from "../dto";
import { ICategoryService } from "./category.service.interface";

const ENDPOINT = "category";

export class CategoryService implements ICategoryService {
  private url: URL;
  private httpRequestService: HttpRequestService;
  constructor() {
    this.url = new URL((process.env.REACT_APP_API_HOST + ENDPOINT) as string);
    this.httpRequestService = new HttpRequestService();
  }
  async getAll(): Promise<SuccessResponseData<CategoryResponseDTO[]>> {
    return await this.httpRequestService.get<CategoryResponseDTO[]>(
      this.url.toString()
    );
  }

  async delete(id: number): Promise<any> {
    return await this.httpRequestService.delete<any>({
      url: this.url.toString() + "/" + id,
    });
  }

  async insert(
    body: CategoryRequestDTO
  ): Promise<SuccessResponseData<CategoryResponseDTO>> {
    return await this.httpRequestService.post<CategoryResponseDTO>(
      this.url.toString(),
      body
    );
  }

  async update(
    body: CategoryRequestDTO
  ): Promise<SuccessResponseData<CategoryResponseDTO>> {
    const data = await this.httpRequestService.put<CategoryResponseDTO>({
      url: this.url.toString() + "/" + body.id,
      body,
    });
    return data;
  }
}
