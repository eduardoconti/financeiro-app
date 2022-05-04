import React, { useEffect, useContext } from "react";

import { ContextTotais } from "../../../Context/TotaisContext";
import { ContextChecked } from "../../../Context/CheckedContext";
import { ContextAnoMes } from "../../../Context/AnoMesContext";
import { SpinContext } from "../../../Context/SpinContext";
import { ContextDataGrid } from "../../../Context/DataGridContext";
import FcColumnDescription from "../fc-column-description";
import { FcColumnCategory } from "../fc-column-category";
import { FcColumnWallet } from "../fc-column-wallet";
import { FcColumnDueDate } from "../fc-column-duedate";
import { FcColumnValue } from "../fc-column-value";
import FcDataGrid from "../fc-datagrid";

import { isAuthenticated } from "../../../common/Auth";
import FcColumnActionsExpense from "./fc-column-actions-expense";
import {
  getDespesas,
  formataDadosParaLinhasDataGrid,
  getExpenseById,
  formataDadosParaFormulario,
} from "../../../common/DepesaFuncoes";
import { setStorageDataGridRows } from "../../../common/DataGridStorage";
import { ContextForm } from "../../../Context/FormContext";
import { FcColumnPaymentDate } from "../fc-column-payment-date";

export default function FcDataGridExpense() {
  const ctxTotais = useContext(ContextTotais);
  const ctxChecked = useContext(ContextChecked);
  const ctxAnoMes = useContext(ContextAnoMes);
  const { rows, setRows } = useContext(ContextDataGrid);
  const { setSpin } = useContext(SpinContext);
  const ctxForm = useContext(ContextForm);
  const stateTotais = ctxTotais.stateTotais;
  const stateCheckedDespesas = ctxChecked.stateCheckedDespesas;
  const stateMesAtual = ctxAnoMes.stateMesAtual;
  const stateAnoAtual = ctxAnoMes.stateAnoAtual;

  let columns = [new FcColumnDescription()];

  if (window.innerWidth >= 960) {
    columns.push(
      FcColumnCategory,
      FcColumnWallet,
      FcColumnDueDate,
      FcColumnPaymentDate
    );
  }

  columns.push(FcColumnValue, {
    field: "payed",
    headerName: "Pago",
    width: 100,
    sortable: false,
    renderCell: function operacoes(field) {
      return <FcColumnActionsExpense field={field} />;
    },
  });

  useEffect(() => {
    async function setRowsDataGrid() {
      setSpin(true);
      if (isAuthenticated()) {
        let despesas = await getDespesas(
          stateCheckedDespesas,
          stateAnoAtual,
          stateMesAtual
        );

        if (despesas.status === 200) {
          setRows(formataDadosParaLinhasDataGrid(despesas.data));
          setStorageDataGridRows(
            JSON.stringify(formataDadosParaLinhasDataGrid(despesas.data))
          );
        }
      }
      setSpin(false);
    }
    setRowsDataGrid();
  }, [
    stateCheckedDespesas,
    stateTotais,
    stateAnoAtual,
    stateMesAtual,
    setSpin,
    setRows,
  ]);

  return (
    <FcDataGrid
      rows={rows}
      columns={columns}
      checkboxSelection
      rowClick={async (GridRowParams) => {
        const { row } = GridRowParams;
        const { data, status } = await getExpenseById(row.id);
        if (status === 200) {
          ctxForm.setForm(formataDadosParaFormulario(data));
        }
      }}
    />
  );
}
