import React, { useContext } from "react";
import { ContextForm } from "../../../Context/FormContext";
import { ContextAnoMes } from "../../../Context/AnoMesContext";
import { emptyFormularioDespesa } from "../../../common/EmptyStates";
import FcFormIconButtonClear from "./fc-form-icon-button-clear";
export default function FcFormButtonClear() {
  const ctxForm = useContext(ContextForm);
  const ctxAnoMes = useContext(ContextAnoMes);
  return (
    <FcFormIconButtonClear
      description="limpar"
      onClick={() => {
        ctxForm.setForm(
          emptyFormularioDespesa(
            ctxAnoMes.stateAnoAtual,
            ctxAnoMes.stateMesAtual
          )
        );
      }}
    />
  );
}
