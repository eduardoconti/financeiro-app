import React, { useContext } from "react";
import { emptyFormularioDespesa } from "../../common/EmptyStates";
import CorpoDespesas from "./fc-expense-body";
import { ContextAnoMes } from "../../Context/AnoMesContext";
import { FormProvider } from "../../Context/FormContext";

export default function FcExpense() {
  const ctxAnoMes = useContext(ContextAnoMes);
  return (
    <FormProvider
      form={emptyFormularioDespesa(
        ctxAnoMes.stateAnoAtual,
        ctxAnoMes.stateMesAtual
      )}
    >
      <CorpoDespesas />
    </FormProvider>
  );
}
