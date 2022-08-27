import { setCreatedAlert } from "@common/AlertFuncoes";
import FcFormIconButtonAddNextMonth from "@components/fc-forms/fc-form-button/fc-form-icon-button-add-next-month";
import { useSpin } from "@hooks/use-spin";
import { expenseToRequest } from "@pages/expenses/common";
import { useExpense, useFormExpense } from "@pages/expenses/hook";
import { ContextAlert } from "Context";
import { useContext } from "react";
import shallow from "zustand/shallow";

export function FcFormButtonInsertExpenseNextMonth() {
  const { id, setInvalidFields, clearAllFields } = useFormExpense(
    (s) => ({
      id: s.id,
      invalidFields: s.invalidFields,
      setInvalidFields: s.setInvalidFields,
      clearAllFields: s.clearAllFields,
    }),
    shallow
  );

  const { insertExpenseNextMonth, expenses } = useExpense(
    (s) => ({
      insertExpenseNextMonth: s.insertExpenseNextMonth,
      expenses: s.expenses,
    }),
    shallow
  );

  const { setAlert } = useContext(ContextAlert);
  const setSpin = useSpin((s) => s.setSpin);

  const onClick = async () => {
    try {
      setSpin(true);
      const expense = expenses.find((e) => e.id === id);
      if (!expense) return;

      const requestDto = expenseToRequest(expense) 
      const { status, message, internalMessage } = await insertExpenseNextMonth(requestDto);
      
      setAlert(setCreatedAlert(status, message, internalMessage));
      clearAllFields();
    } catch (error: any) {
      setInvalidFields(error?.invalidFields);
      setAlert(setCreatedAlert(error.status, error.detail, error.title));
    } finally {
      setSpin(false);
    }
  };
  return (
    <FcFormIconButtonAddNextMonth
      description="next-month-expense"
      disabled={id === 0}
      onClick={onClick}
    />
  );
}
