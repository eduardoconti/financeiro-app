import React, { useState } from "react";
import GridTransferencias from "./DataGridTransferencias";
import FormularioTransferencias from "./FormTransferencias";
import { Grid } from "@material-ui/core";
import { emptyFormularioTransferencia } from "../common/EmptyStates";

export default function Transferencias() {
  const [formulario, setFormulario] = useState(emptyFormularioTransferencia());
  const [rows, setRows] = useState([]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <GridTransferencias
          setFormulario={(formulario) => setFormulario(formulario)}
          rows={rows}
          setRows={(rows) => setRows(rows)}
        />
      </Grid>

      <Grid item xs={12}>
        <FormularioTransferencias
          formulario={formulario}
          setFormulario={(formulario) => setFormulario(formulario)}
          setRows={(rows) => setRows(rows)}
        />
      </Grid>
    </Grid>
  );
}
