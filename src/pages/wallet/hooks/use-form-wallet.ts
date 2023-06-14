import { ValidationErrorDTO } from "@api/http-request/dto";
import create from "zustand";

export interface IWalletForm {
  id: number;
  description: string;
  active: boolean
}

export interface IUseFormdWallet {
  form: IWalletForm;
  setForm: (form: IWalletForm) => void;
  invalidFields?: ValidationErrorDTO[];
  setInvalidFields: (invalidFields: ValidationErrorDTO[]) => void;
  clearAllFields: () => void;
}

const emptyForm = {
  id: 0,
  description: "",
  active: true,
};
export const useFormWallet = create<IUseFormdWallet>((set) => ({
  form: emptyForm,
  setForm: (form: IWalletForm) => set({ form: form }),
  invalidFields: [],
  setInvalidFields: (invalidFields: ValidationErrorDTO[]) =>
    set({ invalidFields: invalidFields }),
  clearAllFields: () => set({ form: emptyForm, invalidFields: [] }),
}));
