import { Grid } from "@material-ui/core";

import FcSurface from "components/fc-surface/fc-surface";

import { useFormExpense } from "@pages/expenses/hook/use-form-expense";

import FcFormButtonClearExpense from "./button/fc-form-button-clear";

import {
  FcTextFieldExpenseValue,
  FcSelectFieldExpenseSubCategory,
  FcSelectFieldExpenseCategory,
  FcTextFieldExpenseDueDate,
  FcTextFieldInstalment,
  FcTextFieldExpensePaymentDate,
  FcTextFieldExpenseDescription,
  FcSelectFieldExpesePayed,
} from "./";
import { FcFormButtonInsertExpense } from "./button/fc-form-button-insert-expense";
import FcFormButtonUpdateExpense from "./button/fc-form-button-update-expense";
import { FcSelectFieldExpenseWallet } from "./fc-select-field-expense-wallet";
import {
  FcFormButtonDeleteExpense,
  FcFormButtonInsertExpenseNextMonth,
} from "./button";
import shallow from "zustand/shallow";
import { useEffect } from "react";
import { useCurrentTime } from "@hooks/use-current-time";
import { formatDateToForm, getDueDate } from "@common/DateHelper";

export function FcFormExpense() {
  const { id, setDueDate } = useFormExpense(
    (s) => ({ id: s.id, setDueDate: s.setDueDate }),
    shallow
  );
  const { year, month } = useCurrentTime();
  useEffect(() => {
    setDueDate(formatDateToForm(getDueDate(year, month)));
  }, [year, month, setDueDate]);
  function Buttons() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={3} lg>
          {id === 0 ? (
            <FcFormButtonInsertExpense />
          ) : (
            <FcFormButtonUpdateExpense />
          )}
        </Grid>
        <Grid item xs={3}>
          <FcFormButtonDeleteExpense />
        </Grid>
        <Grid item xs={3}>
          <FcFormButtonInsertExpenseNextMonth />
        </Grid>
        <Grid item xs={3}>
          <FcFormButtonClearExpense />
        </Grid>
      </Grid>
    );
  }

  return (
    <FcSurface>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={4} lg={3}>
          <FcTextFieldExpenseDescription />
        </Grid>
        <Grid item xs={6} sm={4} lg={3}>
          <FcSelectFieldExpenseCategory />
        </Grid>
        <Grid item xs={6} sm={4} lg={3}>
          <FcSelectFieldExpenseSubCategory />
        </Grid>
        <Grid item xs={6} sm={4} lg={3}>
          <FcSelectFieldExpenseWallet />
        </Grid>
        <Grid item xs={6} sm={4} lg={2}>
          <FcTextFieldExpenseValue />
        </Grid>
        <Grid item xs={6} sm={4} lg={2}>
          <FcTextFieldInstalment />
        </Grid>
        <Grid item xs={6} sm={4} lg={2}>
          <FcTextFieldExpenseDueDate />
        </Grid>
        <Grid item xs={6} sm={4} lg={2}>
          <FcTextFieldExpensePaymentDate />
        </Grid>
        <Grid item xs={6} sm={4} lg={4}>
          <FcSelectFieldExpesePayed />
        </Grid>
        <Grid item xs={12} sm={4} lg={3}>
          <Buttons />
        </Grid>
      </Grid>
    </FcSurface>
  );
}
