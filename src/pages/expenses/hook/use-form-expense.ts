import { useContext } from "react";
import {
  ContextFormExpense,
  FormExpenseContextType,
} from "@pages/expenses/context";

type UseFormExpenseHook = {
  setInvalidFields: (error?: any) => void;
  clearAllFields: () => void;
};

export function useFormExpense(): FormExpenseContextType & UseFormExpenseHook {
  const context = useContext(ContextFormExpense) as FormExpenseContextType;

  if (!context) {
    throw new Error("useFormExpense must be used within a FormExpenseProvider");
  }

  const setInvalidFields = (error?: any) => {
    context.dispatch({
      type: "setInvalidFields",
      payload: { invalidFields: error?.invalidFields ?? [] },
    });
  };

  const clearAllFields = () => {
    context.dispatch({ type: "clearAll" });
  };
  return { ...context, setInvalidFields, clearAllFields };
}
