import React, { useContext, useEffect } from "react";
import CardDespesas from "./CardDespesas";
import CardReceitas from "./CardReceitas";
import * as Constantes from "../common/Constantes";
import CardSaldo from "./CardSaldo";
import CardBalanco from "./CardBalanco";
import { Grid } from "@material-ui/core";
import { ContextTotais } from "../Context/TotaisContext";
import { ContextChecked } from "../Context/CheckedContext";
import { calculaTotais } from "../common/Funcoes";
import { ContextAnoMes } from "../Context/AnoMesContext";

export default function Dash({ setStateCurrentBody }) {
  const ctxTotais = useContext(ContextTotais);
  const ctxChecked = useContext(ContextChecked);
  const ctxAnoMes = useContext(ContextAnoMes);
  const stateMesAtual = ctxAnoMes.stateMesAtual;
  const stateAnoAtual = ctxAnoMes.stateAnoAtual;

  const setStateTotais = ctxTotais.setStateTotais;
  const stateCheckedDespesas = ctxChecked.stateCheckedDespesas;
  const stateCheckedReceitas = ctxChecked.stateCheckedReceitas;

  useEffect(() => {
    async function setTotais() {
      setStateTotais(
        await calculaTotais(
          stateCheckedDespesas,
          stateCheckedReceitas,
          stateAnoAtual,
          stateMesAtual
        )
      );
    }
    setTotais();
  }, [
    stateCheckedDespesas,
    stateCheckedReceitas,
    stateAnoAtual,
    stateMesAtual,
    setStateTotais,
  ]);
  return (
    <Grid container item spacing={1}>
      {/* CARDS */}
      <Grid item xs={6} sm={6} md={6} lg={3} xl={3}>
        <CardDespesas
          setStateCurrentBody={(currentBody) =>
            setStateCurrentBody(currentBody)
          }
        />
      </Grid>
      <Grid item xs={6} sm={6} md={6} lg={3} xl={3}>
        <CardReceitas
          setStateCurrentBody={(currentBody) =>
            setStateCurrentBody(currentBody)
          }
        />
      </Grid>
      <Grid item xs={6} sm={6} md={6} lg={3} xl={3}>
        <CardSaldo
          descricao="Saldo"
          cor="#3EA99F"
          setStateCurrentBody={() =>
            setStateCurrentBody(Constantes.CORPO_SALDO)
          }
        />
      </Grid>
      <Grid item xs={6} sm={6} md={6} lg={3} xl={3}>
        <CardBalanco
          descricao="Balanço"
          cor="DarkSlateGrey"
          setStateCurrentBody={() =>
            setStateCurrentBody(Constantes.CORPO_BALANCO)
          }
        />
      </Grid>
    </Grid>
  );
}
