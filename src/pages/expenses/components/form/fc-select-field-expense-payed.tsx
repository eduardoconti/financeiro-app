import { formatDateToForm } from "@common/DateHelper";
import { FcSelectFieldPayed } from "@components/fc-forms/fc-fields";
import { useFormExpense } from "@pages/expenses/hook";
import shallow from "zustand/shallow";

export function FcSelectFieldExpesePayed() {
  const { payed, invalidFields, setPayed, setPaymentDate } = useFormExpense(
    (s) => ({
      payed: s.payed,
      invalidFields: s.invalidFields,
      setPayed: s.setPayed,
      setPaymentDate: s.setPaymentDate,
    }),
    shallow
  );

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPayed(Boolean(event.target.value));
    setPaymentDate(
      Boolean(event.target.value) ? formatDateToForm() : undefined
    );
  };

  const invalidFieldMessage = invalidFields?.filter((field) => {
    return field.name === "pago";
  });

  return (
    <FcSelectFieldPayed
      value={payed}
      onChange={onChange}
      invalidFields={invalidFieldMessage}
      required
    />
  );
}
