import { useExpense, useFormExpense } from "@pages/expenses/hook";
import { FcFormIconButtonAdd } from "@components/fc-forms/fc-form-button";
import { formToRequest } from "@pages/expenses/common";

export function FcFormButtonInsertExpense() {

  const { setInvalidFields, formExpense, clearAllFields } = useFormExpense();
  const { insertExpense } = useExpense();
  const onClick = async () => {

    try {
      await insertExpense(formToRequest(formExpense));
      clearAllFields();
    } catch (error: any) {
      setInvalidFields(error);
    }
  }

  return (
    <FcFormIconButtonAdd
      description="cadastrar"
      onClick={onClick}
    />
  );
}
