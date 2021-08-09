import React from "react";
import { Grid } from "@material-ui/core";
import { DataGridProvider } from "../../Context/DataGridContext";
import FcDataGridTransfer from "../../components/fc-datagrid/transfer/fc-datagrid-transfer";
import FcFormTransfer from "../../components/fc-forms/transfer/fc-form-transfer";

export default function Transferencias() {
  return (
    <DataGridProvider>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <FcDataGridTransfer />
        </Grid>

        <Grid item xs={12}>
          <FcFormTransfer />
        </Grid>
      </Grid>
    </DataGridProvider>
  );
}
