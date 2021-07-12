import React, { useContext, useState } from "react";
import GridTransferencias from "./DataGridTransferencias";
import FormularioTransferencias from "./FormTransferencias";
import { Grid } from "@material-ui/core";
import { emptyFormularioTransferencia } from "../common/EmptyStates";
import { ContextAnoMes } from "../Context/AnoMesContext";

export default function Transferencias() {
  const ctxAnoMes = useContext(ContextAnoMes);
  const stateMesAtual = ctxAnoMes.stateMesAtual;
  const stateAnoAtual = ctxAnoMes.stateAnoAtual;
  const [formulario, setFormulario] = useState(emptyFormularioTransferencia(stateAnoAtual, stateMesAtual));

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <GridTransferencias
          setFormulario={(formulario) => setFormulario(formulario)}
        />
      </Grid>

      <Grid item xs={12}>
        <FormularioTransferencias
          formulario={formulario}
          setFormulario={(formulario) => setFormulario(formulario)}
        />
      </Grid>
    </Grid>
  );
}
