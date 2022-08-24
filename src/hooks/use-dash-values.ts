import { DashBoardService } from "@api/dashboard/service";
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
  expensesOpen: number;
  setExpensesOpen: (expensesOpen: number) => void;
  expensesPayed: number;
  setExpensesPayed: (expensesPayed: number) => void;
  earningsOpen: number;
  setEarningsOpen: (earningsOpen: number) => void;
  earningsPayed: number;
  setEarningsPayed: (earningsPayed: number) => void;
  ballance: number;
  setBallance: (ballance: number) => void;
  amount: number;
  setAmount: (amount: number) => void;
  checkExpenses: CheckedValues;
  setCheckExpenses: (checkExpenses: CheckedValues) => void;
  checkEarnings: CheckedValues;
  setCheckEarnings: (checkEarnings: CheckedValues) => void;
  calculate: (year: number, month: number) => Promise<void>;
};

export const useDashValues = create<IUseDashValues>((set, get) => ({
  expensesOpen: 0,
  setExpensesOpen: (expensesOpen: number) => set((s) => ({ ...s, expensesOpen: expensesOpen })),
  expensesPayed: 0,
  setExpensesPayed: (expensesPayed: number) => set((s) => ({ ...s, expensesPayed: expensesPayed })),
  earningsOpen: 0,
  setEarningsOpen: (earningsOpen: number) => set((s) => ({ ...s, earningsOpen: earningsOpen })),
  earningsPayed: 0,
  setEarningsPayed: (earningsPayed: number) => set((s) => ({ ...s, earningsPayed: earningsPayed })),
  ballance: 0,
  setBallance: (ballance: number) => set((s) => ({ ...s, ballance: ballance })),
  amount: 0,
  setAmount: (amount: number) => set((s) => ({ ...s, amount: amount })),
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
    const service = new DashBoardService();
    const { data: { expensesOpen,
      earningsOpen,
      expensesPayed,
      earningsPayed,
      ballance,
      amount } } = await service.getValues({ year, month })
    set((s) => ({
      ...s,
      expensesOpen,
      earningsOpen,
      expensesPayed,
      earningsPayed,
      ballance,
      amount,
    }));
  },
}));
