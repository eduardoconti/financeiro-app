import React, { useContext, useState } from "react";

import GridReceitas from "./DataGridReceitas";
import FormularioReceitas from "./FormReceitas";
import { Grid } from "@material-ui/core";
import { emptyFormularioReceita } from "../common/EmptyStates";
import { ContextAnoMes } from "../Context/AnoMesContext";
import { WalletProvider } from "../Context/WalletContext";
import { CategoryProvider } from "../Context/CategoryContext";

export default function CorpoReceitas() {
  const ctxAnoMes = useContext(ContextAnoMes);
  const stateMesAtual = ctxAnoMes.stateMesAtual;
  const stateAnoAtual = ctxAnoMes.stateAnoAtual;
  const [formulario, setFormulario] = useState(
    emptyFormularioReceita(stateAnoAtual, stateMesAtual)
  );

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <GridReceitas
          setFormulario={(formulario) => setFormulario(formulario)}
        />
      </Grid>

      <Grid item xs={12}>
        <WalletProvider>
          <CategoryProvider>
            <FormularioReceitas
              formulario={formulario}
              setFormulario={(formulario) => setFormulario(formulario)}
            />
          </CategoryProvider>
        </WalletProvider>
      </Grid>
    </Grid>
  );
}
