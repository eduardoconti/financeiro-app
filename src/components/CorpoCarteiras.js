import React, { useState } from "react";
import FormularioCarteiras from "./FormCarteiras";
import { Grid } from "@material-ui/core";
import GridCarteiras from "./DataGridCarteiras";
import { emptyFormularioCarteira } from "../common/EmptyStates";

export default function CorpoCarteiras() {
  const [rows, setRows] = useState([]);
  const [formulario, setFormulario] = useState(emptyFormularioCarteira);
  return (
    <Grid container spacing={1} direction="row">
      <Grid item xs={12} md={8}>
        <GridCarteiras
          rows={rows}
          setRows={(rows) => {
            setRows(rows);
          }}
          setFormulario={(formulario) => setFormulario(formulario)}
        ></GridCarteiras>
      </Grid>

      <Grid item xs={12} md={4}>
        <FormularioCarteiras
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
