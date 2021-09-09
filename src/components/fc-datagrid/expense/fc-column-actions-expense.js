import React, { useContext } from "react";
import ActionFlagButon from "../fc-column-actions-flag-button";
import {
  getDespesas,
  alteraFlagPago,
  formataDadosParaLinhasDataGrid,
} from "../../../common/DepesaFuncoes";

import { ContextChecked } from "../../../Context/CheckedContext";
import { ContextAnoMes } from "../../../Context/AnoMesContext";
import { ContextDataGrid } from "../../../Context/DataGridContext";
import { SpinContext } from "../../../Context/SpinContext";

import { isAuthenticated } from "../../../common/Auth";
export default function FcColumnActionsExpense(props) {
  const ctxChecked = useContext(ContextChecked);
  const ctxAnoMes = useContext(ContextAnoMes);
  const ctxSpin = useContext(SpinContext);
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
  );
}
