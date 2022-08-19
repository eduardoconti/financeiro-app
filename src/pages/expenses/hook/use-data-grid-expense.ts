import { useContext } from "react";
import { ContextDataGridExpense, DataGridExpenseContextType } from "@pages/expenses/context";


export function useDataGridExpense(): DataGridExpenseContextType {
  const context = useContext(
    ContextDataGridExpense
  ) as DataGridExpenseContextType;

  if (!context) {
    throw new Error("useDataGridExpense must be used within a ExpenseProvider");
  }

  return context;
}
