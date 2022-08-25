import { DashBoardService } from "@api/dashboard/service";
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
  addExpensesOpen: (value: number) => void;
  subExpensesOpen: (value: number) => void;
  expensesPayed: number;
  setExpensesPayed: (expensesPayed: number) => void;
  addExpensesPayed: (value: number) => void;
  subExpensesPayed: (value: number) => void;
  earningsOpen: number;
  setEarningsOpen: (earningsOpen: number) => void;
  addEarningsOpen: (value: number) => void;
  subEarningsOpen: (value: number) => void;
  earningsPayed: number;
  setEarningsPayed: (earningsPayed: number) => void;
  addEarningsPayed: (value: number) => void;
  subEarningsPayed: (value: number) => void;
  ballance: number;
  setBallance: (ballance: number) => void;
  addBallance: (value: number) => void;
  subBallance: (value: number) => void;
  amount: number;
  setAmount: (amount: number) => void;
  addAmount: (value: number) => void;
  subAmount: (value: number) => void;
  checkExpenses: CheckedValues;
  setCheckExpenses: (checkExpenses: CheckedValues) => void;
  checkEarnings: CheckedValues;
  setCheckEarnings: (checkEarnings: CheckedValues) => void;
  calculate: (year: number, month: number) => Promise<void>;
};

export const useDashValues = create<IUseDashValues>((set, get) => ({
  expensesOpen: 0,
  setExpensesOpen: (expensesOpen: number) =>
    set((s) => ({ ...s, expensesOpen: expensesOpen })),
  addExpensesOpen: (value: number) =>
    set((s) => ({ ...s, expensesOpen: s.expensesOpen + value })),
  subExpensesOpen: (value: number) =>
    set((s) => ({ ...s, expensesOpen: s.expensesOpen - value })),
  expensesPayed: 0,
  setExpensesPayed: (expensesPayed: number) =>
    set((s) => ({ ...s, expensesPayed: expensesPayed })),
  addExpensesPayed: (value: number) =>
    set((s) => ({ ...s, expensesPayed: s.expensesPayed + value })),
  subExpensesPayed: (value: number) =>
    set((s) => ({ ...s, expensesPayed: s.expensesPayed - value })),
  earningsOpen: 0,
  setEarningsOpen: (earningsOpen: number) =>
    set((s) => ({ ...s, earningsOpen: earningsOpen })),
  addEarningsOpen: (value: number) =>
    set((s) => ({ ...s, earningsOpen: s.earningsOpen + value })),
  subEarningsOpen: (value: number) =>
    set((s) => ({ ...s, earningsOpen: s.earningsOpen - value })),
  earningsPayed: 0,
  setEarningsPayed: (earningsPayed: number) =>
    set((s) => ({ ...s, earningsPayed: earningsPayed })),
  addEarningsPayed: (value: number) =>
    set((s) => ({ ...s, earningsPayed: s.earningsPayed + value })),
  subEarningsPayed: (value: number) =>
    set((s) => ({ ...s, earningsPayed: s.earningsPayed - value })),
  ballance: 0,
  setBallance: (ballance: number) => set((s) => ({ ...s, ballance: ballance })),
  addBallance: (value: number) =>
    set((s) => ({ ...s, ballance: s.ballance + value })),
  subBallance: (value: number) =>
    set((s) => ({ ...s, ballance: s.ballance - value })),
  amount: 0,
  setAmount: (amount: number) => set((s) => ({ ...s, amount: amount })),
  addAmount: (value: number) =>
    set((s) => ({ ...s, amount: s.amount + value })),
  subAmount: (value: number) =>
    set((s) => ({ ...s, amount: s.amount - value })),
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
    const {
      data: {
        expensesOpen,
        earningsOpen,
        expensesPayed,
        earningsPayed,
        ballance,
        amount,
      },
    } = await service.getValues({ year, month });
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
