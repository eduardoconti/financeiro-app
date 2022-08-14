import { useContext, useEffect } from "react";
import { Grid } from "@material-ui/core";

import FcCardExpense from "./fc-cards/fc-card-expense";
import FcCardYeld from "./fc-cards/fc-card-yields";
import FcCardBalance from "./fc-cards/fc-card-balance";
import FcCardBalanceMonth from "./fc-cards/fc-card-balance-month";
import {
  ContextAnoMes,
  ContextChecked,
  ContextTotais,
  SpinContext,
} from "Context";
import { calculaTotais, isAuthenticated } from "common";

export default function Dash() {
  const { stateCheckedDespesas, stateCheckedReceitas } = useContext(
    ContextChecked
  );
  const { setSpin } = useContext(SpinContext);
  const { setStateTotais } = useContext(ContextTotais);

  const { stateAnoAtual, stateMesAtual } = useContext(ContextAnoMes);

  useEffect(() => {
    async function SetTotais() {
      setSpin(true);
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
      setSpin(false);
    }
    SetTotais();
  }, [
    stateCheckedDespesas,
    stateCheckedReceitas,
    stateAnoAtual,
    stateMesAtual,
    setSpin,
    setStateTotais,
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
          <Grid item xs={6} md={3} key={i}>
            {component}
          </Grid>
        );
      })}
    </Grid>
  );
}
