import { SuccessResponseData } from "@api/http-request/dto";
import { WalletRequestDTO, WalletResponseDTO } from "../dto";
import { UpdateWalletRequestDTO } from "../dto/update-wallet-request.dto";

export interface IWalletService {
  getAll(): Promise<SuccessResponseData<WalletResponseDTO[]>>;
  delete(id: number): Promise<any>;
  insert(
    body: WalletRequestDTO
  ): Promise<SuccessResponseData<WalletResponseDTO>>;
  update(
    body: UpdateWalletRequestDTO
  ): Promise<SuccessResponseData<WalletResponseDTO>>;
}
