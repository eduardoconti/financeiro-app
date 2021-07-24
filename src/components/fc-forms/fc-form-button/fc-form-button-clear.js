import React, { useContext } from "react";
import FcFormButton from "../fc-form-button/fc-form-button";
import { ContextForm } from "../../../Context/FormContext";
import { ContextAnoMes } from "../../../Context/AnoMesContext";
import { emptyFormularioDespesa } from "../../../common/EmptyStates";
export default function FcFormButtonClear() {
  const ctxForm = useContext(ContextForm);
  const ctxAnoMes = useContext(ContextAnoMes);
  return (
    <FcFormButton
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
