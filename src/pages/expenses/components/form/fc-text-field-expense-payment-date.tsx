import { FcTextFieldPaymentDate } from "components/fc-forms/fc-fields/fc-text-field-payment-date";
import { useFormExpense } from "@pages/expenses/hook/use-form-expense";

export function FcTextFieldExpensePaymentDate() {
  const {
    formExpense: { paymentDate, invalidFields },
    dispatch,
  } = useFormExpense();
  const invalidFieldMessage = invalidFields?.filter((field) => {
    return field.name === "pagamento";
  });
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      return;
    }
    dispatch({
      type: "setFormExpense",
      payload: { paymentDate: event.target.value },
    });
  };
  return (
    <FcTextFieldPaymentDate
      value={paymentDate}
      onChange={onChange}
      invalidFields={invalidFieldMessage}
    />
  );
}
