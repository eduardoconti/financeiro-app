import React, { useContext } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import { ContextAnoMes } from "../Context/AnoMesContext";
import { Typography} from "@material-ui/core";
export default function BotaoMes() {
  const ctxAnoMes = useContext(ContextAnoMes);
  const stateMesAtual = ctxAnoMes.stateMesAtual;
  const setStateMesAtual = ctxAnoMes.setStateMesAtual;

  const useStyles = makeStyles((theme) => ({
    botao: {
      background: theme.palette.primary.main,
      minHeight: 36,
      borderRadius: 5,
      textAlign: "center",
    },
    ativo: {
      backgroundColor: theme.palette.secondary.main,
      minHeight: 36,
      borderRadius: 5,
      textAlign: "center",
      color: "#fff",
    },
  }));

  const MonthButtons = () => {
    const months = [
      "jan",
      "fev",
      "mar",
      "abr",
      "mai",
      "jun",
      "jul",
      "ago",
      "set",
      "out",
      "nov",
      "dez",
    ];
    const classes = useStyles();
  
    return months.map((month, i) => {
      return (
        <Grid item xs={2} sm={1} lg={1} key={i}>
          <CardActionArea
            className={stateMesAtual === i + 1 ? classes.ativo : classes.botao}
            onClick={() => setStateMesAtual(i + 1)}
          >
            <Typography variant="button">{month}</Typography>
          </CardActionArea>
        </Grid>
      );
    });
  };

  return (
    <Grid container justify="center" spacing={1}>
      <MonthButtons />
    </Grid>
  );
}
