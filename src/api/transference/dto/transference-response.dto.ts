import { WalletResponseDTO } from "@api/wallet/dto";

export type TransferenceResponseDTO = {
  id: number;
  carteiraOrigem: WalletResponseDTO;
  carteiraDestino: WalletResponseDTO;
  valor: number;
  pago: boolean;
  transferencia: Date;
};
