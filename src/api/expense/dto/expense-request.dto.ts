export class ExpenseDTO {
  id?: number;
  descricao!: string;
  categoriaId!: number;
  carteiraId!: number;
  subCategoryId!: number;
  valor!: number;
  instalment!: number;
  vencimento?: Date | string;
  pagamento?: Date | string;
  updatedAt?: Date | string;
  pago?: boolean;

  constructor(
    descricao: string,
    valor: number,
    categoriaId: number,
    subCategoryId: number,
    carteiraId: number,
    instalment: number,
    vencimento?: Date | string,
    pagamento?: Date | string,
    pago?: boolean,
    updatedAt?: Date | string
  ) {
    this.descricao = descricao;
    this.valor = valor;
    this.categoriaId = categoriaId;
    this.subCategoryId = subCategoryId;
    this.carteiraId = carteiraId;
    this.instalment = instalment;
    this.vencimento = vencimento;
    this.pagamento = pagamento;
    this.pago = pago;
    this.updatedAt = updatedAt;
  }

  static build = ({
    descricao,
    valor,
    categoriaId,
    subCategoryId,
    carteiraId,
    vencimento,
    pagamento,
    pago,
    updatedAt,
    instalment,
  }: ExpenseDTO): ExpenseDTO => {
    return new ExpenseDTO(
      descricao,
      valor,
      categoriaId,
      subCategoryId,
      carteiraId,
      instalment,
      vencimento,
      pagamento,
      pago,
      updatedAt
    );
  };
}
