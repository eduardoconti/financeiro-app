import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import { Typography } from "@material-ui/core";
import { monthNames } from "../common/fc-constants";
import { useCurrentTime } from "@hooks/use-current-time";
import shallow from "zustand/shallow";
export default function BotaoMes() {
  const useStyles = makeStyles((theme) => ({
    botao: {
      background: theme.palette.background.paper,
      minHeight: 36,
      borderRadius: 5,
      textAlign: "center",
    },
    ativo: {
      backgroundColor:
        theme.palette.type === "dark"
          ? theme.palette.primary.dark
          : theme.palette.primary.light,
      minHeight: 36,
      borderRadius: 5,
      textAlign: "center",
      color: theme.palette.text.primary,
    },
  }));

  function MonthButtons(): JSX.Element[] {
    const classes = useStyles();
    const { month, setMonth } = useCurrentTime(
      (state) => ({ month: state.month, setMonth: state.setMonth }),
      shallow
    );

    return monthNames.map((monthNmae, i) => {
      return (
        <Grid item xs={2} sm={1} key={i}>
          <CardActionArea
            className={month === i ? classes.ativo : classes.botao}
            onClick={() => {
              setMonth(i);
            }}
          >
            <Typography variant="button">{monthNmae}</Typography>
          </CardActionArea>
        </Grid>
      );
    });
  }

  return (
    <Grid container spacing={1}>
      {MonthButtons()}
    </Grid>
  );
}
