import React, { useState, useEffect, useContext } from "react";

import GridDespesas from "./DataGridDespesas";
import FormularioDespesas from "./FormDespesas";
import { Grid } from "@material-ui/core";
import { emptyFormularioDespesa } from "../common/EmptyStates";
import { ContextAnoMes } from "../Context/AnoMesContext";

export default function CorpoDespesas() {
  const ctxAnoMes = useContext(ContextAnoMes);
  const stateMesAtual = ctxAnoMes.stateMesAtual;
  const stateAnoAtual = ctxAnoMes.stateAnoAtual;
  const [formulario, setFormulario] = useState(
    emptyFormularioDespesa(stateAnoAtual, stateMesAtual)
  );

  useEffect(() => {
    setFormulario(emptyFormularioDespesa(stateAnoAtual, stateMesAtual));
  }, [stateMesAtual, stateAnoAtual]);
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <GridDespesas
          setFormulario={(formulario) => setFormulario(formulario)}
          stateMesAtual={stateMesAtual}
          stateAnoAtual={stateAnoAtual}
        />
      </Grid>

      <Grid item xs={12}>
        <FormularioDespesas
          formulario={formulario}
          setFormulario={(formulario) => setFormulario(formulario)}
          stateMesAtual={stateMesAtual}
          stateAnoAtual={stateAnoAtual}
        />
      </Grid>
    </Grid>
  );
}
