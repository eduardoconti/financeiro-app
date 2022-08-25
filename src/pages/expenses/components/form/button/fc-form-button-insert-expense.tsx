import { useExpense, useFormExpense } from "@pages/expenses/hook";
import { FcFormIconButtonAdd } from "@components/fc-forms/fc-form-button";
import { formToRequest } from "@pages/expenses/common";
import { useDashValues } from "@hooks/use-dash-values";
import { useContext } from "react";
import { ContextAlert } from "Context";
import { setCreatedAlert } from "@common/AlertFuncoes";
import { useSpin } from "@hooks/use-spin";
import shallow from "zustand/shallow";

export function FcFormButtonInsertExpense() {
  const {
    id,
    description,
    categoryId,
    subCategoryId,
    dueDate,
    paymentDate,
    payed,
    value,
    walletId,
    installments,
    setInvalidFields,
    clearAllFields,
  } = useFormExpense(
    (s) => ({
      id: s.id,
      description: s.description,
      categoryId: s.categoryId,
      subCategoryId: s.subCategoryId,
      dueDate: s.dueDate,
      paymentDate: s.paymentDate,
      payed: s.payed,
      invalidFields: s.invalidFields,
      value: s.value,
      walletId: s.walletId,
      installments: s.installments,
      setInvalidFields: s.setInvalidFields,
      clearAllFields: s.clearAllFields,
    }),
    shallow
  );

  const { insertExpense } = useExpense();
  const {
    subAmount,
    addExpensesOpen,
    addExpensesPayed,
    addBallance,
  } = useDashValues(
    (s) => ({
      subAmount: s.subAmount,
      addExpensesOpen: s.addExpensesOpen,
      addExpensesPayed: s.addExpensesPayed,
      addBallance: s.addBallance,
    }),
    shallow
  );
  const { setAlert } = useContext(ContextAlert);
  const setSpin = useSpin((s) => s.setSpin);
  const onClick = async () => {
    try {
      setSpin(true);
      const req = formToRequest({
        id,
        description,
        categoryId,
        subCategoryId,
        dueDate,
        paymentDate,
        payed,
        value,
        walletId,
        installments,
      });
      const { status, message, internalMessage } = await insertExpense(req);
      if (req.pago) {
        addExpensesPayed(req.valor);
        subAmount(req.valor);
      } else {
        addExpensesOpen(req.valor);
      }
      addBallance(req.valor);
      clearAllFields();
      setAlert(setCreatedAlert(status, message, internalMessage));
    } catch (error: any) {
      setInvalidFields(error.invalidFields);
      setAlert(setCreatedAlert(error.status, error.detail, error.title));
    } finally {
      setSpin(false);
    }
  };

  return <FcFormIconButtonAdd description="cadastrar" onClick={onClick} />;
}
