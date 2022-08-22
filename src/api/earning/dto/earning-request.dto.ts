export class EarningRequestDTO {
  descricao!: string;
  carteiraId!: number;
  valor!: number;
  pagamento?: Date | string;
  pago?: boolean;

  constructor(
    descricao: string,
    valor: number,
    carteiraId: number,
    pagamento?: Date | string,
    pago?: boolean
  ) {
    this.descricao = descricao;
    this.valor = valor;
    this.carteiraId = carteiraId;
    this.pagamento = pagamento;
    this.pago = pago;
  }

  static build = ({
    descricao,
    valor,
    carteiraId,
    pagamento,
    pago,
  }: EarningRequestDTO): EarningRequestDTO => {
    return new EarningRequestDTO(descricao, valor, carteiraId, pagamento, pago);
  };
}
