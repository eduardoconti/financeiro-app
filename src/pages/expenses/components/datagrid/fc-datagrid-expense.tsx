import React, { useEffect } from "react";

import { formatDateToDataGrid, formatDateToForm, Money } from "common";
import {
  GridColumns,
  GridRowParams,
  GridSelectionModel,
} from "@material-ui/data-grid";

import { FcColumnCategory } from "../../../../components/fc-datagrid/fc-column-category";
import { FcColumnWallet } from "../../../../components/fc-datagrid/fc-column-wallet";
import { FcColumnValue } from "../../../../components/fc-datagrid/fc-column-value";
import FcColumnActionsExpense from "../../../../components/fc-datagrid/expense/fc-column-actions-expense";
import FcDataGrid from "../../../../components/fc-datagrid/fc-datagrid";
import { useExpense } from "pages/expenses/hook/use-expense";
import { useDataGridExpense } from "pages/expenses/hook/use-data-grid-expense";

import { ExpenseResposeDTO } from "api/expense/dto";
import { IDataGridRow } from "pages/expenses/context/data-grid-expense-context";
import { useFormExpense } from "@pages/expenses/hook/use-form-expense";
import { ExpenseFormType } from "pages/expenses/context/form-expense-context";
import { FcSelectedRowsExpense } from "./fc-selected-rows-expense";
import FcColumnDescription from "components/fc-datagrid/fc-column-description";
import { FcColumnSubCategory } from "@components/fc-datagrid/fc-column-sub-category";
import { useSpin } from "@hooks/use-spin";
import { CheckedValues, useDashValues } from "@hooks/use-dash-values";
import { useGetCurrentTime } from "@hooks/use-current-time";
import shallow from "zustand/shallow";

function expenseToDataGrid(expenses: ExpenseResposeDTO[], checked?: CheckedValues): IDataGridRow[] {
  const dataGridRows: IDataGridRow[] = []
  expenses.forEach((expense) => {
    const {
      id,
      descricao,
      pago,
      valor,
      vencimento,
      pagamento,
      categoria,
      carteira,
      subCategory,
    } = expense;

    if (checked) {
      if (!checked.open && !pago) {
        return
      }

      if (!checked.payed && pago) {
        return
      }
    }
    dataGridRows.push({
      id: id,
      description: descricao,
      subCategoryId: subCategory.description,
      categoryId: categoria.descricao,
      payed: pago,
      walletId: carteira.descricao,
      dueDate: formatDateToDataGrid(vencimento),
      value: Money.format(valor),
      paymentDate: pagamento ? formatDateToDataGrid(pagamento) : undefined,
    });

  });
  return dataGridRows;
}

function expenseToForm(expense: ExpenseResposeDTO): ExpenseFormType {
  const {
    id,
    descricao,
    pago,
    valor,
    vencimento,
    pagamento,
    categoria,
    carteira,
    subCategory,
    instalment,
  } = expense;
  return {
    id,
    description: descricao,
    subCategoryId: subCategory.id,
    categoryId: categoria.id,
    payed: pago,
    walletId: carteira.id,
    dueDate: formatDateToForm(vencimento),
    value: Money.toFloat(valor).toString(),
    paymentDate: pagamento ? formatDateToForm(pagamento) : undefined,
    installments: instalment,
  };
}

export function FcDataGridExpense() {
  const { setSelectedRows } = useDataGridExpense();
  const { initExpenses, expenses } = useExpense((state) => ({ initExpenses: state.fetchExpenses, expenses: state.expenses }), shallow);
  const setSpin = useSpin((state) => state.setSpin);
  const { checkExpenses, calculate } = useDashValues((state) => ({ checkExpenses: state.checkExpenses, calculate: state.calculate }), shallow);
  const { year, month } = useGetCurrentTime();

  const rows = React.useMemo(()=>{
    return expenseToDataGrid(expenses, checkExpenses)
  }, [expenses, checkExpenses])
  const { dispatch } = useFormExpense();
  let columns: GridColumns = [FcColumnDescription()];

  if (window.innerWidth >= 960) {
    columns.push(FcColumnCategory, FcColumnSubCategory, FcColumnWallet);
  }

  columns.push(FcColumnValue, {
    field: "payed",
    headerName: "Pago",
    type: "boolean",
    width: 100,
    sortable: false,
    renderCell: function operacoes(field) {
      return FcColumnActionsExpense({ field });
    },
  });


  useEffect(() => {
    async function start() {
      try {
        setSpin(true);
        initExpenses({ month: month, year: year })
      } catch (error) {
        console.log(error);
      } finally {
        setSpin(false);
      }
    }
    start();
  }, [
    initExpenses,
    month,
    setSpin,
    year,
  ]);

  useEffect(() => {
    async function start() {
      try {
        setSpin(true);
        await calculate(year, month)
      } catch (error) {
        console.log(error);
      } finally {
        setSpin(false);
      }
    }
    start();
  }, [calculate, month, setSpin, year])

  return (
    <React.Fragment>
      <FcDataGrid
        rows={rows}
        columns={columns}
        checkboxSelection={true}
        rowClick={async (GridRowParams: GridRowParams) => {
          const { id } = GridRowParams;
          const expense = expenses.find((element) => {
            return element.id === id;
          });
          if (!expense) {
            return;
          }

          dispatch({
            type: "setFormExpense",
            payload: expenseToForm(expense),
          });
        }}
        onSelectionModelChange={async (
          gridSelectionModel: GridSelectionModel
        ) => {
          setSelectedRows(gridSelectionModel as number[]);
        }}
      />
      <FcSelectedRowsExpense />
    </React.Fragment>
  );
}
