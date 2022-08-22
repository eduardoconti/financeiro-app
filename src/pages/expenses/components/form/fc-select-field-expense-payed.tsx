import { formatDateToForm } from "@common/DateHelper";
import { FcSelectFieldPayed } from "@components/fc-forms/fc-fields";
import { useFormExpense } from "@pages/expenses/hook";

export function FcSelectFieldExpesePayed() {
  const {
    formExpense: { payed, invalidFields },
    dispatch,
  } = useFormExpense();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "setFormExpense",
      payload: {
        payed: Boolean(event.target.value),
        paymentDate: Boolean(event.target.value)
          ? formatDateToForm()
          : undefined,
      },
    });
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
