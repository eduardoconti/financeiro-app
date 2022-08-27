import create from "zustand";

export type ExpenseFilter = {
  start?: string;
  end?: string;
  payed?: boolean;
  dateField?: string;
  categoryId?: number[];
  walletId?: number[];
}
export interface IUseExpenseFilter {
  start?: string;
  setStart: (start: string) => void;
  end?: string;
  setEnd: (end: string) => void;
  payed?: boolean;
  setPayed: (payed: boolean) => void;
  dateField?: string;
  setDateField: (dateField: string) => void;
  categoryId?: number[];
  setCategoryId: (categoryId: number[]) => void;
  walletId?: number[];
  setWalletId: (walletId: number[]) => void;
}

export const useExpenseFilter = create<IUseExpenseFilter>((set) => ({
  start: '',
  setStart: (start: string) => set((s) => ({ ...s, start })),
  end: '',
  setEnd: (end: string) => set((s) => ({ ...s, end })),
  payed: undefined,
  setPayed: (payed: boolean) => set(s => ({ ...s, payed })),
  dateField: '',
  setDateField: (dateField: string) => set((s) => ({ ...s, dateField })),
  categoryId: [],
  setCategoryId: (categoryId: number[]) => set((s) => ({ ...s, categoryId })),
  walletId: [],
  setWalletId: (walletId: number[]) => set((s) => ({ ...s, walletId })),
}));
