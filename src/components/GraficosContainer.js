import React from "react";
import { Grid } from "@material-ui/core";
import GraficoDespesas from "./GraficoDespesas";
import GraficoReceitas from "./GraficoReceitas";
import GraficoMensal from "./GraficoMensal";
export default function GraficosContainer() {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={4} md={4} lg={12}>
        <GraficoMensal />
      </Grid>
      <Grid item xs={12} sm={4} md={4} lg={12}>
        <GraficoDespesas />
      </Grid>
      <Grid item xs={12} sm={4} md={4} lg={12}>
        <GraficoReceitas />
      </Grid>
    </Grid>
  );
}
