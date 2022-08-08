import { useContext } from "react";
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

import { isAuthenticated } from "../../../common/Auth";
export default function FcColumnActionsYeld(props) {
  const ctxChecked = useContext(ContextChecked);
  const ctxAnoMes = useContext(ContextAnoMes);
  const ctxDataGrid = useContext(ContextDataGrid);

  const stateCheckedReceitas = ctxChecked.stateCheckedReceitas;
  const stateMesAtual = ctxAnoMes.stateMesAtual;
  const stateAnoAtual = ctxAnoMes.stateAnoAtual;

  async function setStateReceitas() {
    if (isAuthenticated()) {
      let receitas = await getReceitas(
        stateCheckedReceitas,
        stateAnoAtual,
        stateMesAtual
      );

      if (receitas.status === 200) {
        ctxDataGrid.setRows(formataDadosParaLinhasDataGrid(receitas.data));
      }
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
