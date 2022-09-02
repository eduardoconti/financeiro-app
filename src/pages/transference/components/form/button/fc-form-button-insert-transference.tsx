import { TransferenceRequestDTO } from "@api/transference/dto";
import { setCreatedAlert } from "@common/AlertFuncoes";
import { dateIso8601 } from "@common/DateHelper";
import { Money } from "@common/money";
import { FcFormIconButtonAdd } from "@components/fc-forms/fc-form-button";
import { useSpin } from "@hooks/use-spin";
import {
  useTransference,
  useFormTransference,
} from "@pages/transference/hooks";
import { ContextAlert } from "Context";
import { useContext } from "react";
import shallow from "zustand/shallow";

export function FcFormButtonInsertTransference() {
  const { insertTransference } = useTransference();
  const {
    value,
    walletOriginId,
    walletDestinyId,
    payed,
    transferenceDate,
    setInvalidFields,
    clear,
  } = useFormTransference((state) => ({
    value: state.value,
    payed: state.payed,
    walletOriginId: state.walletOriginId,
    walletDestinyId: state.walletDestinyId,
    transferenceDate: state.transferenceDate,
    setInvalidFields: state.setInvalidFields,
    clear: state.clearAllFields,
  }), shallow);

  const { setAlert } = useContext(ContextAlert);
  const setSpin = useSpin((s) => s.setSpin);

  const onClick = async () => {
    try {
      setSpin(true);
      const req = TransferenceRequestDTO.build({
        valor: Money.toInteger(parseFloat(value)),
        carteiraOrigemId: walletOriginId,
        carteiraDestinoId: walletDestinyId,
        pago: payed,
        transferencia: dateIso8601(transferenceDate),
      });
      const { status, message, internalMessage } = await insertTransference(
        req
      );

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
