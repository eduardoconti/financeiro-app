export class CategoryResponseDTO {
  id!: number;
  descricao!: string;
  userId?: string;

  private constructor(descricao: string, id: number, userId?: string) {
    this.descricao = descricao;
    this.userId = userId;
    this.id = id;
  }

  static build = ({
    descricao,
    userId,
    id,
  }: CategoryResponseDTO): CategoryResponseDTO => {
    return new CategoryResponseDTO(descricao, id, userId);
  };
}
