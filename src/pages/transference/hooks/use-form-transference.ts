import { ValidationErrorDTO } from "@api/http-request/dto";
import create from "zustand";

export interface ITransferenceForm {
  id: number;
  description: string;
  walletOriginId: number;
  walletDestinyId: number;
  value: string;
  payed: boolean;
  transferenceDate?: string;
}

export interface IUseFormTransference {
  id: number;
  setId: (id: number) => void;
  walletOriginId: number;
  setWalletOriginId: (walletOriginId: number) => void;
  walletDestinyId: number;
  setWalletDestinyId: (walletDestinyId: number) => void;
  value: string;
  setValue: (value: string) => void;
  payed: boolean;
  setPayed: (payed: boolean) => void;
  transferenceDate?: string;
  setTransferenceDate: (transferenceDate?: string) => void;
  invalidFields?: ValidationErrorDTO[];
  setInvalidFields: (invalidFields: ValidationErrorDTO[]) => void;
  clearAllFields: () => void;
}

export const useFormTransference = create<IUseFormTransference>((set) => ({
  id: 0,
  setId: (id: number) => set((s) => ({ ...s, id: id })),
  walletOriginId: 0,
  setWalletOriginId: (walletOriginId: number) =>
    set((s) => ({ ...s, walletOriginId: walletOriginId })),
  walletDestinyId: 0,
  setWalletDestinyId: (walletDestinyId: number) =>
    set((s) => ({ ...s, walletDestinyId: walletDestinyId })),
  value: "",
  setValue: (value: string) => set((s) => ({ ...s, value: value })),
  payed: false,
  setPayed: (payed: boolean) => set((s) => ({ ...s, payed: payed })),
  transferenceDate: "",
  setTransferenceDate: (transferenceDate?: string) =>
    set((s) => ({ ...s, transferenceDate: transferenceDate })),
  invalidFields: [],
  setInvalidFields: (invalidFields: ValidationErrorDTO[]) =>
    set((s) => ({ ...s, invalidFields: invalidFields })),
  clearAllFields: () =>
    set({
      id: 0,
      walletOriginId: 0,
      walletDestinyId: 0,
      value: "",
      payed: false,
      invalidFields: [],
    }),
}));
