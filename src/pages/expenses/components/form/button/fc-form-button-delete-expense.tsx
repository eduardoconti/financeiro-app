import { setCreatedAlert } from "@common/AlertFuncoes";
import FcFormIconButtonDelete from "@components/fc-forms/fc-form-button/fc-form-icon-button-delete";
import { useSpin } from "@hooks/use-spin";
import { useExpense, useFormExpense } from "@pages/expenses/hook";
import { ContextAlert } from "Context";
import { useContext } from "react";

export function FcFormButtonDeleteExpense() {
  const { setInvalidFields, formExpense, clearAllFields } = useFormExpense();
  const { deleteExpense } = useExpense();
  const { setAlert } = useContext(ContextAlert);
  const { setSpin } = useSpin();

  const onClick = async () => {
    try {
      setSpin(true);
      const { status, message, internalMessage } = await deleteExpense(
        formExpense.id
      );
      setAlert(setCreatedAlert(status, message, internalMessage));
      clearAllFields();
    } catch (error: any) {
      setInvalidFields(error);
      setAlert(setCreatedAlert(error.status, error.detail, error.title));
    } finally {
      setSpin(false);
    }
  };
  return (
    <FcFormIconButtonDelete
      description="delete"
      disabled={formExpense.id === 0}
      onClick={onClick}
    />
  );
}
