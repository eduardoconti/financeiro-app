export class ExpenseDTO {
  id?: number;
  userId?: string;
  descricao!: string;
  categoriaId!: number;
  carteiraId!: number;
  valor!: number;
  vencimento?: Date | string;
  pagamento?: Date | string;
  updatedAt?: Date | string;
  pago?: boolean;

  constructor(
    descricao: string,
    valor: number,
    categoriaId: number,
    carteiraId: number,
    userId?: string,
    vencimento?: Date | string,
    pagamento?: Date | string,
    pago?: boolean,
    updatedAt?: Date | string
  ) {
    this.userId = userId;
    this.descricao = descricao;
    this.valor = valor;
    this.categoriaId = categoriaId;
    this.carteiraId = carteiraId;
    this.vencimento = vencimento;
    this.pagamento = pagamento;
    this.pago = pago;
    this.updatedAt = updatedAt;
  }

  static build = ({
    userId,
    descricao,
    valor,
    categoriaId,
    carteiraId,
    vencimento,
    pagamento,
    pago,
    updatedAt,
  }: ExpenseDTO): ExpenseDTO => {
    return new ExpenseDTO(
      descricao,
      valor,
      categoriaId,
      carteiraId,
      userId,
      vencimento,
      pagamento,
      pago,
      updatedAt
    );
  };
}
