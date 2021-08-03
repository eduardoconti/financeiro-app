import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { emptyFormularioDespesa } from "../../../common/EmptyStates";
import { ContextAnoMes } from "../../../Context/AnoMesContext";
import { ContextForm } from "../../../Context/FormContext";
import FcSelectFieldCategory from "../fc-fields/fc-select-field-category";
import FcSelectFieldWallet from "../fc-fields/fc-select-field-wallet";
import FcTextFieldDescription from "../fc-fields/fc-text-field-description";
import FcTextFieldDueDate from "../fc-fields/fc-text-field-due-date";
import FcTextFieldValue from "../fc-fields/fc-text-field-value";
import FcSelectFieldPayed from "../fc-fields/fc-select-field-payed";
import FcFormButtonInsertExpense from "./fc-form-button-insert-expense";
import FcFormButtonClear from "../fc-form-button/fc-form-button-clear";
import { Grid, Box } from "@material-ui/core";
import FcFormButtonUpdateExpense from "./fc-form-button-update-expense";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.paper01,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
  },
}));

export default function FcFormExpense() {
  const ctxAnoMes = useContext(ContextAnoMes);
  const ctxForm = useContext(ContextForm);

  const classes = useStyles();
  const stateMesAtual = ctxAnoMes.stateMesAtual;
  const stateAnoAtual = ctxAnoMes.stateAnoAtual;

  useEffect(() => {
    ctxForm.setForm(emptyFormularioDespesa(stateAnoAtual, stateMesAtual));
    // eslint-disable-next-line
  }, [stateAnoAtual, stateMesAtual]);

  return (
    <Box className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3} lg={3}>
          <FcTextFieldDescription />
        </Grid>
        <Grid item xs={6} sm={3} lg={2}>
          <FcSelectFieldCategory />
        </Grid>
        <Grid item xs={6} sm={3} lg={2}>
          <FcSelectFieldWallet />
        </Grid>
        <Grid item xs={12} sm={3} lg={2}>
          <FcTextFieldValue />
        </Grid>
        <Grid item xs={6} sm={3} lg={3}>
          <FcTextFieldDueDate />
        </Grid>
        <Grid item xs={6} sm={3} lg={2}>
          <FcSelectFieldPayed />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              {ctxForm.form.id === 0 ? (
                <FcFormButtonInsertExpense />
              ) : (
                <FcFormButtonUpdateExpense />
              )}
            </Grid>
            <Grid item xs={6}>
              <FcFormButtonClear />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
