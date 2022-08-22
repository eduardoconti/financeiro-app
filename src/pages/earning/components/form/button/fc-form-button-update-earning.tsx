import FcFormIconButtonUpdate from "@components/fc-forms/fc-form-button/fc-form-icon-button-update";
import { useGetCurrentTime } from "@hooks/use-current-time";
import { useDashValues } from "@hooks/use-dash-values";
import { useSpin } from "@hooks/use-spin";
import { useEarning, useFormEarning } from "@pages/earning/hooks";
import { dateIso8601, Money, setCreatedAlert } from "common";
import { ContextAlert } from "Context";
import { useContext } from "react";
export function FcFormButtonUpdateEarning() {
  const { updateEarning, earnings } = useEarning();
  const {
    id,
    description,
    value,
    walletId,
    payed,
    paymentDate,
    setInvalidFields,
    clear,
  } = useFormEarning((state) => ({
    id: state.id,
    description: state.description,
    value: state.value,
    payed: state.payed,
    walletId: state.walletId,
    paymentDate: state.paymentDate,
    setInvalidFields: state.setInvalidFields,
    clear: state.clearAllFields,
  }));

  const { setAlert } = useContext(ContextAlert);
  const { setSpin } = useSpin();
  const { calculate } = useDashValues();
  const { year, month } = useGetCurrentTime();

  const onClick = async () => {
    try {
      setSpin(true);
      const earning = earnings.find((e) => e.id === id);
      const { status, message, internalMessage } = await updateEarning(id, {
        ...earning,
        descricao: description,
        valor: Money.toInteger(parseFloat(value)),
        carteiraId: walletId,
        pago: payed,
        pagamento: dateIso8601(paymentDate),
      });
      await calculate(year, month);
      setAlert(setCreatedAlert(status, message, internalMessage));
      clear();
    } catch (error: any) {
      setInvalidFields(error.invalidFields);
      setAlert(setCreatedAlert(error.status, error.detail, error.title));
    } finally {
      setSpin(false);
    }
  };
  return <FcFormIconButtonUpdate description="alterar" onClick={onClick} />;
}
