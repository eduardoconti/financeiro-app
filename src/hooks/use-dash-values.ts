import { calculaTotais } from "@common/Funcoes";
import create from "zustand";

export interface IDashValues {
  id: number;
  description: string;
}

export type CheckedValues = {
  open: boolean;
  payed: boolean;
};
export type IUseDashValues = {
  expenses: number;
  setExpenses: (expenses: number) => void;
  earnings: number;
  setEarnings: (earnings: number) => void;
  balance: number;
  setBalance: (balance: number) => void;
  amount: number;
  setAmount: (amount: number) => void;
  checkExpenses: CheckedValues;
  setCheckExpenses: (checkExpenses: CheckedValues) => void;
  checkEarnings: CheckedValues;
  setCheckEarnings: (checkEarnings: CheckedValues) => void;
  calculate: (year: number, month: number) => Promise<void>;
};

export const useDashValues = create<IUseDashValues>((set, get) => ({
  expenses: 0,
  setExpenses: (expenses: number) => set({ expenses: expenses }),
  earnings: 0,
  setEarnings: (earnings: number) => set({ earnings: earnings }),
  balance: 0,
  setBalance: (balance: number) => set({ balance: balance }),
  amount: 0,
  setAmount: (amount: number) => set({ amount: amount }),
  checkExpenses: {
    open: true,
    payed: true,
  },
  setCheckExpenses: (checkExpenses: CheckedValues) =>
    set({ checkExpenses: checkExpenses }),
  checkEarnings: {
    open: true,
    payed: true,
  },
  setCheckEarnings: (checkEarnings: CheckedValues) =>
    set({ checkEarnings: checkEarnings }),
  calculate: async (year: number, month: number) => {
    const { checkExpenses, checkEarnings } = get();
    const {
      totalDespesas,
      totalReceitas,
      saldo,
      balanco,
    } = await calculaTotais(checkExpenses, checkEarnings, year, month);

    set({
      expenses: totalDespesas,
      earnings: totalReceitas,
      balance: balanco,
      amount: saldo,
    });
  },
}));
