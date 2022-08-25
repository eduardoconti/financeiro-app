export class TransferenceRequestDTO {
  id?: number;
  carteiraOrigemId!: number;
  carteiraDestinoId!: number;
  valor!: number;
  transferencia?: Date | string;
  pago?: boolean;

  constructor(obj: TransferenceRequestDTO) {
    Object.assign(this, obj);
  }

  static build = (obj: TransferenceRequestDTO): TransferenceRequestDTO => {
    return new TransferenceRequestDTO(obj);
  };
}
