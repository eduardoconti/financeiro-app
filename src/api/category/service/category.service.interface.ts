import { SuccessResponseData } from "api/http-request/dto";
import { CategoryRequestDTO, CategoryResponseDTO } from "../dto";

export interface ICategoryService {
  getAll(): Promise<SuccessResponseData<CategoryResponseDTO[]>>;
  delete(id: number): Promise<any>;
  insert(
    body: CategoryRequestDTO
  ): Promise<SuccessResponseData<CategoryResponseDTO>>;
  update(
    body: CategoryRequestDTO
  ): Promise<SuccessResponseData<CategoryResponseDTO>>;
}
