import FcTextFieldDueDate from "components/fc-forms/fc-fields/fc-text-field-due-date";
import { useFormExpense } from "@pages/expenses/hook/use-form-expense";

export function FcTextFieldExpenseDueDate() {
  const {
    formExpense: { dueDate, invalidFields },
    dispatch,
  } = useFormExpense();
  const invalidFieldMessage = invalidFields?.filter((field) => {
    return field.name === "vencimento";
  });
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      return;
    }
    dispatch({
      type: "setFormExpense",
      payload: { dueDate: event.target.value },
    });
  };
  return (
    <FcTextFieldDueDate
      value={dueDate}
      onChange={onChange}
      invalidFields={invalidFieldMessage}
    />
  );
}
