import React, { useState } from "react";
import FormularioCategorias from "./FormCategorias";
import { Grid } from "@material-ui/core";
import GridCategorias from "./DataGridCategorias";
import { emptyFormularioCategoria } from "../common/EmptyStates";

export default function CorpoCategorias() {
  const [rows, setRows] = useState([]);
  const [formulario, setFormulario] = useState(emptyFormularioCategoria);
  return (
    <Grid container spacing={1} direction="row">
      <Grid item xs={12} md={8}>
        <GridCategorias
          rows={rows}
          setRows={(rows) => {
            setRows(rows);
          }}
          setFormulario={(formulario) => setFormulario(formulario)}
        ></GridCategorias>
      </Grid>

      <Grid item xs={12} md={4}>
        <FormularioCategorias
          setRows={(rows) => {
            setRows(rows);
          }}
          formulario={formulario}
          setFormulario={(formulario) => setFormulario(formulario)}
        />
      </Grid>
    </Grid>
  );
}
