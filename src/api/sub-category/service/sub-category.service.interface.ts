import { SuccessResponseData } from "api/http-request/dto";
import { SubCategoryResponseDTO } from "../dto";

export interface ISubCategoryService {
  getAll(): Promise<SuccessResponseData<SubCategoryResponseDTO[]>>;
  delete(id: number): Promise<any>;
  insert(body: any): Promise<any>;
}