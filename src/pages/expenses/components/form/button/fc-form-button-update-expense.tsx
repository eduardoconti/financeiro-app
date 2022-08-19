import FcFormIconButtonUpdate from "@components/fc-forms/fc-form-button/fc-form-icon-button-update";
import { formToRequest } from "@pages/expenses/common";
import { useExpense, useFormExpense } from "@pages/expenses/hook";

export default function FcFormButtonUpdateExpense() {

  const { updateExpense } = useExpense();
  const { setInvalidFields, formExpense, clearAllFields } = useFormExpense();
  const onClick = async () => {

    try {
      const data = formToRequest(formExpense);
      await updateExpense(formExpense.id as number, data);
      clearAllFields();
    } catch (error: any) {
      setInvalidFields(error);
    }
  }

  return (
    <FcFormIconButtonUpdate
      description="alterar"
      onClick={onClick}
    />
  );
}
