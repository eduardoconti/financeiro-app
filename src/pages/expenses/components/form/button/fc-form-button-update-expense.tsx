import { setCreatedAlert } from "@common/AlertFuncoes";
import FcFormIconButtonUpdate from "@components/fc-forms/fc-form-button/fc-form-icon-button-update";
import { useGetCurrentTime } from "@hooks/use-current-time";
import { useDashValues } from "@hooks/use-dash-values";
import { useSpin } from "@hooks/use-spin";
import { formToRequest } from "@pages/expenses/common";
import { useExpense, useFormExpense } from "@pages/expenses/hook";
import { ContextAlert } from "Context";
import { useContext } from "react";

export default function FcFormButtonUpdateExpense() {
  const { updateExpense } = useExpense();
  const { setInvalidFields, formExpense, clearAllFields } = useFormExpense();
  const { calculate } = useDashValues();
  const { setAlert } = useContext(ContextAlert);
  const { setSpin } = useSpin();
  const { year, month } = useGetCurrentTime();

  const onClick = async () => {
    try {
      setSpin(true);
      const data = formToRequest(formExpense);
      const { status, message, internalMessage } = await updateExpense(
        formExpense.id as number,
        data
      );
      await calculate(year, month);
      clearAllFields();
      setAlert(setCreatedAlert(status, message, internalMessage));
      // await new Promise(resolve => setTimeout(resolve, 1500));
    } catch (error: any) {
      setInvalidFields(error);
      setAlert(setCreatedAlert(error.status, error.detail, error.title));
    } finally {
      setSpin(false);
    }
  };

  return <FcFormIconButtonUpdate description="alterar" onClick={onClick} />;
}
