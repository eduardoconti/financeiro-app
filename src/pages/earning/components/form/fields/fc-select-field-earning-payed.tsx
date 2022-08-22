import { dateIso8601, formatDateToForm } from "@common/DateHelper";
import { FcSelectFieldPayed } from "@components/fc-forms/fc-fields";
import { useFormEarning } from "@pages/earning/hooks";
import shallow from "zustand/shallow";

export function FcSelectFieldEarningPayed() {
  const { payed, setPayed, invalidFields, setPaymentDate } = useFormEarning(
    (state) => ({
      payed: state.payed,
      setPayed: state.setPayed,
      invalidFields: state.invalidFields,
      setPaymentDate: state.setPaymentDate,
    }),
    shallow
  );

  const onChange = (e: any) => {
    const value = Boolean(e.target.value);
    setPayed(value);
    setPaymentDate(value ? formatDateToForm(dateIso8601()) : undefined);
  };

  const invalidFieldMessage = invalidFields?.filter((field) => {
    return field.name === "pago";
  });

  return (
    <FcSelectFieldPayed
      value={payed}
      onChange={onChange}
      invalidFields={invalidFieldMessage}
    />
  );
}
