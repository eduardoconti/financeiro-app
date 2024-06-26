import {
  ExpenseDeleteResponseDTO,
  ExpenseDTO,
  ExpenseResponseDTO,
} from "@api/expense/dto";
import { ExpenseService, IExpenseService } from "@api/expense/service";
import { SuccessResponseData } from "@api/http-request/dto";
import { CheckedValues } from "@hooks/use-dash-values";
import create from "zustand";
import { ExpenseFilter } from "./use-expense-filter";

const expenseService: IExpenseService = new ExpenseService();
export interface IUseExpense {
  expenses: ExpenseResponseDTO[];
  fetchExpenses: (params: FetchParams) => Promise<void>;
  insertExpense: (
    expense: ExpenseDTO
  ) => Promise<SuccessResponseData<ExpenseResponseDTO>>;
  insertExpenseNextMonth: (
    expense: ExpenseDTO
  ) => Promise<SuccessResponseData<ExpenseResponseDTO>>;
  updateExpense: (
    id: number,
    expense: Partial<ExpenseDTO>
  ) => Promise<SuccessResponseData<ExpenseResponseDTO>>;
  deleteExpense: (
    id: number
  ) => Promise<SuccessResponseData<ExpenseDeleteResponseDTO>>;
  updateFlagPayed: (
    id: number,
    patchFlag: Pick<ExpenseDTO, "pago">
  ) => Promise<SuccessResponseData<ExpenseResponseDTO>>;
}

export type FetchParams = {
  year: number;
  month: number;
  checked?: CheckedValues;
  filter?: ExpenseFilter;
};

export const useExpense = create<IUseExpense>((set) => ({
  expenses: [],
  fetchExpenses: async (params: FetchParams) => {
    const {
      checked = {
        payed: true,
        open: true,
      },
      year,
      month,
      filter,
    } = params;
    const { data } = await expenseService.getDespesas(
      checked,
      year,
      month,
      filter
    );
    set((state) => ({
      ...state,
      expenses: data,
    }));
  },
  insertExpense: async (expense: ExpenseDTO) => {
    const data = await expenseService.insert(expense);
    set((state) => ({
      ...state,
      expenses: [...state.expenses, data.data].sort((a, b) =>
        a.valor > b.valor ? -1 : b.valor > a.valor ? 1 : 0
      ),
    }));
    return data;
  },
  insertExpenseNextMonth: async (expense: ExpenseDTO) => {
    const data = await expenseService.insert(expense);
    return data;
  },
  updateExpense: async (id: number, expense: Partial<ExpenseDTO>) => {
    const data = await expenseService.update(id, expense);

    set((state) => {
      const index = state.expenses.findIndex((expense) => expense.id === id);
      const newExpenses = [...state.expenses];
      newExpenses[index] = data.data;
      return {
        ...state,
        expenses: newExpenses.sort((a, b) =>
          a.valor > b.valor ? -1 : b.valor > a.valor ? 1 : 0
        ),
      };
    });
    return data;
  },
  deleteExpense: async (id: number) => {
    const data = await expenseService.delete(id);
    set((state) => ({
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== id),
    }));
    return data;
  },
  updateFlagPayed: async (id: number, patchFlag: Pick<ExpenseDTO, "pago">) => {
    const data = await expenseService.updateFlagPayed(id, patchFlag);
    set((state) => {
      const index = state.expenses.findIndex((expense) => expense.id === id);
      const newExpenses = [...state.expenses];
      newExpenses[index].pago = data.data.pago;
      return {
        ...state,
        expenses: newExpenses,
      };
    });
    return data;
  },
}));
