import React, { useContext } from "react";
import { ContextForm } from "../../../Context/FormContext";
import { ContextAnoMes } from "../../../Context/AnoMesContext";
import { ContextChecked } from "../../../Context/CheckedContext";
import { ContextTotais } from "../../../Context/TotaisContext";
import { ContextAlert } from "../../../Context/AlertContext";
import { getUserIdFromToken } from "../../../common/Auth";
import { insereReceita } from "../../../common/ReceitaFuncoes";
import { calculaTotais } from "../../../common/Funcoes";
import { setCreatedAlert } from "../../../common/AlertFuncoes";
import { emptyFormularioReceita } from "../../../common/EmptyStates";
import FcFormIconButtonAdd from "../fc-form-button/fc-form-icon-button-add";
export default function FcFormButtonInsertYeld() {
  const ctxForm = useContext(ContextForm);
  const ctxAnoMes = useContext(ContextAnoMes);
  const ctxTotais = useContext(ContextTotais);
  const ctxChecked = useContext(ContextChecked);
  const ctxAlert = useContext(ContextAlert);

  return (
    <FcFormIconButtonAdd
      description="cadastrar"
      onClick={async () => {
        let response;
        ctxForm.form.user = getUserIdFromToken();
        ctxForm.form.valor = parseFloat(ctxForm.form.valor);

        response = await insereReceita(ctxForm.form);

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
