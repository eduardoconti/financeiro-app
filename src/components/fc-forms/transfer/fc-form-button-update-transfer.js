import React, { useContext } from "react";
import FcFormButton from "../fc-form-button/fc-form-button";
import { ContextForm } from "../../../Context/FormContext";
import { ContextAlert } from "../../../Context/AlertContext";
import { getUserIdFromToken } from "../../../common/Auth";
import { setCreatedAlert } from "../../../common/AlertFuncoes";
import { alteraTransferencia, formataDadosParaLinhasDataGrid, getTransferencias } from "../../../common/TransferenciaFuncoes";
import { emptyFormularioTransferencia } from "../../../common/EmptyStates";
import { ContextAnoMes } from "../../../Context/AnoMesContext";
import { ContextDataGrid } from "../../../Context/DataGridContext";

export default function FcFormButtonUpdateTransfer() {
  const ctxForm = useContext(ContextForm);
  const ctxAlert = useContext(ContextAlert);
  const ctxAnoMes = useContext(ContextAnoMes);
  const ctxDataGrid = useContext(ContextDataGrid);

  return (
    <FcFormButton
      description="alterar"
      onClick={async () => {
        let response;
        ctxForm.form.user = getUserIdFromToken();
        ctxForm.form.valor = parseFloat(ctxForm.form.valor);

        response = await alteraTransferencia(ctxForm.form);

        ctxAlert.setAlert(
          setCreatedAlert(
            response.statusCode,
            response.message,
            response.internalMessage
          )
        );

        if ([200, 201].includes(response.statusCode)) {
        
          ctxForm.setForm(
            emptyFormularioTransferencia(
              ctxAnoMes.stateAnoAtual,
              ctxAnoMes.stateMesAtual
            )
          );

          let { data } = await getTransferencias(
            ctxAnoMes.stateAnoAtual,
            ctxAnoMes.stateMesAtual
          );
          ctxDataGrid.setRows(formataDadosParaLinhasDataGrid(data));
        }
      }}
    />
  );
}
