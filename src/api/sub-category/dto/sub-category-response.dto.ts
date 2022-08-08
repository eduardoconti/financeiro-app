import { CategoryResponseDTO } from "api/category/dto";

export class SubCategoryResponseDTO {
  id!: number;
  description!: string;
  categoryId!: number;
  category!: CategoryResponseDTO;

  private constructor(subCategoryResponseDTO: SubCategoryResponseDTO) {
    Object.assign(this, subCategoryResponseDTO);
  }

  static build = (subCategoryResponseDTO: SubCategoryResponseDTO): SubCategoryResponseDTO => {
    return new SubCategoryResponseDTO(subCategoryResponseDTO);
  }
}
