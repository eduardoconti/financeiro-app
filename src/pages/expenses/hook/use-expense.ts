import { useContext } from "react";
import { ContextExpense, ExpenseContextType } from "@pages/expenses/context";

export function useExpense(): ExpenseContextType {
  const context = useContext(ContextExpense) as ExpenseContextType;

  if (!context) {
    throw new Error("useExpense must be used within a ExpenseProvider");
  }

  return context;
}
