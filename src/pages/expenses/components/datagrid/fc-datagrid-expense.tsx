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

function expenseToDataGrid(expenses: ExpenseResposeDTO[]): IDataGridRow[] {
  return expenses.map((expense) => {
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
    return {
      id: id,
      description: descricao,
      subCategoryId: subCategory.description,
      categoryId: categoria.descricao,
      payed: pago,
      walletId: carteira.descricao,
      dueDate: formatDateToDataGrid(vencimento),
      value: Money.format(valor),
      paymentDate: pagamento ? formatDateToDataGrid(pagamento) : undefined,
    };
  });
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
  const { expenses } = useExpense();
  const { setRows, rows, setSelectedRows } = useDataGridExpense();
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
    setRows(expenseToDataGrid(expenses));
  }, [expenses, setRows]);

  const dataGrid = React.useMemo(() => {
    return (
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
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expenses, rows]);

  return (
    <React.Fragment>
      {dataGrid}
      <FcSelectedRowsExpense />
    </React.Fragment>
  );
}
