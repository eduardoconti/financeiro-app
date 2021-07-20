import React, {useContext} from "react";
import { Grid } from "@material-ui/core";
import ActionFlagButon from "../fc-column-actions-flag-button";
import ActionUpdateButon from "../fc-column-actions-update-button";
import ActionDeleteButon from "../fc-column-actions-delete-button";
import ActionReplicateButon from "../fc-column-actions-replicate-button";
import {
    getReceitas,
    deletaReceita,
    alteraFlagPago,
    formataDadosParaLinhasDataGrid,
    formataDadosParaFormulario,
    retornaReceitaPorId,
    insereReceita,
  } from "../../../common/ReceitaFuncoes";

import { ContextChecked } from "../../../Context/CheckedContext";
import { ContextAnoMes } from "../../../Context/AnoMesContext";
import { ContextDataGrid } from "../../../Context/DataGridContext";
import { SpinContext } from "../../../Context/SpinContext";
import { ContextForm } from "../../../Context/FormContext";

import { getUserIdFromToken, isAuthenticated } from "../../../common/Auth";
export default function FcColumnActionsYeld(props) {

  const ctxChecked = useContext(ContextChecked);
  const ctxAnoMes = useContext(ContextAnoMes);
  const ctxSpin = useContext(SpinContext);
  const ctxForm = useContext(ContextForm);
  const ctxDataGrid = useContext(ContextDataGrid);

  const stateCheckedReceitas = ctxChecked.stateCheckedReceitas;
  const stateMesAtual = ctxAnoMes.stateMesAtual;
  const stateAnoAtual = ctxAnoMes.stateAnoAtual;

  async function setStateReceitas() {
    if (isAuthenticated()) {
      ctxSpin.setSpin(true);
      let receitas = await getReceitas(
        stateCheckedReceitas,
        stateAnoAtual,
        stateMesAtual
      );

      if (receitas.statusCode === 200) {
        ctxDataGrid.setRows(formataDadosParaLinhasDataGrid(receitas.data));
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
            const receita = {
              id: id,
              pago: !pago,
            };

            const res = await alteraFlagPago(receita);
            await setStateReceitas();
            return res;
          }}
        />
        <ActionUpdateButon
          onClick={async () => {
            const { data: formulario } = await retornaReceitaPorId(
              field.row.id
            );
            ctxForm.setForm(formataDadosParaFormulario(formulario));
          }}
        />
        <ActionDeleteButon
          onClick={async () => {
            const response = await deletaReceita(field.row.id);
            await setStateReceitas();
            return response;
          }}
        />
        <ActionReplicateButon
          onClick={async () => {
            let res = await retornaReceitaPorId(field.row.id);
            if (res.statusCode === 200) {
              let { data: receita } = res;
              const nextDate = new Date(
                stateAnoAtual,
                stateMesAtual,
                10
              ).toISOString();

              receita.id = 0;
              receita.pagamento = nextDate;
              receita.pago = false;
              receita.user = getUserIdFromToken();

              res = await insereReceita(formataDadosParaFormulario(receita));

              if (res.statusCode === 200) {
                await setStateReceitas();
              }

              return res;
            }
          }}
        />
      </Grid>
  );
}
