import React, { useState } from "react";

import GridReceitas from "./DataGridReceitas";
import FormularioReceitas from "./FormReceitas";
import { Grid } from "@material-ui/core";
import { emptyFormularioReceita } from "../common/EmptyStates";

export default function CorpoReceitas() {
  const [formulario, setFormulario] = useState(emptyFormularioReceita());

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <GridReceitas
          setFormulario={(formulario) => setFormulario(formulario)}
        />
      </Grid>

      <Grid item xs={12}>
        <FormularioReceitas
          formulario={formulario}
          setFormulario={(formulario) => setFormulario(formulario)}
        />
      </Grid>
    </Grid>
  );
}
