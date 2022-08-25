import { ValidationErrorDTO } from "@api/http-request/dto";
import create from "zustand";

export interface IExpenseForm {
  id: number;
  description: string;
  categoryId: number;
  subCategoryId: number;
  walletId: number;
  dueDate: string;
  value: string;
  payed: boolean;
  installments: number;
  paymentDate?: string;
  invalidFields?: ValidationErrorDTO[];
}

export interface IUseFormExpense {
  id: number;
  setId: (id: number) => void;
  description: string;
  setDescription: (description: string) => void;
  categoryId: number;
  setCategoryId: (categoryId: number) => void;
  subCategoryId: number;
  setSubCategoryId: (subCategoryId: number) => void;
  walletId: number;
  setWalletId: (walletId: number) => void;
  dueDate: string;
  setDueDate: (dueDate: string) => void;
  value: string;
  setValue: (value: string) => void;
  payed: boolean;
  setPayed: (payed: boolean) => void;
  paymentDate?: string;
  setPaymentDate: (paymentDate?: string) => void;
  installments: number;
  setInstallments: (installments: number) => void;
  invalidFields?: ValidationErrorDTO[];
  setInvalidFields: (invalidFields: ValidationErrorDTO[]) => void;
  clearAllFields: () => void;
}

export const useFormExpense = create<IUseFormExpense>((set) => ({
  id: 0,
  setId: (id: number) => set({ id: id }),
  description: "",
  setDescription: (description: string) => set((s) => ({ ...s, description })),
  categoryId: 0,
  setCategoryId: (categoryId: number) => set((s) => ({ ...s, categoryId })),
  subCategoryId: 0,
  setSubCategoryId: (subCategoryId: number) =>
    set((s) => ({ ...s, subCategoryId })),
  walletId: 0,
  setWalletId: (walletId: number) => set((s) => ({ ...s, walletId })),
  dueDate: "",
  setDueDate: (dueDate: string) => set((s) => ({ ...s, dueDate })),
  value: "0",
  setValue: (value: string) => set((s) => ({ ...s, value })),
  payed: false,
  setPayed: (payed: boolean) => set((s) => ({ ...s, payed })),
  paymentDate: "",
  setPaymentDate: (paymentDate?: string) => set((s) => ({ ...s, paymentDate })),
  installments: 1,
  setInstallments: (installments: number) =>
    set((s) => ({ ...s, installments })),
  invalidFields: [],
  setInvalidFields: (invalidFields: ValidationErrorDTO[]) =>
    set((s) => ({ ...s, invalidFields })),
  clearAllFields: () =>
    set({
      id: 0,
      description: "",
      categoryId: 0,
      subCategoryId: 0,
      walletId: 0,
      dueDate: "",
      payed: false,
      value: "0",
      paymentDate: "",
      installments: 1,
      invalidFields: [],
    }),
}));
