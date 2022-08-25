import { dateIso8601, formatDateToForm } from "@common/DateHelper";
import { FcSelectFieldPayed } from "@components/fc-forms/fc-fields";
import { useFormTransference } from "@pages/transference/hooks";
import shallow from "zustand/shallow";

export function FcSelectFieldTransferencePayed() {
  const {
    payed,
    setPayed,
    invalidFields,
    setTransferenceDate,
  } = useFormTransference(
    (state) => ({
      payed: state.payed,
      setPayed: state.setPayed,
      invalidFields: state.invalidFields,
      setTransferenceDate: state.setTransferenceDate,
    }),
    shallow
  );

  const onChange = (e: any) => {
    const value = Boolean(e.target.value);
    setPayed(value);
    setTransferenceDate(value ? formatDateToForm(dateIso8601()) : undefined);
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
