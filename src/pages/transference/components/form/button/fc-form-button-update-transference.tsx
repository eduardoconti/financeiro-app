import { TransferenceRequestDTO } from "@api/transference/dto";
import FcFormIconButtonUpdate from "@components/fc-forms/fc-form-button/fc-form-icon-button-update";

import { useSpin } from "@hooks/use-spin";

import {
  useTransference,
  useFormTransference,
} from "@pages/transference/hooks";
import { dateIso8601, Money, setCreatedAlert } from "common";
import { ContextAlert } from "Context";
import { useContext } from "react";
import shallow from "zustand/shallow";
export function FcFormButtonUpdateTransference() {
  const { updateTransference, transferences } = useTransference();
  const {
    id,
    value,
    walletOriginId,
    walletDestinyId,
    payed,
    transferenceDate,
    setInvalidFields,
    clear,
  } = useFormTransference(
    (s) => ({
      id: s.id,
      value: s.value,
      payed: s.payed,
      walletOriginId: s.walletOriginId,
      walletDestinyId: s.walletDestinyId,
      transferenceDate: s.transferenceDate,
      setInvalidFields: s.setInvalidFields,
      clear: s.clearAllFields,
    }),
    shallow
  );

  const { setAlert } = useContext(ContextAlert);
  const setSpin = useSpin((s) => s.setSpin);

  const onClick = async () => {
    try {
      setSpin(true);
      const transference = transferences.find((e) => e.id === id);
      if (!transference) return;
      const transferenceRequest = TransferenceRequestDTO.build({
        id,
        valor: Money.toInteger(parseFloat(value)),
        carteiraOrigemId: walletOriginId,
        carteiraDestinoId: walletDestinyId,
        transferencia: dateIso8601(transferenceDate),
        pago: payed,
      });

      const { status, message, internalMessage } = await updateTransference(
        id,
        transferenceRequest
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
  return <FcFormIconButtonUpdate description="alterar" onClick={onClick} />;
}
