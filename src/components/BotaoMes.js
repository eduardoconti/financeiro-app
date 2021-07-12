import React, { useContext } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import { ContextAnoMes } from "../Context/AnoMesContext";

export default function BotaoMes() {
  const ctxAnoMes = useContext(ContextAnoMes);
  const stateMesAtual = ctxAnoMes.stateMesAtual;
  const setStateMesAtual = ctxAnoMes.setStateMesAtual;

  const useStyles = makeStyles((theme) => ({
    botao: {
      background: theme.palette.primary.dark,
      minHeight: 36,
      borderRadius: 5,
      textAlign: "center",
      fontWeight: "bold",
      boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)",
      color: "#fff",
      "&:hover": {
        boxShadow:
          "inset 2px 2px 1px 1px rgba(0, 0, 0, 0.1), 1px 1px 1px 1px rgba(0, 0, 0, 0.2)",
      },
    },
    ativo: {
      backgroundColor: theme.palette.secondary.dark,
      minHeight: 36,
      borderRadius: 5,
      textAlign: "center",
      fontWeight: "bold",
      color: "#fff",
      boxShadow:
        "inset 2px 2px 2px 1px rgba(0, 0, 0, 0.2),  0px 0px 1px 1px rgba(0, 0, 0, 0.2)",
    },
  }));

  const classes = useStyles();
  function onClick(mesAtual) {
    setStateMesAtual(mesAtual);
  }
  return (
    <Grid container justify="center" spacing={1}>
      <Grid item xs={2} sm={1} lg={1}>
        <CardActionArea
          className={stateMesAtual === 1 ? classes.ativo : classes.botao}
          onClick={() => onClick(1)}
        >
          JAN
        </CardActionArea>
      </Grid>
      <Grid item xs={2} sm={1} lg={1}>
        <CardActionArea
          className={stateMesAtual === 2 ? classes.ativo : classes.botao}
          onClick={() => onClick(2)}
        >
          FEV
        </CardActionArea>
      </Grid>
      <Grid item xs={2} sm={1} lg={1}>
        <CardActionArea
          className={stateMesAtual === 3 ? classes.ativo : classes.botao}
          onClick={() => onClick(3)}
        >
          MAR
        </CardActionArea>
      </Grid>
      <Grid item xs={2} sm={1} lg={1}>
        <CardActionArea
          className={stateMesAtual === 4 ? classes.ativo : classes.botao}
          onClick={() => onClick(4)}
        >
          ABR
        </CardActionArea>
      </Grid>
      <Grid item xs={2} sm={1} lg={1}>
        <CardActionArea
          className={stateMesAtual === 5 ? classes.ativo : classes.botao}
          onClick={() => onClick(5)}
        >
          MAI
        </CardActionArea>
      </Grid>
      <Grid item xs={2} sm={1} lg={1}>
        <CardActionArea
          className={stateMesAtual === 6 ? classes.ativo : classes.botao}
          onClick={() => onClick(6)}
        >
          JUN
        </CardActionArea>
      </Grid>
      <Grid item xs={2} sm={1} lg={1}>
        <CardActionArea
          className={stateMesAtual === 7 ? classes.ativo : classes.botao}
          onClick={() => onClick(7)}
        >
          JUL
        </CardActionArea>
      </Grid>
      <Grid item xs={2} sm={1} lg={1}>
        <CardActionArea
          className={stateMesAtual === 8 ? classes.ativo : classes.botao}
          onClick={() => onClick(8)}
        >
          AGO
        </CardActionArea>
      </Grid>
      <Grid item xs={2} sm={1} lg={1}>
        <CardActionArea
          className={stateMesAtual === 9 ? classes.ativo : classes.botao}
          onClick={() => onClick(9)}
        >
          SET
        </CardActionArea>
      </Grid>
      <Grid item xs={2} sm={1} lg={1}>
        <CardActionArea
          className={stateMesAtual === 10 ? classes.ativo : classes.botao}
          onClick={() => onClick(10)}
        >
          OUT
        </CardActionArea>
      </Grid>
      <Grid item xs={2} sm={1} lg={1}>
        <CardActionArea
          className={stateMesAtual === 11 ? classes.ativo : classes.botao}
          onClick={() => onClick(11)}
        >
          NOV
        </CardActionArea>
      </Grid>
      <Grid item xs={2} sm={1} lg={1}>
        <CardActionArea
          className={stateMesAtual === 12 ? classes.ativo : classes.botao}
          onClick={() => onClick(12)}
        >
          DEZ
        </CardActionArea>
      </Grid>
    </Grid>
  );
}
