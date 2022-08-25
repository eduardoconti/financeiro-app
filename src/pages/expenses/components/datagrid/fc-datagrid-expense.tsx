import React, { useEffect } from "react";

import { formatDateToForm, Money } from "common";
import { GridColumns, GridSelectionModel } from "@material-ui/data-grid";

import { useFormExpense } from "@pages/expenses/hook/use-form-expense";
import { FcColumnSubCategory } from "@components/fc-datagrid/fc-column-sub-category";
import { useSpin } from "@hooks/use-spin";
import { useDashValues } from "@hooks/use-dash-values";
import { useGetCurrentTime } from "@hooks/use-current-time";
import shallow from "zustand/shallow";
import { IDataGridRow } from "@pages/expenses/context";
import { useDataGridExpense } from "@pages/expenses/hook/use-data-grid-expense";
import { useExpense } from "@pages/expenses/hook";
import FcColumnDescription from "@components/fc-datagrid/fc-column-description";
import { FcColumnWallet } from "@components/fc-datagrid/fc-column-wallet";
import { FcColumnCategory } from "@components/fc-datagrid/fc-column-category";
import FcColumnActionsExpense from "@components/fc-datagrid/expense/fc-column-actions-expense";
import { FcColumnValue } from "@components/fc-datagrid/fc-column-value";
import FcDataGrid from "@components/fc-datagrid/fc-datagrid";
import { FcSelectedRowsExpense } from "./fc-selected-rows-expense";
import { expenseToDataGrid } from "@pages/expenses/common";

export function FcDataGridExpense() {
  const { setSelectedRows } = useDataGridExpense();
  const { initExpenses, expenses } = useExpense(
    (state) => ({
      initExpenses: state.fetchExpenses,
      expenses: state.expenses,
    }),
    shallow
  );
  const setSpin = useSpin((state) => state.setSpin);
  const { checkExpenses } = useDashValues(
    (state) => ({
      checkExpenses: state.checkExpenses,
    }),
    shallow
  );
  const { year, month } = useGetCurrentTime();

  const rows = React.useMemo(() => {
    return expenseToDataGrid(expenses, checkExpenses);
  }, [expenses, checkExpenses]);
  const {
    setDescription,
    setCategoryId,
    setSubCategoryId,
    setWalletId,
    setValue,
    setInstallments,
    setDueDate,
    setPaymentDate,
    setPayed,
    setId,
  } = useFormExpense(
    (s) => ({
      setDescription: s.setDescription,
      setCategoryId: s.setCategoryId,
      setSubCategoryId: s.setSubCategoryId,
      setWalletId: s.setWalletId,
      setValue: s.setValue,
      setInstallments: s.setInstallments,
      setDueDate: s.setDueDate,
      setPaymentDate: s.setPaymentDate,
      setPayed: s.setPayed,
      setId: s.setId,
    }),
    shallow
  );

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
        initExpenses({ month: month, year: year });
      } catch (error) {
        console.log(error);
      } finally {
        setSpin(false);
      }
    }
    start();
  }, [initExpenses, month, setSpin, year]);

  return (
    <React.Fragment>
      <FcDataGrid
        rows={rows}
        columns={columns}
        checkboxSelection={true}
        rowClick={async (GridRowParams: { row: IDataGridRow }) => {
          const { row } = GridRowParams;
          const expense = expenses.find((element) => {
            return element.id === row.id;
          });
          if (!expense) {
            return;
          }
          setDescription(row.description);
          setCategoryId(expense.categoria.id);
          setSubCategoryId(expense.subCategory.id);
          setWalletId(expense.carteira.id);
          setValue(Money.toFloat(expense.valor).toString());
          setInstallments(expense.instalment);
          setDueDate(formatDateToForm(expense.vencimento));
          setPaymentDate(
            expense.pagamento ? formatDateToForm(expense.pagamento) : undefined
          );
          setPayed(expense.pago);
          setId(expense.id);
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
