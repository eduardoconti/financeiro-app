import React from "react";
import { Grid } from "@material-ui/core";
import FcFormWallet from "../../components/fc-forms/wallet/fc-form-wallet";
import FcDataGridWallet from "../../components/fc-datagrid/wallet/fc-datagrid-wallet";
import { DataGridProvider } from "../../Context/DataGridContext";

export default function CorpoCarteiras() {
  return (
    <DataGridProvider>
      <Grid container spacing={1}>
        <Grid item xs={12} md={8}>
          <FcDataGridWallet />
        </Grid>

        <Grid item xs={12} md={4}>
          <FcFormWallet />
        </Grid>
      </Grid>
    </DataGridProvider>
  );
}
