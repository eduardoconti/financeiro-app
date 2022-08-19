import FcTextFieldValue from "components/fc-forms/fc-fields/fc-text-field-value";
import { useFormExpense } from "@pages/expenses/hook/use-form-expense";
import { useMemo } from "react";

export function FcTextFieldExpenseValue() {
  const {
    formExpense: { value, invalidFields },
    dispatch,
  } = useFormExpense();

  const invalidFieldMessage = invalidFields?.filter((field) => {
    return field.name === "valor";
  });

  return useMemo(() => {
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!event.target.value) {
        return;
      }
      dispatch({
        type: "setFormExpense",
        payload: { value: event.target.value },
      });
    };
    return (
      <FcTextFieldValue
        value={value}
        onChange={onChange}
        invalidFields={invalidFieldMessage}
      />
    )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, invalidFieldMessage]);
}
