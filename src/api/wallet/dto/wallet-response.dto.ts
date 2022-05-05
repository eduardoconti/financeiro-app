export class WalletResponseDTO {
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
  }: WalletResponseDTO): WalletResponseDTO => {
    return new WalletResponseDTO(descricao, id, userId);
  };
}
