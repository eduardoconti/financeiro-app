import { formatDateToForm, getDay } from "@common/DateHelper";
import { FcTextFieldPaymentDate } from "@components/fc-forms/fc-fields/fc-text-field-payment-date";
import { useFormTransference } from "@pages/transference/hooks";
import { ContextAnoMes } from "Context";
import { useContext, useEffect } from "react";
import shallow from "zustand/shallow";

export function FcTextFieldTransferenceDate() {
  const {
    transferenceDate,
    setTransferenceDate,
    invalidFields,
  } = useFormTransference(
    (s) => ({
      transferenceDate: s.transferenceDate,
      setTransferenceDate: s.setTransferenceDate,
      invalidFields: s.invalidFields,
    }),
    shallow
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTransferenceDate(e.target.value);
  };

  const invalidFieldMessage = invalidFields?.filter((field) => {
    return field.name === "transferencia";
  });

  const { stateMesAtual: month, stateAnoAtual: year } = useContext(
    ContextAnoMes
  );
  useEffect(() => {
    setTransferenceDate(formatDateToForm(new Date(year, month, getDay())));
  }, [month, setTransferenceDate, year]);

  return (
    <FcTextFieldPaymentDate
      value={transferenceDate}
      onChange={onChange}
      invalidFields={invalidFieldMessage}
    />
  );
}
