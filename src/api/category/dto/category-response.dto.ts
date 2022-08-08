import { SubCategoryResponseDTO } from "api/sub-category/dto";

export type CategoryResponseDTO = {
  id: number;
  descricao: string;
  subCategories: SubCategoryResponseDTO[];
  userId?: string;
}
