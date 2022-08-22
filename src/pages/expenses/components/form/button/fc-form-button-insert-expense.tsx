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
    expenses,
    setExpenses,
    balance,
    setBalance,
  } = useDashValues();
  const { setAlert } = useContext(ContextAlert);
  const { setSpin } = useSpin();
  const onClick = async () => {
    try {
      setSpin(true);
      const req = formToRequest(formExpense);
      const { status, message, internalMessage } = await insertExpense(req);
      setExpenses(expenses + req.valor);
      setBalance(balance - req.valor);
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
