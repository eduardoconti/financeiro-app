import { useFormExpense } from "@pages/expenses/hook/use-form-expense";
import { FcTextFieldDescription } from "components/fc-forms/fc-fields";
import shallow from "zustand/shallow";

export function FcTextFieldExpenseDescription() {
  const { description, invalidFields, setDescription } = useFormExpense(
    (s) => ({
      description: s.description,
      invalidFields: s.invalidFields,
      setDescription: s.setDescription,
    }),
    shallow
  );

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };
  const invalidFieldMessage = invalidFields?.filter((field) => {
    return field.name === "descricao";
  });
  return (
    <FcTextFieldDescription
      onChange={onChange}
      value={description}
      invalidFields={invalidFieldMessage}
      required
    />
  );
}
