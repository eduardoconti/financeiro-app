import React from "react";
import { Grid } from "@material-ui/core";
import { DataGridProvider } from "../../Context/DataGridContext";
import FcDataGridExpense from "../../components/fc-datagrid/expense/fc-datagrid-expense";
import FcFormExpense from "../../components/fc-forms/expense/fc-form-expense";
import FcSelectedRows from "../../components/fc-datagrid/fc-selected-rows";

export default function CorpoDespesas() {
  return (
    <DataGridProvider>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <FcDataGridExpense />
        </Grid>
        <Grid item xs={12}>
          <FcSelectedRows />
        </Grid>
        <Grid item xs={12}>
          <FcFormExpense />
        </Grid>
      </Grid>
    </DataGridProvider>
  );
}
