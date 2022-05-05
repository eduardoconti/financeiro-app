export class GetExpenseAmountGroupByWalletResponse {
  readonly valor: number;
  readonly descricao: string;
  readonly id: number;

  private constructor(valor: number, descricao: string, id: number) {
    this.valor = valor;
    this.descricao = descricao;
    this.id = id;
  }

  static build = ({
    valor,
    descricao,
    id,
  }: GetExpenseAmountGroupByWalletResponse): GetExpenseAmountGroupByWalletResponse => {
    return new GetExpenseAmountGroupByWalletResponse(valor, descricao, id);
  };
}
