import React, { useContext } from "react";
import { Grid } from "@material-ui/core";
import ActionFlagButon from "../fc-column-actions-flag-button";
import {
  getReceitas,
  alteraFlagPago,
  formataDadosParaLinhasDataGrid,
} from "../../../common/ReceitaFuncoes";

import { ContextChecked } from "../../../Context/CheckedContext";
import { ContextAnoMes } from "../../../Context/AnoMesContext";
import { ContextDataGrid } from "../../../Context/DataGridContext";
import { SpinContext } from "../../../Context/SpinContext";

import { isAuthenticated } from "../../../common/Auth";
export default function FcColumnActionsYeld(props) {
  const ctxChecked = useContext(ContextChecked);
  const ctxAnoMes = useContext(ContextAnoMes);
  const ctxSpin = useContext(SpinContext);
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
    </Grid>
  );
}
