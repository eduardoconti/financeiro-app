/* eslint-disable react-hooks/rules-of-hooks */
import { SuccessResponseData } from "@api/http-request/dto";
import {
  EarningDeleteResponseDTO,
  EarningRequestDTO,
  EarningResponseDTO,
} from "@api/earning/dto";
import { EarningService } from "@api/earning/service";
import create from "zustand";

const service = new EarningService();

export type FetchParams = {
  checked?: any;
  year?: number;
  month?: number;
};
export interface IUseEarning {
  earnings: EarningResponseDTO[];
  fetchEarnings: (params: FetchParams) => void;
  insertEarning: (
    earningRequest: EarningRequestDTO
  ) => Promise<SuccessResponseData<EarningResponseDTO>>;
  insertEarningNextMonth: (
    earningRequest: EarningRequestDTO
  ) => Promise<SuccessResponseData<EarningResponseDTO>>;
  updateEarning: (
    id: number,
    earningRequest: Partial<EarningRequestDTO>
  ) => Promise<SuccessResponseData<EarningResponseDTO>>;
  deleteEarning: (
    id: number
  ) => Promise<SuccessResponseData<EarningDeleteResponseDTO>>;
  updateFlagPayed: (
    id: number,
    patchFlag: Pick<EarningRequestDTO, "pago">
  ) => Promise<SuccessResponseData<EarningResponseDTO>>;
}
export const useEarning = create<IUseEarning>((set) => ({
  earnings: [],
  fetchEarnings: async (params: FetchParams) => {
    const { checked, year, month } = params;
    const { data } = await service.getEarning(checked, year, month);
    set((s) => ({ ...s, earnings: data }));
  },
  insertEarning: async (earningRequest: EarningRequestDTO) => {
    const data = await service.insert(earningRequest);
    set((state) => ({
      earnings: [...state.earnings, data.data].sort((a, b) =>
        a.valor > b.valor ? -1 : b.valor > a.valor ? 1 : 0
      ),
    }));
    return data;
  },
  insertEarningNextMonth: async (earningRequest: EarningRequestDTO) => {
    const data = await service.insert(earningRequest);
    return data;
  },
  updateEarning: async (
    id: number,
    earningRequest: Partial<EarningRequestDTO>
  ) => {
    const data = await service.update(id, earningRequest);
    set((state) => {
      const index = state.earnings.findIndex((earning) => earning.id === id);
      const newEarnings = [...state.earnings];
      newEarnings[index] = data.data;
      return { earnings: newEarnings };
    });
    return data;
  },
  deleteEarning: async (id: number) => {
    const data = await service.delete(id);
    set((state) => ({
      earnings: state.earnings.filter((earning) => earning.id !== id),
    }));
    return data;
  },
  updateFlagPayed: async (
    id: number,
    patchFlag: Pick<EarningRequestDTO, "pago">
  ) => {
    const data = await service.updateFlagPayed(id, patchFlag);
    set((state) => {
      const index = state.earnings.findIndex((earning) => earning.id === id);
      const newEarnings = [...state.earnings];
      newEarnings[index] = data.data;
      return { earnings: newEarnings };
    });
    return data;
  },
}));
