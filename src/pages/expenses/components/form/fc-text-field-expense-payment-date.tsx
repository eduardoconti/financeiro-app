import { FcTextFieldPaymentDate } from "components/fc-forms/fc-fields/fc-text-field-payment-date";
import { useFormExpense } from "@pages/expenses/hook/use-form-expense";
import shallow from "zustand/shallow";

export function FcTextFieldExpensePaymentDate() {
  const {
    invalidFields,
    paymentDate,
    setPaymentDate,
    setPayed,
  } = useFormExpense(
    (s) => ({
      invalidFields: s.invalidFields,
      paymentDate: s.paymentDate,
      setPaymentDate: s.setPaymentDate,
      setPayed: s.setPayed,
    }),
    shallow
  );

  const invalidFieldMessage = invalidFields?.filter((field) => {
    return field.name === "pagamento";
  });
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentDate(event.target.value);
    setPayed(event.target.value ? true : false);
  };
  return (
    <FcTextFieldPaymentDate
      value={paymentDate}
      onChange={onChange}
      invalidFields={invalidFieldMessage}
    />
  );
}
