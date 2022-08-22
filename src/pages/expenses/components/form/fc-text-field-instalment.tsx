import { FcTextField } from "@components/fc-forms/fc-fields";
import { useFormExpense } from "@pages/expenses/hook";
import { useCallback, useMemo } from "react";

export function FcTextFieldInstalment() {
  const {
    formExpense: { installments, invalidFields },
    dispatch,
  } = useFormExpense();

  const invalidFieldMessage = invalidFields?.filter((field) => {
    return field.name === "instalment";
  });

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!event.target.value) {
        return;
      }
      dispatch({
        type: "setFormExpense",
        payload: { installments: parseInt(event.target.value ?? "1") },
      });
    },
    [dispatch]
  );

  return useMemo(() => {
    return (
      <FcTextField
        id="instalment"
        label="Parcela"
        value={installments}
        onChange={onChange}
        invalidFields={invalidFieldMessage}
        required
      />
    );
  }, [installments, invalidFieldMessage, onChange]);
}
