import React, { useContext, useEffect } from "react";

import { emptyFormularioTransferencia } from "../../../common/EmptyStates";
import { ContextAnoMes } from "../../../Context/AnoMesContext";
import { ContextForm } from "../../../Context/FormContext";

import FcSelectFieldWallet from "../fc-fields/fc-select-field-wallet";

import FcTextFieldDueDate from "../fc-fields/fc-text-field-due-date";
import FcTextFieldValue from "../fc-fields/fc-text-field-value";
import FcSelectFieldPayed from "../fc-fields/fc-select-field-payed";
import FcFormButtonInsertTransfer from "./fc-form-button-insert-transfer";
import FcFormButtonClear from "../fc-form-button/fc-form-button-clear";
import { Grid } from "@material-ui/core";
import FcFormButtonUpdateTransfer from "./fc-form-button-update-transfer";
import FcSurface from "../../fc-surface/fc-surface";

export default function FcFormTransfer() {
  const ctxAnoMes = useContext(ContextAnoMes);
  const ctxForm = useContext(ContextForm);

  const stateMesAtual = ctxAnoMes.stateMesAtual;
  const stateAnoAtual = ctxAnoMes.stateAnoAtual;

  useEffect(() => {
    ctxForm.setForm(emptyFormularioTransferencia(stateAnoAtual, stateMesAtual));
    // eslint-disable-next-line
  }, [stateAnoAtual, stateMesAtual]);

  return (
    <FcSurface>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={4} lg={3}>
          <FcSelectFieldWallet id="carteiraOrigem" label="Origem" />
        </Grid>
        <Grid item xs={6} sm={4} lg={3}>
          <FcSelectFieldWallet id="carteiraDestino" label="Destino" />
        </Grid>
        <Grid item xs={6} sm={4} lg={2}>
          <FcTextFieldValue />
        </Grid>
        <Grid item xs={6} sm={4} lg={2}>
          <FcTextFieldDueDate id="transferencia" label="Transferencia" />
        </Grid>
        <Grid item xs={12} sm={4} lg={2}>
          <FcSelectFieldPayed />
        </Grid>
        <Grid item xs={12} sm={4} lg={3}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              {ctxForm.form.id === 0 ? (
                <FcFormButtonInsertTransfer />
              ) : (
                <FcFormButtonUpdateTransfer />
              )}
            </Grid>
            <Grid item xs={6}>
              <FcFormButtonClear />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </FcSurface>
  );
}
