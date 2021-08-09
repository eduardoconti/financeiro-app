import React, { useContext } from "react";
import { emptyFormularioReceita } from "../../common/EmptyStates";
import CorpoReceitas from "./fc-yield-body.js";
import { ContextAnoMes } from "../../Context/AnoMesContext";
import { FormProvider } from "../../Context/FormContext";

export default function FcYield() {
  const ctxAnoMes = useContext(ContextAnoMes);
  return (
    <FormProvider
      form={emptyFormularioReceita(
        ctxAnoMes.stateAnoAtual,
        ctxAnoMes.stateMesAtual
      )}
    >
      <CorpoReceitas />
    </FormProvider>
  );
}
