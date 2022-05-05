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
  const { setStateTotais } = useContext(ContextTotais);
  const { stateCheckedDespesas, stateCheckedReceitas } = useContext(
    ContextChecked
  );
  const { stateAnoAtual, stateMesAtual } = useContext(ContextAnoMes);
  const { setSpin } = useContext(SpinContext);

  useEffect(() => {
    async function setTotais() {
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
    setTotais();
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
          <Grid item xs={6} sm={6} md={6} lg={3} xl={3} key={i}>
            {component}
          </Grid>
        );
      })}
    </Grid>
  );
}
