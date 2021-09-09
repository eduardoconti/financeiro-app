import React, { useEffect, useContext } from "react";

import { ContextTotais } from "../../../Context/TotaisContext";
import { ContextChecked } from "../../../Context/CheckedContext";
import { ContextAnoMes } from "../../../Context/AnoMesContext";
import { SpinContext } from "../../../Context/SpinContext";
import { ContextForm } from "../../../Context/FormContext";
import { ContextDataGrid } from "../../../Context/DataGridContext";
import FcColumnDescription from "../fc-column-description";
import { FcColumnWallet } from "../fc-column-wallet";
import { FcColumnValue } from "../fc-column-value";
import FcDataGrid from "../fc-datagrid";

import { isAuthenticated } from "../../../common/Auth";
import {
  getReceitas,
  formataDadosParaLinhasDataGrid,
  formataDadosParaFormulario,
  getYieldById,
} from "../../../common/ReceitaFuncoes";
import FcColumnActionsYeld from "./fc-column-actions-yeld";
import { FcColumnPaymentDate } from "../fc-column-payment-date";
import { setStorageDataGridRows } from "../../../common/DataGridStorage";

export default function FcDataGridYeld() {
  const ctxTotais = useContext(ContextTotais);
  const ctxChecked = useContext(ContextChecked);
  const ctxAnoMes = useContext(ContextAnoMes);
  const ctxDataGrid = useContext(ContextDataGrid);
  const ctxSpin = useContext(SpinContext);
  const ctxForm = useContext(ContextForm);

  const stateTotais = ctxTotais.stateTotais;
  const stateCheckedReceitas = ctxChecked.stateCheckedReceitas;
  const stateMesAtual = ctxAnoMes.stateMesAtual;
  const stateAnoAtual = ctxAnoMes.stateAnoAtual;
  const rows = ctxDataGrid.rows;

  let columns = [new FcColumnDescription()];

  if (window.innerWidth >= 960) {
    columns.push(FcColumnWallet, FcColumnPaymentDate);
  }

  columns.push(FcColumnValue, {
    field: "payed",
    headerName: "Pago",
    width: 120,
    sortable: false,
    renderCell: function operacoes(field) {
      return <FcColumnActionsYeld field={field} />;
    },
  });

  async function setRowsDataGrid() {
    ctxSpin.setSpin(true);
    if (isAuthenticated()) {
      let receitas = await getReceitas(
        stateCheckedReceitas,
        stateAnoAtual,
        stateMesAtual
      );

      if (receitas.statusCode === 200) {
        let formated = formataDadosParaLinhasDataGrid(receitas.data);
        ctxDataGrid.setRows(formated);
        setStorageDataGridRows(JSON.stringify(formated));
      }
    }
    ctxSpin.setSpin(false);
  }
  useEffect(() => {
    setRowsDataGrid(); // eslint-disable-next-line
  }, [stateCheckedReceitas, stateTotais, stateAnoAtual, stateMesAtual]);

  return (
    <FcDataGrid
      rows={rows}
      columns={columns}
      checkboxSelection
      rowClick={async (GridRowParams) => {
        const { row } = GridRowParams;
        const getYield = await getYieldById(row.id);
        if (getYield.statusCode === 200) {
          ctxForm.setForm(formataDadosParaFormulario(getYield.data));
        }
      }}
    />
  );
}
