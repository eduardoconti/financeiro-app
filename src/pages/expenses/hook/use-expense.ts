import {
  ExpenseDeleteResponseDTO,
  ExpenseDTO,
  ExpenseResposeDTO,
} from "@api/expense/dto";
import { ExpenseService, IExpenseService } from "@api/expense/service";
import { SuccessResponseData } from "@api/http-request/dto";
import { CheckedValues } from "@hooks/use-dash-values";
import create from "zustand";
export interface IUseExpense {
  expenses: ExpenseResposeDTO[];
  fetchExpenses: (params?: any) => Promise<void>;
  insertExpense: (
    expense: ExpenseDTO
  ) => Promise<SuccessResponseData<ExpenseResposeDTO>>;
  insertExpenseNextMonth: (
    expense: ExpenseDTO
  ) => Promise<SuccessResponseData<ExpenseResposeDTO>>;
  updateExpense: (
    id: number,
    expense: Partial<ExpenseDTO>
  ) => Promise<SuccessResponseData<ExpenseResposeDTO>>;
  deleteExpense: (
    id: number
  ) => Promise<SuccessResponseData<ExpenseDeleteResponseDTO>>;
  updateFlagPayed: (
    id: number,
    patchFlag: Pick<ExpenseDTO, "pago">
  ) => Promise<SuccessResponseData<ExpenseResposeDTO>>;
}

export type FetchParams = {
  checked: CheckedValues;
  year: number;
  month: number;
  filter: any;
};

export const useExpense = create<IUseExpense>((set) => ({
  expenses: [],
  fetchExpenses: async (params: FetchParams) => {
    const expenseService: IExpenseService = new ExpenseService();
    const { checked, year, month, filter } = params;
    const { data } = await expenseService.getDespesas(
      checked,
      year,
      month,
      filter
    );
    set({ expenses: data });
  },
  insertExpense: async (expense: ExpenseDTO) => {
    const expenseService: IExpenseService = new ExpenseService();
    const data = await expenseService.insert(expense);
    set((state) => ({
      expenses: [...state.expenses, data.data].sort((a, b) =>
        a.descricao > b.descricao ? 1 : b.descricao > a.descricao ? -1 : 0
      ),
    }));
    return data;
  },
  insertExpenseNextMonth: async (expense: ExpenseDTO) => {
    const expenseService: IExpenseService = new ExpenseService();
    const data = await expenseService.insert(expense);
    return data;
  },
  updateExpense: async (id: number, expense: Partial<ExpenseDTO>) => {
    const expenseService: IExpenseService = new ExpenseService();
    const data = await expenseService.update(id, expense);

    set((state) => {
      const index = state.expenses.findIndex((expense) => expense.id === id);
      const newExpenses = [...state.expenses];
      newExpenses[index] = data.data;
      return { expenses: newExpenses };
    });
    return data;
  },
  deleteExpense: async (id: number) => {
    const expenseService: IExpenseService = new ExpenseService();
    const data = await expenseService.delete(id);
    set((state) => ({
      expenses: state.expenses.filter((expense) => expense.id !== id),
    }));
    return data;
  },
  updateFlagPayed: async (id: number, patchFlag: Pick<ExpenseDTO, "pago">) => {
    const service = new ExpenseService();
    const data = await service.updateFlagPayed(id, patchFlag);
    set((state) => {
      const index = state.expenses.findIndex((expense) => expense.id === id);
      const newExpenses = [...state.expenses];
      newExpenses[index].pago = data.data.pago;
      return { expenses: newExpenses };
    });
    return data;
  },
}));
