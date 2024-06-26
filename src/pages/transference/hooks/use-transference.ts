import { SuccessResponseData } from "@api/http-request/dto";
import {
  TransferenceDeleteResponseDTO,
  TransferenceRequestDTO,
  TransferenceResponseDTO,
} from "@api/transference/dto";
import { TransferenceService } from "@api/transference/service";
import create from "zustand";

const service = new TransferenceService();

export type FetchParams = {
  year?: number;
  month?: number;
};
export interface IUseTransference {
  transferences: TransferenceResponseDTO[];
  fetchTransferences: (params: FetchParams) => void;
  insertTransference: (
    transferenceRequest: TransferenceRequestDTO
  ) => Promise<SuccessResponseData<TransferenceResponseDTO>>;
  insertTransferenceNextMonth: (
    transferenceRequest: TransferenceRequestDTO
  ) => Promise<SuccessResponseData<TransferenceResponseDTO>>;
  updateTransference: (
    id: number,
    transferenceRequest: Partial<TransferenceRequestDTO>
  ) => Promise<SuccessResponseData<TransferenceResponseDTO>>;
  deleteTransference: (
    id: number
  ) => Promise<SuccessResponseData<TransferenceDeleteResponseDTO>>;
  updateFlagPayed: (
    id: number,
    patchFlag: Pick<TransferenceRequestDTO, "pago">
  ) => Promise<SuccessResponseData<TransferenceResponseDTO>>;
}
export const useTransference = create<IUseTransference>((set) => ({
  transferences: [],
  fetchTransferences: async (params: FetchParams) => {
    const { year, month } = params;
    const { data } = await service.getTransference(year, month);
    set({ transferences: data });
  },
  insertTransference: async (transferenceRequest: TransferenceRequestDTO) => {
    const data = await service.insert(transferenceRequest);
    set((state) => ({
      transferences: [...state.transferences, data.data].sort((a, b) =>
        a.valor > b.valor ? -1 : b.valor > a.valor ? 1 : 0
      ),
    }));
    return data;
  },
  insertTransferenceNextMonth: async (
    transferenceRequest: TransferenceRequestDTO
  ) => {
    const data = await service.insert(transferenceRequest);
    return data;
  },
  updateTransference: async (
    id: number,
    transferenceRequest: Partial<TransferenceRequestDTO>
  ) => {
    const data = await service.update(id, transferenceRequest);
    set((state) => {
      const index = state.transferences.findIndex(
        (transference) => transference.id === id
      );
      const newTransferences = [...state.transferences];
      newTransferences[index] = data.data;
      return { transferences: newTransferences };
    });
    return data;
  },
  deleteTransference: async (id: number) => {
    const data = await service.delete(id);
    set((state) => ({
      transferences: state.transferences.filter(
        (transference) => transference.id !== id
      ),
    }));
    return data;
  },
  updateFlagPayed: async (
    id: number,
    patchFlag: Pick<TransferenceRequestDTO, "pago">
  ) => {
    const data = await service.updateFlagPayed(id, patchFlag);
    set((state) => {
      const index = state.transferences.findIndex(
        (transference) => transference.id === id
      );
      const newTransferences = [...state.transferences];
      newTransferences[index] = data.data;
      return { transferences: newTransferences };
    });
    return data;
  },
}));
