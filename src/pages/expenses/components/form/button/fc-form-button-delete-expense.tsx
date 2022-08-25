import { setCreatedAlert } from "@common/AlertFuncoes";
import FcFormIconButtonDelete from "@components/fc-forms/fc-form-button/fc-form-icon-button-delete";
import { useDashValues } from "@hooks/use-dash-values";
import { useSpin } from "@hooks/use-spin";
import { useExpense, useFormExpense } from "@pages/expenses/hook";
import { ContextAlert } from "Context";
import { useContext } from "react";
import shallow from "zustand/shallow";

export function FcFormButtonDeleteExpense() {
  const { id, clearAllFields } = useFormExpense(
    (s) => ({ id: s.id, clearAllFields: s.clearAllFields }),
    shallow
  );

  const { deleteExpense, expenses } = useExpense((s) => ({
    deleteExpense: s.deleteExpense,
    expenses: s.expenses,
  }));
  const { setAlert } = useContext(ContextAlert);
  const setSpin = useSpin((s) => s.setSpin);
  const {
    subExpensesOpen,
    subExpensesPayed,
    addAmount,
    addBallance,
  } = useDashValues(
    (s) => ({
      addAmount: s.addAmount,
      subExpensesOpen: s.subExpensesOpen,
      subExpensesPayed: s.subExpensesPayed,
      addBallance: s.addBallance,
    }),
    shallow
  );
  const onClick = async () => {
    try {
      setSpin(true);
      const expense = expenses.find((expense) => {
        return expense.id === id;
      });

      if (!expense) {
        return;
      }
      const { pago, valor } = expense;
      const { status, message, internalMessage } = await deleteExpense(id);

      if (pago) {
        subExpensesPayed(valor);
        addAmount(valor);
      } else {
        subExpensesOpen(valor);
      }

      addBallance(valor);
      setAlert(setCreatedAlert(status, message, internalMessage));
      clearAllFields();
    } catch (error: any) {
      setAlert(setCreatedAlert(error.status, error.detail, error.title));
    } finally {
      setSpin(false);
    }
  };
  return (
    <FcFormIconButtonDelete
      description="delete"
      disabled={id === 0}
      onClick={onClick}
    />
  );
}
