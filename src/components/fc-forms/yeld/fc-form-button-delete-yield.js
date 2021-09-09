import React, { useContext } from "react";
import { ContextForm } from "../../../Context/FormContext";
import { ContextAnoMes } from "../../../Context/AnoMesContext";
import { ContextChecked } from "../../../Context/CheckedContext";
import { ContextTotais } from "../../../Context/TotaisContext";
import { ContextAlert } from "../../../Context/AlertContext";
import { calculaTotais } from "../../../common/Funcoes";
import { setCreatedAlert } from "../../../common/AlertFuncoes";
import { emptyFormularioReceita } from "../../../common/EmptyStates";
import FcFormIconButtonDelete from "../fc-form-button/fc-form-icon-button-delete";
import { deletaReceita } from "../../../common/ReceitaFuncoes";
export default function FcFormButtonDeleteYield() {
  const ctxForm = useContext(ContextForm);
  const ctxAnoMes = useContext(ContextAnoMes);
  const ctxTotais = useContext(ContextTotais);
  const ctxChecked = useContext(ContextChecked);
  const ctxAlert = useContext(ContextAlert);

  return (
    <FcFormIconButtonDelete
      description="delete"
      disabled={ctxForm.form.id === 0}
      onClick={async () => {
        let response = await deletaReceita(ctxForm.form.id);

        ctxAlert.setAlert(
          setCreatedAlert(
            response.statusCode,
            response.message,
            response.internalMessage
          )
        );
        if ([200, 201].includes(response.statusCode)) {
          ctxTotais.setStateTotais(
            await calculaTotais(
              ctxChecked.stateCheckedDespesas,
              ctxChecked.stateCheckedReceitas,
              ctxAnoMes.stateAnoAtual,
              ctxAnoMes.stateMesAtual
            )
          );
          ctxForm.setForm(
            emptyFormularioReceita(
              ctxAnoMes.stateAnoAtual,
              ctxAnoMes.stateMesAtual
            )
          );
        }
      }}
    />
  );
}
