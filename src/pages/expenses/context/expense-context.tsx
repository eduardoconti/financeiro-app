import { ExpenseService, IExpenseService } from "api/expense/service";
import { ExpenseDTO, ExpenseResposeDTO } from "api/expense/dto";
import { setCreatedAlert } from "common";
import {
  ContextAlert,
  ContextAnoMes,
  ContextChecked,
  ContextExpenseFilter,
  ExpenseFilterContextType,
  SpinContext,
} from "Context";
import * as React from "react";

export const ContextExpense = React.createContext<ExpenseContextType | null>(
  null
);

export type ExpenseContextType = {
  expenses: ExpenseResposeDTO[];
  fetchExpenses: (params?: any) => Promise<void>;
  insertExpense: (expense: ExpenseDTO) => Promise<void>;
  updateExpense: (id: number, expense: Partial<ExpenseDTO>) => Promise<void>;
  // deleteExpense: (id: number) => Promise<void>;
};

export type GetExpenseParams = {
  expenseId?: number;
};

type Props = {
  children: React.ReactNode; // 👈️ added type for children
};

const ExpenseProvider: React.FC<Props> = ({ children }) => {
  const [expenses, setExpenses] = React.useState<ExpenseResposeDTO[]>([]);
  const { setAlert } = React.useContext(ContextAlert);
  const { filter } = React.useContext(
    ContextExpenseFilter
  ) as ExpenseFilterContextType;
  const { stateCheckedDespesas } = React.useContext(ContextChecked);
  const { stateMesAtual, stateAnoAtual } = React.useContext(ContextAnoMes);
  const { setSpin } = React.useContext(SpinContext);

  const fetchExpenses = async (params?: GetExpenseParams) => {
    const expenseService: IExpenseService = new ExpenseService();
    setSpin(true);
    try {
      const { data } = await expenseService.getDespesas(
        stateCheckedDespesas,
        stateAnoAtual,
        stateMesAtual,
        filter
      );
      setExpenses(data);
    } catch (error: any) {
      setAlert(setCreatedAlert(error.status, error?.title, error.detail));
    } finally {
      setSpin(false);
    }
  };

  React.useEffect(() => {
    async function Init() {
      await fetchExpenses();
    }
    Init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    stateMesAtual,
    stateAnoAtual,
    stateCheckedDespesas,
    filter,
    setAlert,
    setSpin,
  ]);

  const insertExpense = React.useCallback(async (expense: ExpenseDTO) => {
    try {
      const expenseService: IExpenseService = new ExpenseService();
      const { status, message, internalMessage } = await expenseService.insert(
        expense
      );
      setAlert(setCreatedAlert(status, message, internalMessage));
      await fetchExpenses();
    } catch (error: any) {
      setAlert(setCreatedAlert(error.status, error?.title, error.detail));
      throw error;
    }
  }, []);

  const updateExpense = async (id: number, expense: Partial<ExpenseDTO>) => {
    try {
      const expenseService: IExpenseService = new ExpenseService();
      const { status, message, internalMessage } = await expenseService.update(
        id,
        expense
      );
      setAlert(setCreatedAlert(status, message, internalMessage));
      await fetchExpenses();
    } catch (error: any) {
      setAlert(setCreatedAlert(error.status, error?.title, error.detail));
      throw error;
    }
  };

  // const deleteExpense = async (id: number) => {
  //   try {
  //     const { status, message, internalMessage } = await expenseService.delete(
  //       id
  //     );
  //     setAlert(setCreatedAlert(status, message, internalMessage));
  //     await fetchExpenses();
  //   } catch (error: any) {
  //     setAlert(setCreatedAlert(error.status, error?.title, error.detail));
  //     throw error;
  //   }
  // };

  return (
    <ContextExpense.Provider
      value={{
        expenses,
        fetchExpenses,
        insertExpense,
        updateExpense,
        // deleteExpense,
      }}
    >
      {children}
    </ContextExpense.Provider>
  );
};

export default ExpenseProvider;
