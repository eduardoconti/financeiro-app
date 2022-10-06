import React, { useEffect } from "react";

import { formatDateToForm, Money } from "common";
import { GridColumns, GridSelectionModel } from "@material-ui/data-grid";

import { useFormExpense } from "@pages/expenses/hook/use-form-expense";
import { FcColumnSubCategory } from "@components/fc-datagrid/fc-column-sub-category";
import { useSpin } from "@hooks/use-spin";
import { useDashValues } from "@hooks/use-dash-values";
import { useGetCurrentTime } from "@hooks/use-current-time";
import shallow from "zustand/shallow";
import { useDataGridExpense } from "@pages/expenses/hook/use-data-grid-expense";
import { useExpense, useExpenseFilter } from "@pages/expenses/hook";
import FcColumnDescription from "@components/fc-datagrid/fc-column-description";
import { FcColumnWallet } from "@components/fc-datagrid/fc-column-wallet";
import { FcColumnCategory } from "@components/fc-datagrid/fc-column-category";
import { FcColumnValue } from "@components/fc-datagrid/fc-column-value";
import FcDataGrid from "@components/fc-datagrid/fc-datagrid";
import { FcSelectedRowsExpense } from "./fc-selected-rows-expense";
import { expenseToDataGrid } from "@pages/expenses/common";
import { Grid } from "@material-ui/core";
import { FcColumnActionsExpense } from "./fc-column-actions-expense";

export function FcDataGridExpense() {
  const { setSelectedRows, selectedRows } = useDataGridExpense(
    (s) => ({
      selectedRows: s.selectedRows,
      setSelectedRows: s.setSelectedRows,
    }),
    shallow
  );
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

  const filter = useExpenseFilter(
    (s) => ({
      categoryId: s.categoryId,
      walletId: s.walletId,
      dateField: s.dateField,
      subCategoryId: s.subCategoryId,
    }),
    shallow
  );

  const rows = () => {
    return expenseToDataGrid(expenses, checkExpenses, filter);
  };

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
    clear,
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
      clear: s.clearAllFields,
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
        await initExpenses({
          month: month,
          year: year,
          filter: {
            dateField: filter.dateField,
          },
        });
      } catch (error) {
        console.log(error);
      } finally {
        setSpin(false);
      }
    }
    start();
  }, [filter.dateField, initExpenses, month, setSpin, year]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <FcDataGrid
          rows={rows()}
          columns={columns}
          checkboxSelection={true}
          onSelectionModelChange={(gridSelectionModel: GridSelectionModel) => {
            const id = gridSelectionModel[0];
            const expense = expenses.find((element) => {
              return element.id === id;
            });
            if (expense) {
              setDescription(expense.descricao);
              setCategoryId(expense.categoria.id);
              setSubCategoryId(expense.subCategory.id);
              setWalletId(expense.carteira.id);
              setValue(Money.toFloat(expense.valor).toString());
              setInstallments(expense.instalment.toString());
              setDueDate(formatDateToForm(expense.vencimento));
              setPaymentDate(
                expense.pagamento
                  ? formatDateToForm(expense.pagamento)
                  : undefined
              );
              setPayed(expense.pago);
              setId(expense.id);
            } else {
              clear();
            }
            setSelectedRows(gridSelectionModel as number[]);
          }}
        />
      </Grid>
      {selectedRows && selectedRows.length > 0 ? (
        <Grid item xs={12}>
          <FcSelectedRowsExpense />
        </Grid>
      ) : null}
    </Grid>
  );
}
