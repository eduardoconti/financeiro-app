import React from "react";

import GridDespesas from "./DataGridDespesas";
import FormularioDespesas from "./FormDespesas";
import { Grid } from "@material-ui/core";
import { WalletProvider } from "../Context/WalletContext";
import { CategoryProvider } from "../Context/CategoryContext";

export default function CorpoDespesas() {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <GridDespesas />
      </Grid>

      <Grid item xs={12}>
        <WalletProvider>
          <CategoryProvider>
            <FormularioDespesas />
          </CategoryProvider>
        </WalletProvider>
      </Grid>
    </Grid>
  );
}
