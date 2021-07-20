import React from "react";
import FormularioCategorias from "./FormCategorias";
import { Grid } from "@material-ui/core";
import { DataGridProvider } from "../Context/DataGridContext";
import FcDataGridCategory from "./fc-datagrid/category/fc-datagrid-category";

export default function CorpoCategorias() {

  return (
    <DataGridProvider>
      <Grid container spacing={1} direction="row">
        <Grid item xs={12} md={8}>
          <FcDataGridCategory/>
        </Grid>

        <Grid item xs={12} md={4}>
          <FormularioCategorias />
        </Grid>
      </Grid>
    </DataGridProvider>
  );
}
