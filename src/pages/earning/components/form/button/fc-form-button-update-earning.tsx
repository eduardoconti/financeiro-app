import FcFormIconButtonUpdate from "@components/fc-forms/fc-form-button/fc-form-icon-button-update";
import { useGetCurrentTime } from "@hooks/use-current-time";
import { useDashValues } from "@hooks/use-dash-values";
import { useSpin } from "@hooks/use-spin";
import { formToRequest } from "@pages/earning/common";
import { useEarning, useFormEarning } from "@pages/earning/hooks";
import { setCreatedAlert } from "common";
import { ContextAlert } from "Context";
import { useContext } from "react";
import shallow from "zustand/shallow";
export function FcFormButtonUpdateEarning() {
  const { updateEarning, earnings } = useEarning(s => ({
    updateEarning: s.updateEarning,
    earnings: s.earnings
  }), shallow);
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
  }), shallow);

  const { setAlert } = useContext(ContextAlert);
  const setSpin = useSpin(s => s.setSpin);
  const calculate = useDashValues((s) => s.calculate);
  const { year, month } = useGetCurrentTime();

  const onClick = async () => {
    try {
      setSpin(true);
      const earning = earnings.find((e) => e.id === id);
      const earningRequest = formToRequest({
        ...earning,
        id,
        description,
        value,
        walletId,
        payed,
        paymentDate,
      });
      const { status, message, internalMessage } = await updateEarning(
        id,
        earningRequest
      );
      await calculate(year, month);
      setAlert(setCreatedAlert(status, message, internalMessage));
      clear();
    } catch (error: any) {
      setInvalidFields(error?.invalidFields);
      setAlert(setCreatedAlert(error.status, error.detail, error.title));
    } finally {
      setSpin(false);
    }
  };
  return <FcFormIconButtonUpdate description="alterar" onClick={onClick} />;
}
