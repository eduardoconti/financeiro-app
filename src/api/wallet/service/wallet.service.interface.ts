import { SuccessResponseData } from "@api/http-request/dto";
import { WalletRequestDTO, WalletResponseDTO } from "../dto";

export interface IWalletService {
  getAll(): Promise<SuccessResponseData<WalletResponseDTO[]>>;
  delete(id: number): Promise<any>;
  insert(
    body: WalletRequestDTO
  ): Promise<SuccessResponseData<WalletResponseDTO>>;
  update(
    body: WalletRequestDTO
  ): Promise<SuccessResponseData<WalletResponseDTO>>;
}
