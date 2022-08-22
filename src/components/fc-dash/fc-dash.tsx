import { Grid } from "@material-ui/core";
import {
  FcCardBalance,
  FcCardBalanceMonth,
  FcCardEarning,
  FcCardExpense,
} from "./";

export default function FcDashBoard() {
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
