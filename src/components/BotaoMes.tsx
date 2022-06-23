import React, { useContext, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import { ContextAnoMes } from "../Context/AnoMesContext";
import { Typography } from "@material-ui/core";
import { monthNames } from "../common/fc-constants";
export default function BotaoMes() {
  const ctxAnoMes = useContext(ContextAnoMes);
  const stateMesAtual = ctxAnoMes.stateMesAtual;
  const setStateMesAtual = ctxAnoMes.setStateMesAtual;
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

    return monthNames.map((month, i) => {
      return (
        <Grid item xs={2} sm={1} key={i}>
          <CardActionArea
            className={stateMesAtual === i ? classes.ativo : classes.botao}
            onClick={() => setStateMesAtual(i)}
          >
            <Typography variant="button">{month}</Typography>
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
