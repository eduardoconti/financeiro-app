import React from "react";

import FormularioReceitas from "./FormReceitas";
import { Grid } from "@material-ui/core";
import { WalletProvider } from "../Context/WalletContext";
import { CategoryProvider } from "../Context/CategoryContext";
import { DataGridProvider } from "../Context/DataGridContext";
import FcDataGridYeld from "./fc-datagrid/yeld/fc-datagrid-yeld";
export default function CorpoReceitas() {
  return (
    <DataGridProvider>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <FcDataGridYeld />
        </Grid>

        <Grid item xs={12}>
          <WalletProvider>
            <CategoryProvider>
              <FormularioReceitas />
            </CategoryProvider>
          </WalletProvider>
        </Grid>
      </Grid>
    </DataGridProvider>
  );
}
