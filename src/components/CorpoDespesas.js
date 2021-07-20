import React from "react";

import FormularioDespesas from "./FormDespesas";
import { Grid } from "@material-ui/core";
import { WalletProvider } from "../Context/WalletContext";
import { CategoryProvider } from "../Context/CategoryContext";
import { DataGridProvider } from "../Context/DataGridContext";
import FcDataGridExpense from "./fc-datagrid/expense/fc-datagrid-expense";

export default function CorpoDespesas() {
  return (
    <DataGridProvider>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <FcDataGridExpense />
        </Grid>

        <Grid item xs={12}>
          <WalletProvider>
            <CategoryProvider>
              <FormularioDespesas />
            </CategoryProvider>
          </WalletProvider>
        </Grid>
      </Grid>
    </DataGridProvider>
  );
}
