import { formatDateToForm, getDay } from "@common/DateHelper";
import { FcTextFieldPaymentDate } from "@components/fc-forms/fc-fields/fc-text-field-payment-date";
import { useFormEarning } from "@pages/earning/hooks";
import { ContextAnoMes } from "Context";
import { useContext, useEffect } from "react";
import shallow from "zustand/shallow";

export function FcTextFieldEarningPaymentDate() {
  const { paymentDate, setForm, invalidFields} = useFormEarning((state) => (
    {
      paymentDate: state.paymentDate,
      setForm: state.setPaymentDate,
      invalidFields: state.invalidFields
    }), shallow);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(e.target.value);
  }

  const invalidFieldMessage = invalidFields?.filter((field) => {
    return field.name === "pagamento";
  });

  const { stateMesAtual: month, stateAnoAtual: year } = useContext(ContextAnoMes);
  useEffect(()=>{
    setForm(formatDateToForm(new Date(year, month, getDay())));
  }, [month, setForm, year]);

  return (
    <FcTextFieldPaymentDate value={paymentDate} onChange={onChange} invalidFields={invalidFieldMessage} />
  )
}