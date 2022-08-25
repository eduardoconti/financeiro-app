import { SuccessResponseData } from "api/http-request/dto";
import { SubCategoryRequestDTO, SubCategoryResponseDTO } from "../dto";

export interface ISubCategoryService {
  getAll(): Promise<SuccessResponseData<SubCategoryResponseDTO[]>>;
  delete(id: number): Promise<any>;
  insert(
    body: SubCategoryRequestDTO
  ): Promise<SuccessResponseData<SubCategoryResponseDTO>>;
  update(
    body: SubCategoryRequestDTO
  ): Promise<SuccessResponseData<SubCategoryResponseDTO>>;
}
