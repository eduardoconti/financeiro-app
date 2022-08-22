import { ValidationErrorDTO } from "@api/http-request/dto";
import create from "zustand";

export interface IEarningForm {
  id: number;
  description: string;
  walletId: number;
  value: string;
  payed: boolean;
  paymentDate?: string;
}

export interface IUseFormEarning {
  id: number;
  setId: (id: number) => void;
  description: string;
  setDescription: (description: string) => void;
  walletId: number;
  setWalletId: (walletId: number) => void;
  value: string;
  setValue: (value: string) => void;
  payed: boolean;
  setPayed: (payed: boolean) => void;
  paymentDate?: string;
  setPaymentDate: (paymentDate?: string) => void;
  invalidFields?: ValidationErrorDTO[];
  setInvalidFields: (invalidFields: ValidationErrorDTO[]) => void;
  clearAllFields: () => void;
}

export const useFormEarning = create<IUseFormEarning>((set) => ({
  id: 0,
  setId: (id: number) => set({ id: id }),
  description: "",
  setDescription: (description: string) => set({ description: description }),
  walletId: 0,
  setWalletId: (walletId: number) => set({ walletId: walletId }),
  value: "",
  setValue: (value: string) => set({ value: value }),
  payed: false,
  setPayed: (payed: boolean) => set({ payed: payed }),
  paymentDate: "",
  setPaymentDate: (paymentDate?: string) => set({ paymentDate: paymentDate }),
  invalidFields: [],
  setInvalidFields: (invalidFields: ValidationErrorDTO[]) =>
    set({ invalidFields: invalidFields }),
  clearAllFields: () =>
    set({
      id: 0,
      description: "",
      walletId: 0,
      value: "",
      payed: false,
      invalidFields: [],
    }),
}));
