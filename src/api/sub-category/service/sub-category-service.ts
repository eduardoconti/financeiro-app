import { HttpRequestService } from "api/http-request";
import { SuccessResponseData } from "api/http-request/dto";
import { SubCategoryRequestDTO, SubCategoryResponseDTO } from "../dto";
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
    const data = await this.httpRequestService.get<SubCategoryResponseDTO[]>(
      this.url.toString()
    );
    return data;
  }

  async delete(id: number): Promise<any> {
    const data = await this.httpRequestService.delete<any>({
      url: this.url.toString() + "/" + id,
    });
    return data;
  }

  async insert(
    body: SubCategoryRequestDTO
  ): Promise<SuccessResponseData<SubCategoryResponseDTO>> {
    const data = await this.httpRequestService.post<SubCategoryResponseDTO>(
      this.url.toString(),
      body
    );
    return data;
  }

  async update(
    body: SubCategoryRequestDTO
  ): Promise<SuccessResponseData<SubCategoryResponseDTO>> {
    const data = await this.httpRequestService.put<SubCategoryResponseDTO>({
      url: this.url.toString() + "/" + body.id,
      body,
    });
    return data;
  }
}
