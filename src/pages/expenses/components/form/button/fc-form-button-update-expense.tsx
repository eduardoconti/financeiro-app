import { setCreatedAlert } from "@common/AlertFuncoes";
import FcFormIconButtonUpdate from "@components/fc-forms/fc-form-button/fc-form-icon-button-update";
import { useGetCurrentTime } from "@hooks/use-current-time";
import { useDashValues } from "@hooks/use-dash-values";
import { useSpin } from "@hooks/use-spin";
import { formToRequest } from "@pages/expenses/common";
import { useExpense, useFormExpense } from "@pages/expenses/hook";
import { ContextAlert } from "Context";
import { useContext } from "react";
import shallow from "zustand/shallow";

export default function FcFormButtonUpdateExpense() {
  const { updateExpense } = useExpense();
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

  const calculate = useDashValues((s) => s.calculate);
  const { setAlert } = useContext(ContextAlert);
  const setSpin = useSpin((s) => s.setSpin);
  const { year, month } = useGetCurrentTime();

  const onClick = async () => {
    try {
      setSpin(true);
      const data = formToRequest({
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
      const { status, message, internalMessage } = await updateExpense(
        id as number,
        data
      );
      await calculate(year, month);
      clearAllFields();
      setAlert(setCreatedAlert(status, message, internalMessage));
    } catch (error: any) {
      setInvalidFields(error?.invalidFields);
      setAlert(setCreatedAlert(error.status, error.detail, error.title));
    } finally {
      setSpin(false);
    }
  };

  return <FcFormIconButtonUpdate description="alterar" onClick={onClick} />;
}
