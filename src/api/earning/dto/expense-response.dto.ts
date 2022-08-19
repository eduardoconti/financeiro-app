import { WalletResponseDTO } from "@api/wallet/dto";

export type EarningResponseDTO = {
  id: number;
  descricao: string;
  carteira: WalletResponseDTO;
  valor: number;
  pago: boolean;
  pagamento: Date;
  updatedAt: Date;
  createdAt: Date;
}