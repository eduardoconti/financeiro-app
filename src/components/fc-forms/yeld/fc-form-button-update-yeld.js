import React, { useContext } from "react";
import { ContextForm } from "../../../Context/FormContext";
import { ContextAnoMes } from "../../../Context/AnoMesContext";
import { ContextChecked } from "../../../Context/CheckedContext";
import { ContextTotais } from "../../../Context/TotaisContext";
import { ContextAlert } from "../../../Context/AlertContext";
import { getUserIdFromToken } from "../../../common/Auth";
import { alteraReceita } from "../../../common/ReceitaFuncoes";
import { calculaTotais } from "../../../common/Funcoes";
import { setCreatedAlert } from "../../../common/AlertFuncoes";
import { emptyFormularioReceita } from "../../../common/EmptyStates";
import FcFormIconButtonUpdate from "../fc-form-button/fc-form-icon-button-update";
export default function FcFormButtonUpdateYeld() {
  const ctxForm = useContext(ContextForm);
  const ctxAnoMes = useContext(ContextAnoMes);
  const ctxTotais = useContext(ContextTotais);
  const ctxChecked = useContext(ContextChecked);
  const ctxAlert = useContext(ContextAlert);

  return (
    <FcFormIconButtonUpdate
      description="alterar"
      onClick={async () => {
        let response;
        ctxForm.form.userId = getUserIdFromToken();
        ctxForm.form.valor = parseFloat(ctxForm.form.valor);
        ctxForm.form.pagamento = new Date(ctxForm.form.pagamento + ':').toISOString();

        response = await alteraReceita(ctxForm.form);

        ctxAlert.setAlert(
          setCreatedAlert(
            response.status,
            response.message,
            response.internalMessage
          )
        );
        if ([200, 201].includes(response.status)) {
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
