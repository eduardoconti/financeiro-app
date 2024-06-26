import { ValidationErrorDTO } from "@api/http-request/dto";
import create from "zustand";

export interface IUseFormCategory {
  id: number;
  setId: (id: number) => void;
  description: string;
  setDescription: (description: string) => void;
  subCategoryId: number;
  setSubCategoryId: (subCategoryId: number) => void;
  subCategoryDescription: string;
  setSubCategoryDescription: (subCategoryDescription: string) => void;
  invalidFields?: ValidationErrorDTO[];
  setInvalidFields: (invalidFields: ValidationErrorDTO[]) => void;
  clearAllFields: () => void;
}

export const useFormCategory = create<IUseFormCategory>((set) => ({
  id: 0,
  setId: (id: number) => set((s) => ({ ...s, id })),
  description: "",
  setDescription: (description: string) => set((s) => ({ ...s, description })),
  subCategoryId: 0,
  setSubCategoryId: (subCategoryId: number) =>
    set((s) => ({ ...s, subCategoryId })),
  subCategoryDescription: "",
  setSubCategoryDescription: (subCategoryDescription: string) =>
    set((s) => ({ ...s, subCategoryDescription })),
  invalidFields: [],
  setInvalidFields: (invalidFields: ValidationErrorDTO[]) =>
    set({ invalidFields: invalidFields }),
  clearAllFields: () =>
    set({
      id: 0,
      description: "",
      subCategoryId: 0,
      subCategoryDescription: "",
      invalidFields: [],
    }),
}));
