import FcTextFieldDueDate from "components/fc-forms/fc-fields/fc-text-field-due-date";
import { useFormExpense } from "@pages/expenses/hook/use-form-expense";
import shallow from "zustand/shallow";

export function FcTextFieldExpenseDueDate() {
  const { invalidFields, dueDate, setDueDate } = useFormExpense(
    (s) => ({
      invalidFields: s.invalidFields,
      dueDate: s.dueDate,
      setDueDate: s.setDueDate,
    }),
    shallow
  );

  const invalidFieldMessage = invalidFields?.filter((field) => {
    return field.name === "vencimento";
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      return;
    }
    setDueDate(event.target.value);
  };

  return (
    <FcTextFieldDueDate
      value={dueDate}
      onChange={onChange}
      invalidFields={invalidFieldMessage}
      required
    />
  );
}
