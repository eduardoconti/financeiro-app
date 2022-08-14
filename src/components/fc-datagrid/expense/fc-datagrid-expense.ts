import { HttpStatus } from "common/enum";
import { useEffect, useContext } from "react";

import { ExpenseService } from "api/expense/service";
import {
  ContextAlert,
  ContextAnoMes,
  ContextChecked,
  ContextDataGrid,
  ContextExpenseFilter,
  ContextForm,
  ContextTotais,
  ExpenseFilterContextType,
  SpinContext,
} from "Context";
import {
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
  const { stateTotais } = useContext(ContextTotais);
  const { stateCheckedDespesas } = useContext(ContextChecked);
  const { stateMesAtual, stateAnoAtual } = useContext(ContextAnoMes);
  const { rows, setRows, selectedRows } = useContext(ContextDataGrid);
  const { setSpin } = useContext(SpinContext);
  const { setAlert } = useContext(ContextAlert);
  const ctxForm = useContext(ContextForm);
  const { filter } = useContext(
    ContextExpenseFilter
  ) as ExpenseFilterContextType;

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
    async function SetRowsDataGrid() {
      setSpin(true);
      if (isAuthenticated() && selectedRows.length === 0) {
        const {
          status,
          message,
          internalMessage,
          title,
          detail,
          data,
        } = await new ExpenseService().getDespesas(
          stateCheckedDespesas,
          stateAnoAtual,
          stateMesAtual,
          filter
        );

        if (status === HttpStatus.OK) {
          setRows(formataDadosParaLinhasDataGrid(data));
          setStorageDataGridRows(
            JSON.stringify(formataDadosParaLinhasDataGrid(data))
          );
        } else {
          setAlert(
            setCreatedAlert(status, message ?? title, internalMessage ?? detail)
          );
        }
      } else {
        setRows([]);
      }
      setSpin(false);
    }
    SetRowsDataGrid();
  }, [
    stateCheckedDespesas,
    stateTotais,
    stateAnoAtual,
    stateMesAtual,
    setRows,
    selectedRows,
    filter,
    setSpin,
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
        const expenseDTO = expenseService.formataDadosParaFormulario(data);
        ctxForm.setForm(expenseDTO);
      }
    },
  });
}
