import React, { useContext } from "react";
import FcFormButton from "../fc-form-button/fc-form-button";
import { ContextForm } from "../../../Context/FormContext";
import { ContextAlert } from "../../../Context/AlertContext";
import { getUserIdFromToken } from "../../../common/Auth";
import { setCreatedAlert } from "../../../common/AlertFuncoes";
import { emptyFormularioTransferencia } from "../../../common/EmptyStates";
import { insereTransferencia } from "../../../common/TransferenciaFuncoes";
import { ContextAnoMes } from "../../../Context/AnoMesContext";
import { ContextChecked } from "../../../Context/CheckedContext";
import { ContextTotais } from "../../../Context/TotaisContext";
import { calculaTotais } from "../../../common/Funcoes";

export default function FcFormButtonInsertTransfer() {
  const ctxForm = useContext(ContextForm);
  const ctxAlert = useContext(ContextAlert);
  const ctxAnoMes = useContext(ContextAnoMes);
  const ctxTotais = useContext(ContextTotais);
  const ctxChecked = useContext(ContextChecked);

  return (
    <FcFormButton
      description="cadastrar"
      onClick={async () => {
        let response;
        ctxForm.form.user = getUserIdFromToken();

        response = await insereTransferencia(ctxForm.form);

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
        }

        ctxForm.setForm(
          emptyFormularioTransferencia(
            ctxAnoMes.stateAnoAtual,
            ctxAnoMes.stateMesAtual
          )
        );
      }}
    />
  );
}
