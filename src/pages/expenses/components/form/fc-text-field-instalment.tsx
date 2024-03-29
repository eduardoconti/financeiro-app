import { FcTextField } from "@components/fc-forms/fc-fields";
import { useFormExpense } from "@pages/expenses/hook";
import shallow from "zustand/shallow";

export function FcTextFieldInstalment() {
  const { invalidFields, installments, setInstallments } = useFormExpense(
    (s) => ({
      invalidFields: s.invalidFields,
      installments: s.installments,
      setInstallments: s.setInstallments,
    }),
    shallow
  );

  const invalidFieldMessage = invalidFields?.filter((field) => {
    return field.name === "instalment";
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInstallments(event.target.value);
  };

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
}
