import { useGetCurrentTime } from "@hooks/use-current-time";
import { useDashValues } from "@hooks/use-dash-values";
import { useSpin } from "@hooks/use-spin";
import { Grid } from "@material-ui/core";
import { useEffect } from "react";
import {
  FcCardBalance,
  FcCardBalanceMonth,
  FcCardEarning,
  FcCardExpense,
} from "./";

export default function FcDashBoard() {
  const setSpin = useSpin((state) => state.setSpin);
  const { year, month } = useGetCurrentTime();

  const { calculate } = useDashValues((state) => ({
    calculate: state.calculate,
  }));

  useEffect(() => {
    async function start() {
      try {
        setSpin(true);
        await calculate(year, month);
      } catch (error) {
        console.log(error);
      } finally {
        setSpin(false);
      }
    }
    start();
  }, [calculate, month, setSpin, year]);

  const cards = [
    <FcCardExpense />,
    <FcCardEarning />,
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
