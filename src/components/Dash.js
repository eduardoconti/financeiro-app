import React, { useContext, useEffect } from "react";
import * as Constantes from "../common/Constantes";
import { Grid } from "@material-ui/core";
import { ContextTotais } from "../Context/TotaisContext";
import { ContextChecked } from "../Context/CheckedContext";
import { calculaTotais } from "../common/Funcoes";
import { ContextAnoMes } from "../Context/AnoMesContext";
import { SpinContext } from "../Context/SpinContext";
import { isAuthenticated } from "../common/Auth";
import FcCardExpense from "./fc-cards/fc-card-expense";
import FcCardYeld from "./fc-cards/fc-card-yields";
import FcCardBalance from "./fc-cards/fc-card-balance";
import FcCardBalanceMonth from "./fc-cards/fc-card-balance-month";

export default function Dash({ setStateCurrentBody }) {
  const ctxTotais = useContext(ContextTotais);
  const ctxChecked = useContext(ContextChecked);
  const ctxAnoMes = useContext(ContextAnoMes);
  const ctxSpin = useContext(SpinContext) ;
  const stateMesAtual = ctxAnoMes.stateMesAtual;
  const stateAnoAtual = ctxAnoMes.stateAnoAtual;
  const setStateTotais = ctxTotais.setStateTotais;
  const stateCheckedDespesas = ctxChecked.stateCheckedDespesas;
  const stateCheckedReceitas = ctxChecked.stateCheckedReceitas;
  const stateTotais = ctxSpin.stateTotais;
  useEffect(() => {
    ctxSpin.setSpin(true);
    async function setTotais() {
      if (isAuthenticated()) {
        setStateTotais(
          await calculaTotais(
            stateCheckedDespesas,
            stateCheckedReceitas,
            stateAnoAtual,
            stateMesAtual
          )
        );
      }
    }
    setTotais();
    ctxSpin.setSpin(false);// eslint-disable-next-line
  }, [
    stateCheckedDespesas,
    stateCheckedReceitas,
    stateAnoAtual,
    stateMesAtual,
    stateTotais,
  ]);
  return (
    <Grid container item spacing={1}>
      {/* CARDS */}
      <Grid item xs={6} sm={6} md={6} lg={3} xl={3}>
        <FcCardExpense
          setStateCurrentBody={(currentBody) =>
            setStateCurrentBody(currentBody)
          }
        />
      </Grid>
      <Grid item xs={6} sm={6} md={6} lg={3} xl={3}>
        <FcCardYeld
          setStateCurrentBody={(currentBody) =>
            setStateCurrentBody(currentBody)
          }
        />
      </Grid>
      <Grid item xs={6} sm={6} md={6} lg={3} xl={3}>
        <FcCardBalance
          setStateCurrentBody={() =>
            setStateCurrentBody(Constantes.CORPO_SALDO)
          }
        />
      </Grid>

      <Grid item xs={6} sm={6} md={6} lg={3} xl={3}>
        <FcCardBalanceMonth
          setStateCurrentBody={() =>
            setStateCurrentBody(Constantes.CORPO_BALANCO)
          }
        />
      </Grid>
    </Grid>
  );
}
