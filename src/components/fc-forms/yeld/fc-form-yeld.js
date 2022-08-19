import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { emptyFormularioReceita } from "../../../common/EmptyStates";
import { ContextAnoMes } from "../../../Context/AnoMesContext";
import { ContextForm } from "../../../Context/FormContext";

import FcTextFieldValue from "../fc-fields/fc-text-field-value";
import FcFormButtonInsertYeld from "./fc-form-button-insert-yeld";
import FcFormButtonClear from "../fc-form-button/fc-form-button-clear";
import { Grid, Box } from "@material-ui/core";
import FcFormButtonUpdateYeld from "./fc-form-button-update-yeld";
import FcFormButtonDeleteYield from "./fc-form-button-delete-yield";
import FcFormButtonInsertYieldNextMonth from "./fc-form-button-insert-yield-next-month";
import { FcSelectFieldPayed, FcSelectFieldWallet, FcTextFieldDescription } from "../fc-fields";
import { FcTextFieldPaymentDate } from "../fc-fields/fc-text-field-payment-date";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
  },
}));

export default function FcFormYeld() {
  const ctxAnoMes = useContext(ContextAnoMes);
  const { form, setForm } = useContext(ContextForm);

  const classes = useStyles();
  const stateMesAtual = ctxAnoMes.stateMesAtual;
  const stateAnoAtual = ctxAnoMes.stateAnoAtual;

  useEffect(() => {
    setForm(emptyFormularioReceita(stateAnoAtual, stateMesAtual));
  }, [setForm, stateAnoAtual, stateMesAtual]);

  return (
    <Box className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} lg={4}>
          <FcTextFieldDescription value={form.descricao} />
        </Grid>

        <Grid item xs={6} sm={4} lg={4}>
          <FcSelectFieldWallet />
        </Grid>
        <Grid item xs={6} sm={4} lg={4}>
          <FcTextFieldValue />
        </Grid>
        <Grid item xs={6} sm={3} lg={4}>
          <FcTextFieldPaymentDate />
        </Grid>
        <Grid item xs={6} sm={3} lg={4}>
          <FcSelectFieldPayed />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              {form.id === 0 ? (
                <FcFormButtonInsertYeld />
              ) : (
                <FcFormButtonUpdateYeld />
              )}
            </Grid>
            <Grid item xs={3}>
              <FcFormButtonDeleteYield />
            </Grid>
            <Grid item xs={3}>
              <FcFormButtonInsertYieldNextMonth />
            </Grid>
            <Grid item xs={3}>
              <FcFormButtonClear />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
