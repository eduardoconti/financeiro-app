import React, { useContext } from "react";
import FcFormButton from "../fc-form-button/fc-form-button";
import { ContextForm } from "../../../Context/FormContext";
import { ContextAlert } from "../../../Context/AlertContext";
import { getUserIdFromToken } from "../../../common/Auth";
import { setCreatedAlert } from "../../../common/AlertFuncoes";
import { emptyFormularioTransferencia } from "../../../common/EmptyStates";
import {
  formataDadosParaLinhasDataGrid,
  getTransferencias,
  insereTransferencia,
} from "../../../common/TransferenciaFuncoes";
import { ContextAnoMes } from "../../../Context/AnoMesContext";
import { ContextDataGrid } from "../../../Context/DataGridContext";
import { dateIso8601, Money } from "common";

export default function FcFormButtonInsertTransfer() {
  const { form, setForm } = useContext(ContextForm);
  const ctxAlert = useContext(ContextAlert);
  const ctxAnoMes = useContext(ContextAnoMes);
  const ctxDataGrid = useContext(ContextDataGrid);

  return (
    <FcFormButton
      description="cadastrar"
      onClick={async () => {
        let response;
        form.transferencia = dateIso8601(form.transferencia);

        response = await insereTransferencia({
          ...form,
          valor: Money.toInteger(form.valor),
        });

        ctxAlert.setAlert(
          setCreatedAlert(
            response.status,
            response.message,
            response.internalMessage
          )
        );

        if ([200, 201].includes(response.status)) {
          setForm(
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
