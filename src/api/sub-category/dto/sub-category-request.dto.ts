export class SubCategoryRequestDTO {
  id?: number;
  categoryId!: number;
  description!: string;

  private constructor(subCategoryRequestDTO: SubCategoryRequestDTO) {
    Object.assign(this, subCategoryRequestDTO);
  }

  static build = (subCategoryRequestDTO: SubCategoryRequestDTO): SubCategoryRequestDTO => {
    return new SubCategoryRequestDTO(subCategoryRequestDTO);
  };
}
