import { useContext, useEffect } from "react";

import { emptyFormularioTransferencia } from "../../../common/EmptyStates";
import { ContextAnoMes } from "../../../Context/AnoMesContext";
import { ContextForm } from "../../../Context/FormContext";



import FcTextFieldValue from "../fc-fields/fc-text-field-value";
import FcFormButtonInsertTransfer from "./fc-form-button-insert-transfer";
import FcFormButtonClear from "../fc-form-button/fc-form-button-clear";
import { Grid } from "@material-ui/core";
import FcFormButtonUpdateTransfer from "./fc-form-button-update-transfer";
import FcSurface from "../../fc-surface/fc-surface";
import FcTextFieldTransferenceDate from "../fc-fields/fc-text-field-transference-date";
import { FcSelectFieldPayed, FcSelectFieldWallet } from "../fc-fields";

export default function FcFormTransfer() {
  const ctxAnoMes = useContext(ContextAnoMes);
  const { form, setForm } = useContext(ContextForm);

  const stateMesAtual = ctxAnoMes.stateMesAtual;
  const stateAnoAtual = ctxAnoMes.stateAnoAtual;

  useEffect(() => {
    setForm(emptyFormularioTransferencia(stateAnoAtual, stateMesAtual));
  }, [setForm, stateAnoAtual, stateMesAtual]);

  return (
    <FcSurface>
      <Grid container spacing={1}>
        <Grid item xs={6} sm={4} lg={3}>
          <FcSelectFieldWallet id="carteiraOrigemId" label="Origem" />
        </Grid>
        <Grid item xs={6} sm={4} lg={3}>
          <FcSelectFieldWallet id="carteiraDestinoId" label="Destino" />
        </Grid>
        <Grid item xs={6} sm={4} lg={2}>
          <FcTextFieldValue />
        </Grid>
        <Grid item xs={6} sm={4} lg={2}>
          <FcTextFieldTransferenceDate />
        </Grid>
        <Grid item xs={12} sm={4} lg={2}>
          <FcSelectFieldPayed />
        </Grid>
        <Grid item xs={12} sm={4} lg={3}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              {form.id === 0 ? (
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
