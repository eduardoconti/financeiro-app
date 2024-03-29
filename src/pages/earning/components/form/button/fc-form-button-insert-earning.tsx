import { setCreatedAlert } from "@common/AlertFuncoes";
import { dateIso8601 } from "@common/DateHelper";
import { Money } from "@common/money";
import { FcFormIconButtonAdd } from "@components/fc-forms/fc-form-button";
import { useDashValues } from "@hooks/use-dash-values";
import { useSpin } from "@hooks/use-spin";
import { useEarning, useFormEarning } from "@pages/earning/hooks";
import { ContextAlert } from "Context";
import { useContext } from "react";
import shallow from "zustand/shallow";

export function FcFormButtonInsertEarning() {
  const insertEarning = useEarning((s) => s.insertEarning);
  const {
    description,
    value,
    walletId,
    payed,
    paymentDate,
    setInvalidFields,
    clear,
  } = useFormEarning(
    (state) => ({
      description: state.description,
      value: state.value,
      payed: state.payed,
      walletId: state.walletId,
      paymentDate: state.paymentDate,
      setInvalidFields: state.setInvalidFields,
      clear: state.clearAllFields,
    }),
    shallow
  );

  const { setAlert } = useContext(ContextAlert);
  const setSpin = useSpin((s) => s.setSpin);
  const {
    addAmount,
    earningsOpen,
    setEarningsOpen,
    earningsPayed,
    setEarningsPayed,
    addBallance,
  } = useDashValues(
    (s) => ({
      addAmount: s.addAmount,
      earningsOpen: s.earningsOpen,
      setEarningsOpen: s.setEarningsOpen,
      earningsPayed: s.earningsPayed,
      setEarningsPayed: s.setEarningsPayed,
      addBallance: s.addBallance,
    }),
    shallow
  );

  const onClick = async () => {
    try {
      setSpin(true);
      const req = {
        descricao: description,
        valor: Money.toInteger(parseFloat(value)),
        carteiraId: walletId,
        pago: payed,
        pagamento: dateIso8601(paymentDate),
      };
      const { status, message, internalMessage } = await insertEarning(req);
      if (payed) {
        setEarningsPayed(earningsPayed + req.valor);
        addAmount(req.valor);
      } else {
        setEarningsOpen(earningsOpen + req.valor);
      }
      addBallance(req.valor);
      setAlert(setCreatedAlert(status, message, internalMessage));
      clear();
    } catch (error: any) {
      setInvalidFields(error?.invalidFields);
      setAlert(setCreatedAlert(error.status, error.detail, error.title));
    } finally {
      setSpin(false);
    }
  };
  return <FcFormIconButtonAdd description="cadastrar" onClick={onClick} />;
}
