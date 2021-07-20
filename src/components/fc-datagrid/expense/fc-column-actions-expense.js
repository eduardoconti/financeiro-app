import React, {useContext} from "react";
import { Grid } from "@material-ui/core";
import ActionFlagButon from "../fc-column-actions-flag-button";
import ActionUpdateButon from "../fc-column-actions-update-button";
import ActionDeleteButon from "../fc-column-actions-delete-button";
import ActionReplicateButon from "../fc-column-actions-replicate-button";
import {
  getDespesas,
  deletaDespesa,
  alteraFlagPago,
  formataDadosParaLinhasDataGrid,
  formataDadosParaFormulario,
  retornaDespesaPorId,
  insereDespesa,
} from "../../../common/DepesaFuncoes";

import { ContextChecked } from "../../../Context/CheckedContext";
import { ContextAnoMes } from "../../../Context/AnoMesContext";
import { ContextDataGrid } from "../../../Context/DataGridContext";
import { SpinContext } from "../../../Context/SpinContext";
import { ContextForm } from "../../../Context/FormContext";

import { getUserIdFromToken, isAuthenticated } from "../../../common/Auth";
export default function FcColumnActionsExpense(props) {

  const ctxChecked = useContext(ContextChecked);
  const ctxAnoMes = useContext(ContextAnoMes);
  const ctxSpin = useContext(SpinContext);
  const ctxForm = useContext(ContextForm);
  const ctxDataGrid = useContext(ContextDataGrid);

  const stateCheckedDespesas = ctxChecked.stateCheckedDespesas;
  const stateMesAtual = ctxAnoMes.stateMesAtual;
  const stateAnoAtual = ctxAnoMes.stateAnoAtual;

  async function pegaDespesas() {
    ctxSpin.setSpin(true);
    if (isAuthenticated()) {
      let despesas = await getDespesas(
        stateCheckedDespesas,
        stateAnoAtual,
        stateMesAtual
      );

      if (despesas.statusCode === 200) {
        ctxDataGrid.setRows(formataDadosParaLinhasDataGrid(despesas.data));
      }
    }
    ctxSpin.setSpin(false);
  }

  const { field } = props;
  return (
      <Grid>
        <ActionFlagButon
          payed={field.row.pago}
          onClick={async () => {
            const { id, pago } = field.row;
            const despesa = {
              id: id,
              pago: !pago,
            };

            const res = await alteraFlagPago(despesa);
            await pegaDespesas();
            return res;
          }}
        />
        <ActionUpdateButon
          onClick={async () => {
            const { data: formulario } = await retornaDespesaPorId(
              field.row.id
            );
            ctxForm.setForm(formataDadosParaFormulario(formulario));
          }}
        />
        <ActionDeleteButon
          onClick={async () => {
            const response = await deletaDespesa(field.row.id);
            await pegaDespesas();
            return response;
          }}
        />
        <ActionReplicateButon
          onClick={async () => {
            let res = await retornaDespesaPorId(field.row.id);
            if (res.statusCode === 200) {
              let { data: despesa } = res;
              const nextDate = new Date(
                stateAnoAtual,
                stateMesAtual,
                10
              ).toISOString();

              despesa.id = 0;
              despesa.vencimento = nextDate;
              despesa.dataPagamento = nextDate;
              despesa.pago = false;
              despesa.user = getUserIdFromToken();

              res = await insereDespesa(formataDadosParaFormulario(despesa));

              if (res.statusCode === 200) {
                await pegaDespesas();
              }

              return res;
            }
          }}
        />
      </Grid>
  );
}
