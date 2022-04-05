import { emptyFormularioDespesa } from "common";
import { ContextAnoMes, FormProvider } from "Context";
import React, { useContext } from "react";

import CorpoDespesas from "./fc-expense-body";

export default function FcExpense() {
  const { stateAnoAtual, stateMesAtual } = useContext(ContextAnoMes);
  return (
    <FormProvider form={emptyFormularioDespesa(stateAnoAtual, stateMesAtual)}>
      <CorpoDespesas />
    </FormProvider>
  );
}
