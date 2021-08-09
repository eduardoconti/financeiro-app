import React, { useContext } from "react";
import { emptyFormularioTransferencia } from "../../common/EmptyStates";
import CorpoTransferencias from "./fc-transfer-body";
import { ContextAnoMes } from "../../Context/AnoMesContext";
import { FormProvider } from "../../Context/FormContext";

export default function FcTransfer() {
  const ctxAnoMes = useContext(ContextAnoMes);
  return (
    <FormProvider
      form={emptyFormularioTransferencia(
        ctxAnoMes.stateAnoAtual,
        ctxAnoMes.stateMesAtual
      )}
    >
      <CorpoTransferencias />
    </FormProvider>
  );
}
