import React, { useEffect, useContext } from "react";

import { ContextTotais } from "../../../Context/TotaisContext";
import { ContextChecked } from "../../../Context/CheckedContext";
import { ContextAnoMes } from "../../../Context/AnoMesContext";
import { SpinContext } from "../../../Context/SpinContext";
import { ContextDataGrid } from "../../../Context/DataGridContext";
import { FcColumnDescription } from "../fc-column-description";
import { FcColumnWallet } from "../fc-column-wallet";
import { FcColumnValue } from "../fc-column-value";
import FcDataGrid from "../fc-datagrid";

import { isAuthenticated } from "../../../common/Auth";
import { getReceitas,formataDadosParaLinhasDataGrid } from "../../../common/ReceitaFuncoes";
import FcColumnActionsYeld from "./fc-column-actions-yeld";
import { FcColumnPaymentDate } from "../fc-column-payment-date";


export default function FcDataGridYeld() {
  const ctxTotais = useContext(ContextTotais);
  const ctxChecked = useContext(ContextChecked);
  const ctxAnoMes = useContext(ContextAnoMes);
  const ctxDataGrid = useContext(ContextDataGrid);
  const ctxSpin = useContext(SpinContext);

  const stateTotais = ctxTotais.stateTotais;
  const stateCheckedReceitas = ctxChecked.stateCheckedReceitas;
  const stateMesAtual = ctxAnoMes.stateMesAtual;
  const stateAnoAtual = ctxAnoMes.stateAnoAtual;
  const rows = ctxDataGrid.rows

  let columns = [FcColumnDescription];

  if (window.innerWidth >= 960) {
    columns.push(FcColumnWallet, FcColumnPaymentDate);
  }

  columns.push(FcColumnValue,{
    field: "actions",
    headerName: "Operação",
    width: 140,
    sortable: false,
    renderCell: function operacoes(field){
      return( <FcColumnActionsYeld field={field}/>);
    }
  });

  async function setRowsDataGrid() {
    ctxSpin.setSpin(true);
    if (isAuthenticated()) {
      let despesas = await getReceitas(
        stateCheckedReceitas,
        stateAnoAtual,
        stateMesAtual
      );

      if (despesas.statusCode === 200) {
        ctxDataGrid.setRows(formataDadosParaLinhasDataGrid(despesas.data));
      }
    }
    ctxSpin.setSpin(false);
  }
  useEffect(() => {
    setRowsDataGrid(); // eslint-disable-next-line
  }, [stateCheckedReceitas, stateTotais, stateAnoAtual, stateMesAtual]);

  return (
      <FcDataGrid rows={rows} columns={columns} />
  );
}
