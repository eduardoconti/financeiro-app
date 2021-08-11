import React from "react";
import { Grid } from "@material-ui/core";
import { DataGridProvider } from "../../Context/DataGridContext";
import FcDataGridYeld from "../../components/fc-datagrid/yeld/fc-datagrid-yeld";
import FcFormYeld from "../../components/fc-forms/yeld/fc-form-yeld";
import FcSelectedRows from "../../components/fc-datagrid/fc-selected-rows";
export default function CorpoReceitas() {
  return (
    <DataGridProvider>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <FcDataGridYeld />
        </Grid>
        <Grid item xs={12}>
          <FcSelectedRows/>
        </Grid>
        <Grid item xs={12}>
          <FcFormYeld />
        </Grid>
      </Grid>
    </DataGridProvider>
  );
}
