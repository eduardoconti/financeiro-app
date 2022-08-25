import FcTextFieldValue from "components/fc-forms/fc-fields/fc-text-field-value";
import { useFormExpense } from "@pages/expenses/hook/use-form-expense";
import shallow from "zustand/shallow";

const NUMERIC_REGEXP = /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/;

export function FcTextFieldExpenseValue() {
  const { invalidFields, value, setValue } = useFormExpense(
    (s) => ({
      invalidFields: s.invalidFields,
      value: s.value,
      setValue: s.setValue,
    }),
    shallow
  );

  const invalidFieldMessage = invalidFields?.filter((field) => {
    return field.name === "valor";
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;

    if (value && !value.match(NUMERIC_REGEXP)) {
      return;
    }
    setValue(value ?? "");
  };
  return (
    <FcTextFieldValue
      value={value}
      onChange={onChange}
      invalidFields={invalidFieldMessage}
      required
    />
  );
}
