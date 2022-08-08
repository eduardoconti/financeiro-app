import { useContext, useEffect } from "react";
import { emptyFormularioDespesa } from "../../../common/EmptyStates";
import { ContextForm } from "../../../Context/FormContext";
import FcSelectFieldCategory from "../fc-fields/fc-select-field-category";
import FcSelectFieldWallet from "../fc-fields/fc-select-field-wallet";
import FcTextFieldDescription from "../fc-fields/fc-text-field-description";
import FcTextFieldDueDate from "../fc-fields/fc-text-field-due-date";
import FcTextFieldValue from "../fc-fields/fc-text-field-value";
import FcSelectFieldPayed from "../fc-fields/fc-select-field-payed";
import FcFormButtonInsertExpense from "./fc-form-button-insert-expense";
import FcFormButtonClear from "../fc-form-button/fc-form-button-clear";
import { Grid } from "@material-ui/core";
import FcFormButtonUpdateExpense from "./fc-form-button-update-expense";
import FcFormButtonDeleteExpense from "./fc-form-button-delete-expense";
import FcFormButtonInsertExpenseNextMonth from "./fc-form-button-insert-expense-next-month";
import FcSurface from "components/fc-surface/fc-surface";
import FcTextFieldInstalment from "../fc-fields/fc-text-field-instalment";
import FcTextFieldPaymentDate from "../fc-fields/fc-text-field-payment-date";
import FcSelectFieldSubCategory from "../fc-fields/fc-select-field-sub-category";

export default function FcFormExpense() {
  const { form, setForm } = useContext(ContextForm);

  useEffect(() => {
    setForm(emptyFormularioDespesa());
  }, [setForm]);

  return (
    <FcSurface>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={3}>
          <FcTextFieldDescription value={form.descricao}/>
        </Grid>
        <Grid item xs={4} sm={3}>
          <FcSelectFieldCategory />
        </Grid>
        <Grid item xs={4} sm={3}>
          <FcSelectFieldSubCategory />
        </Grid>
        <Grid item xs={4} sm={3}>
          <FcSelectFieldWallet />
        </Grid>
        <Grid item xs={4} sm={3} lg={2}>
          <FcTextFieldValue />
        </Grid>
        <Grid item xs={4} sm={3} lg={2}>
          <FcTextFieldInstalment />
        </Grid>
        <Grid item xs={4} sm={3} lg={2}>
          <FcTextFieldDueDate />
        </Grid>
        <Grid item xs={6} sm={3} lg={2}>
          <FcTextFieldPaymentDate />
        </Grid>
        <Grid item xs={6} sm={3} lg={4}>
          <FcSelectFieldPayed />
        </Grid>
        <Grid item xs={12} lg={4} align="center">
          <Grid container spacing={2}>
            <Grid item xs={3} lg>
              {form.id === 0 ? (
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
              <FcFormButtonClear />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </FcSurface>
  );
}
