import React, { useContext } from "react";
import { Grid } from "@material-ui/core";
import ActionFlagButon from "../fc-column-actions-flag-button";
import ActionUpdateButon from "../fc-column-actions-update-button";
import ActionDeleteButon from "../fc-column-actions-delete-button";

import { ContextAnoMes } from "../../../Context/AnoMesContext";
import { ContextDataGrid } from "../../../Context/DataGridContext";
import { SpinContext } from "../../../Context/SpinContext";
import { ContextForm } from "../../../Context/FormContext";

import { isAuthenticated } from "../../../common/Auth";
import {
  formataDadosParaFormulario,
  alteraFlagPago,
  deletaTransferencia,
  getTransferencias,
  formataDadosParaLinhasDataGrid,
  getTransferenciaPorId,
} from "../../../common/TransferenciaFuncoes";
export default function FcColumnActionsTransfer(props) {
  const ctxAnoMes = useContext(ContextAnoMes);
  const ctxSpin = useContext(SpinContext);
  const ctxForm = useContext(ContextForm);
  const ctxDataGrid = useContext(ContextDataGrid);

  const stateMesAtual = ctxAnoMes.stateMesAtual;
  const stateAnoAtual = ctxAnoMes.stateAnoAtual;

  async function setDataGridRows() {
    if (isAuthenticated()) {
      ctxSpin.setSpin(true);
      let transferencias = await getTransferencias(
        stateAnoAtual,
        stateMesAtual
      );

      if (transferencias.status === 200) {
        ctxDataGrid.setRows(
          formataDadosParaLinhasDataGrid(transferencias.data)
        );
      }
      ctxSpin.setSpin(false);
    }
  }

  const { field } = props;
  return (
    <Grid>
      <ActionFlagButon
        payed={field.row.pago}
        onClick={async () => {
          const { id, pago } = field.row;
          const transferencia = {
            id: id,
            pago: !pago,
          };

          const res = await alteraFlagPago(transferencia);
          await setDataGridRows();
          return res;
        }}
      />
      <ActionUpdateButon
        onClick={async () => {
          const { data: formulario } = await getTransferenciaPorId(
            field.row.id
          );
          ctxForm.setForm(formataDadosParaFormulario(formulario));
        }}
      />
      <ActionDeleteButon
        onClick={async () => {
          const response = await deletaTransferencia(field.row.id);
          await setDataGridRows();
          return response;
        }}
      />
    </Grid>
  );
}
