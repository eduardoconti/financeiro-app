import { ValidationErrorDTO } from "@api/http-request/dto";
import create from "zustand";

export interface IFormSubCategory {
  d: number;
  description: string;
  categoryId: number;
  invalidFields: ValidationErrorDTO[];
}

export interface IUseFormSubCategory {
  id: number;
  setId: (id: number) => void;
  description: string;
  setDescription: (description: string) => void;
  categoryId: number;
  setCategoryId: (categoryId: number) => void;
  invalidFields?: ValidationErrorDTO[];
  setInvalidFields: (invalidFields: ValidationErrorDTO[]) => void;
  clearAllFields: () => void;
}

export const useFormSubCategory = create<IUseFormSubCategory>((set) => ({
  id: 0,
  setId: (id: number) => set((s) => ({ ...s, id })),
  description: "",
  setDescription: (description: string) => set((s) => ({ ...s, description })),
  categoryId: 0,
  setCategoryId: (categoryId: number) => set((s) => ({ ...s, categoryId })),
  invalidFields: [],
  setInvalidFields: (invalidFields: ValidationErrorDTO[]) =>
    set({ invalidFields: invalidFields }),
  clearAllFields: () =>
    set({
      id: 0,
      description: "",
      categoryId: 0,
      invalidFields: [],
    }),
}));
