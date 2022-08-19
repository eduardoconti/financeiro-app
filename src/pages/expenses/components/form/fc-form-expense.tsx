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
import { useMemo } from "react";
import { FcSelectFieldExpenseWallet } from "./fc-select-field-expense-wallet";

export function FcFormExpense() {
  const { formExpense: { id } } = useFormExpense();

  const buttons = useMemo(() => {
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
          {/* <FcFormButtonDeleteExpense /> */}
        </Grid>
        <Grid item xs={3}>
          {/* <FcFormButtonInsertExpenseNextMonth /> */}
        </Grid>
        <Grid item xs={3}>
          <FcFormButtonClearExpense />
        </Grid>
      </Grid>
    )
  }, [id]);

  return (
    <FcSurface>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={3}>
          <FcTextFieldExpenseDescription />
        </Grid>
        <Grid item xs={4} sm={3}>
          <FcSelectFieldExpenseCategory />
        </Grid>
        <Grid item xs={4} sm={3}>
          <FcSelectFieldExpenseSubCategory />
        </Grid>
        <Grid item xs={4} sm={3}>
          <FcSelectFieldExpenseWallet />
        </Grid>
        <Grid item xs={4} sm={3} lg={2}>
          <FcTextFieldExpenseValue />
        </Grid>
        <Grid item xs={4} sm={3} lg={2}>
          <FcTextFieldInstalment />
        </Grid>
        <Grid item xs={4} sm={3} lg={2}>
          <FcTextFieldExpenseDueDate />
        </Grid>
        <Grid item xs={6} sm={3} lg={2}>
          <FcTextFieldExpensePaymentDate />
        </Grid>
        <Grid item xs={6} sm={3} lg={4}>
          <FcSelectFieldExpesePayed />
        </Grid>
        <Grid item xs={12} lg={4}>
          {buttons}
        </Grid>
      </Grid>
    </FcSurface>
  );
}
