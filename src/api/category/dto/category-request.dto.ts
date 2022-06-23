export class CategoryRequestDTO {
  id?: number;
  descricao!: string;

  private constructor(descricao: string, id?: number) {
    this.descricao = descricao;
    this.id = id;
  }

  static build = ({
    descricao,
    id,
  }: CategoryRequestDTO): CategoryRequestDTO => {
    return new CategoryRequestDTO(descricao, id);
  };
}
