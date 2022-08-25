import { SuccessResponseData } from "@api/http-request/dto";
import {
  TransferenceDeleteResponseDTO,
  TransferenceRequestDTO,
  TransferenceResponseDTO,
} from "../dto";

export interface ITransferenceService {
  getTransference(
    stateYear?: number,
    stateMonth?: number
  ): Promise<SuccessResponseData<TransferenceResponseDTO[]>>;

  insert(
    Transference: TransferenceRequestDTO
  ): Promise<SuccessResponseData<TransferenceResponseDTO>>;
  update(
    id: number,
    Transference: Partial<TransferenceRequestDTO>
  ): Promise<SuccessResponseData<TransferenceResponseDTO>>;
  delete(
    id: number
  ): Promise<SuccessResponseData<TransferenceDeleteResponseDTO>>;
  updateFlagPayed(
    id: number,
    patchFlag: Pick<TransferenceRequestDTO, "pago">
  ): Promise<SuccessResponseData<TransferenceResponseDTO>>;
}
