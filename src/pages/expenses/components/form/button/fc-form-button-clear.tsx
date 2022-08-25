import FcFormButtonClear from "components/fc-forms/fc-form-button/fc-form-button-clear";
import { useFormExpense } from "@pages/expenses/hook/use-form-expense";

export default function FcFormButtonClearExpense() {
  const clearAllFields = useFormExpense((s) => s.clearAllFields);
  const onClick = () => {
    clearAllFields();
  };
  return <FcFormButtonClear onClick={onClick} />;
}
