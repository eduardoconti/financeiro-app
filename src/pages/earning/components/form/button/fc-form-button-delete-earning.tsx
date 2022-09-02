import { setCreatedAlert } from "@common/AlertFuncoes";
import FcFormIconButtonDelete from "@components/fc-forms/fc-form-button/fc-form-icon-button-delete";
import { useDashValues } from "@hooks/use-dash-values";
import { useSpin } from "@hooks/use-spin";
import { useEarning, useFormEarning } from "@pages/earning/hooks";
import { ContextAlert } from "Context";
import { useContext } from "react";
import shallow from "zustand/shallow";

export function FcFormButtonDeleteEarning() {
  const { deleteEarning, earnings } = useEarning(
    (s) => ({ deleteEarning: s.deleteEarning, earnings: s.earnings }),
    shallow
  );
  const { id, clearAllFields: clear } = useFormEarning(
    (s) => ({
      id: s.id,
      clearAllFields: s.clearAllFields,
    }),
    shallow
  );
  const { setAlert } = useContext(ContextAlert);
  const setSpin = useSpin((s) => s.setSpin);

  const {
    subAmount,
    subEarningsOpen,
    subEarningsPayed,
    subBallance,
  } = useDashValues((s) => ({
    subAmount: s.subAmount,
    subEarningsOpen: s.subEarningsOpen,
    subEarningsPayed: s.subEarningsPayed,
    subBallance: s.subBallance,
  }), shallow);

  const onClick = async () => {
    try {
      setSpin(true);
      const earning = earnings.find((e) => e.id === id);
      if (!earning) return;
      const { status, message, internalMessage } = await deleteEarning(id);
      const { valor, pago } = earning;
      if (pago) {
        subAmount(valor);
        subEarningsPayed(valor);
      } else {
        subEarningsOpen(valor);
      }
      subBallance(valor);
      setAlert(setCreatedAlert(status, message, internalMessage));
      clear();
    } catch (error: any) {
      setAlert(setCreatedAlert(error.status, error.detail, error.title));
    } finally {
      setSpin(false);
    }
  };
  return (
    <FcFormIconButtonDelete
      description="delete"
      disabled={id === 0}
      onClick={onClick}
    />
  );
}
