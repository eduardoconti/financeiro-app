import React from "react";
import { Grid } from "@material-ui/core";
import { DataGridProvider } from "../../Context/DataGridContext";
import FcDataGridCategory from "../../components/fc-datagrid/category/fc-datagrid-category";
import FcFormCategory from "../../components/fc-forms/category/fc-form-category";

export default function CorpoCategorias() {
  return (
    <DataGridProvider>
      <Grid container spacing={1}>
        <Grid item xs={12} md={8}>
          <FcDataGridCategory />
        </Grid>

        <Grid item xs={12} md={4}>
          <FcFormCategory />
        </Grid>
      </Grid>
    </DataGridProvider>
  );
}
