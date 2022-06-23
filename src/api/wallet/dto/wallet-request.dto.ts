export class WalletRequestDTO {
  id?: number;
  descricao!: string;

  private constructor(descricao: string, id?: number) {
    this.descricao = descricao;
    this.id = id;
  }

  static build = ({ descricao, id }: WalletRequestDTO): WalletRequestDTO => {
    return new WalletRequestDTO(descricao, id);
  };
}
