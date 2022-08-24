import { useExpense, useFormExpense } from "@pages/expenses/hook";
import { FcFormIconButtonAdd } from "@components/fc-forms/fc-form-button";
import { formToRequest } from "@pages/expenses/common";
import { useDashValues } from "@hooks/use-dash-values";
import { useContext } from "react";
import { ContextAlert } from "Context";
import { setCreatedAlert } from "@common/AlertFuncoes";
import { useSpin } from "@hooks/use-spin";

export function FcFormButtonInsertExpense() {
  const { setInvalidFields, formExpense, clearAllFields } = useFormExpense();
  const { insertExpense } = useExpense();
  const {
    amount,
    setAmount,
    expensesOpen,
    setExpensesOpen,
    expensesPayed,
    setExpensesPayed,
    ballance,
    setBallance,
  } = useDashValues((s) => ({
    amount: s.amount,
    setAmount: s.setAmount,
    expensesOpen: s.expensesOpen,
    setExpensesOpen: s.setExpensesOpen,
    expensesPayed: s.expensesPayed,
    setExpensesPayed: s.setExpensesPayed,
    ballance: s.ballance,
    setBallance: s.setBallance,
  }));
  const { setAlert } = useContext(ContextAlert);
  const { setSpin } = useSpin();
  const onClick = async () => {
    try {
      setSpin(true);
      const req = formToRequest(formExpense);
      const { status, message, internalMessage } = await insertExpense(req);
      if (req.pago) {
        setExpensesPayed(expensesPayed + req.valor);
      } else {
        setExpensesOpen(expensesOpen + req.valor);
      }
      setBallance(ballance - req.valor);
      setAmount(req.pago ? amount - req.valor : amount + req.valor);
      clearAllFields();
      setAlert(setCreatedAlert(status, message, internalMessage));
    } catch (error: any) {
      setInvalidFields(error);
      setAlert(setCreatedAlert(error.status, error.detail, error.title));
    } finally {
      setSpin(false);
    }
  };

  return <FcFormIconButtonAdd description="cadastrar" onClick={onClick} />;
}
