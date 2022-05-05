import { HttpStatus } from "common/enum";
import { useEffect, useContext } from "react";

import { ExpenseService } from "api/expense/service";
import {
  ContextAlert,
  ContextAnoMes,
  ContextChecked,
  ContextDataGrid,
  ContextForm,
  ContextTotais,
  SpinContext,
} from "Context";
import {
  formataDadosParaFormulario,
  formataDadosParaLinhasDataGrid,
  isAuthenticated,
  setCreatedAlert,
  setStorageDataGridRows,
} from "common";
import { GridColumns, GridRowParams } from "@material-ui/data-grid";
import FcColumnDescription from "../fc-column-description";
import { FcColumnCategory } from "../fc-column-category";
import { FcColumnWallet } from "../fc-column-wallet";
import { FcColumnDueDate } from "../fc-column-duedate";
import { FcColumnPaymentDate } from "../fc-column-payment-date";
import { FcColumnValue } from "../fc-column-value";
import FcColumnActionsExpense from "./fc-column-actions-expense";
import FcDataGrid from "../fc-datagrid";

export default function FcDataGridExpense() {
  const ctxTotais = useContext(ContextTotais);
  const ctxChecked = useContext(ContextChecked);
  const ctxAnoMes = useContext(ContextAnoMes);
  const { rows, setRows } = useContext(ContextDataGrid);
  const { setSpin } = useContext(SpinContext);
  const ctxForm = useContext(ContextForm);
  const { setAlert } = useContext(ContextAlert);
  const stateTotais = ctxTotais.stateTotais;
  const stateCheckedDespesas = ctxChecked.stateCheckedDespesas;
  const stateMesAtual = ctxAnoMes.stateMesAtual;
  const stateAnoAtual = ctxAnoMes.stateAnoAtual;

  let columns: GridColumns = [FcColumnDescription()];

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
      return FcColumnActionsExpense({ field });
    },
  });

  useEffect(() => {
    async function setRowsDataGrid() {
      setSpin(true);
      if (isAuthenticated()) {
        const {
          status,
          message,
          internalMessage,
          data,
        } = await new ExpenseService().getDespesas(
          stateCheckedDespesas,
          stateAnoAtual,
          stateMesAtual
        );

        if (status === HttpStatus.OK) {
          setRows(formataDadosParaLinhasDataGrid(data));
          setStorageDataGridRows(
            JSON.stringify(formataDadosParaLinhasDataGrid(data))
          );
        }

        setAlert(setCreatedAlert(status, message, internalMessage));
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
    setAlert,
  ]);

  return FcDataGrid({
    rows,
    columns,
    checkboxSelection: true,
    rowClick: async (GridRowParams: GridRowParams) => {
      const expenseService = new ExpenseService();
      const { row } = GridRowParams;
      const { data, status } = await expenseService.getExpenseById(row.id);
      if (status === HttpStatus.OK) {
        ctxForm.setForm(expenseService.formataDadosParaFormulario(data));
      }
    },
  });
}