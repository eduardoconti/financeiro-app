import { useFormExpense } from "@pages/expenses/hook/use-form-expense";
import { FcTextFieldDescription } from "components/fc-forms/fc-fields";
import { useMemo } from "react";

export function FcTextFieldExpenseDescription() {
  const {
    formExpense: { description, invalidFields },
    dispatch,
  } = useFormExpense();
  console.log('decription', description)
  return useMemo(() => {
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: "setFormExpense",
        payload: { description: event.target.value },
      });
    };
    const invalidFieldMessage = invalidFields?.filter((field) => {
      return field.name === "descricao";
    });
    return (
      <FcTextFieldDescription
        onChange={onChange}
        value={description}
        invalidFields={invalidFieldMessage}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [description, invalidFields]);
}
