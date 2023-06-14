export class WalletResponseDTO {
  id!: number;
  descricao!: string;
  userId?: string;
  active!: boolean

  private constructor(descricao: string, id: number, active: boolean, userId?: string) {
    this.descricao = descricao;
    this.userId = userId;
    this.id = id;
    this.active = active
  }

  static build = ({
    descricao,
    userId,
    id,
    active
  }: WalletResponseDTO): WalletResponseDTO => {
    return new WalletResponseDTO(descricao, id, active, userId);
  };
}
