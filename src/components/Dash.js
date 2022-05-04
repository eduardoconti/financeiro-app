import React, { useContext, useEffect } from "react";
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

export default function Dash() {
  const ctxTotais = useContext(ContextTotais);
  const ctxChecked = useContext(ContextChecked);
  const ctxAnoMes = useContext(ContextAnoMes);
  const { setSpin } = useContext(SpinContext);
  const stateMesAtual = ctxAnoMes.stateMesAtual;
  const stateAnoAtual = ctxAnoMes.stateAnoAtual;
  const setStateTotais = ctxTotais.setStateTotais;
  const stateCheckedDespesas = ctxChecked.stateCheckedDespesas;
  const stateCheckedReceitas = ctxChecked.stateCheckedReceitas;

  useEffect(() => {
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
    setSpin(true);
    setTotais();
    setSpin(false);
  }, [
    stateCheckedDespesas,
    stateCheckedReceitas,
    stateAnoAtual,
    stateMesAtual,
    setSpin,
    setStateTotais
  ]);

  const cards = [
    <FcCardExpense />,
    <FcCardYeld />,
    <FcCardBalance />,
    <FcCardBalanceMonth />,
  ];
  return (
    <Grid container spacing={1}>
      {cards.map((component, i) => {
        return (
          <Grid item xs={6} sm={6} md={6} lg={3} xl={3} key={i}>
            {component}
          </Grid>
        );
      })}
    </Grid>
  );
}
