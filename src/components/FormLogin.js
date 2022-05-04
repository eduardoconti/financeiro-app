import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, TextField, Button } from "@material-ui/core";
import { ObtemToken } from "../common/Login";
import { login, logout } from "../common/Auth";
import { SpinContext } from "../Context/SpinContext";
import { ContextTotais } from "../Context/TotaisContext";
import { ContextChecked } from "../Context/CheckedContext";
import { ContextAlert } from "../Context/AlertContext";
import { calculaTotais } from "../common/Funcoes";
import { ContextAnoMes } from "../Context/AnoMesContext";
import { emptyTotais } from "../common/EmptyStates";
import { setCreatedAlert } from "../common/AlertFuncoes";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    width: 250,
  },
  botao: {
    background:
      theme.palette.type === "dark"
        ? theme.palette.primary.dark
        : theme.palette.primary.light,
    width: "100%",
    minHeight: 36,
    borderRadius: theme.borderRadius,
    textAlign: "center",
    fontWeight: "bold",
    color: theme.palette.text.primary,
    "&:hover": {
      background:
        theme.palette.type === "dark"
          ? theme.palette.primary.dark
          : theme.palette.primary.light,
      boxShadow:
        "inset 2px 2px 1px 1px rgba(0, 0, 0, 0.1), 1px 1px 1px 1px rgba(0, 0, 0, 0.2)",
    },
  },
}));

export default function FormLogin({ setOpen }) {
  const [formulario, setFormulario] = useState({ username: "", password: "" });
  const classes = useStyles();
  const ctxSpin = useContext(SpinContext);
  const ctxTotais = useContext(ContextTotais);
  const ctxChecked = useContext(ContextChecked);
  const ctxAnoMes = useContext(ContextAnoMes);
  const ctxAlert = useContext(ContextAlert);
  const stateMesAtual = ctxAnoMes.stateMesAtual;
  const stateAnoAtual = ctxAnoMes.stateAnoAtual;
  const setStateTotais = ctxTotais.setStateTotais;
  const stateCheckedDespesas = ctxChecked.stateCheckedDespesas;
  const stateCheckedReceitas = ctxChecked.stateCheckedReceitas;

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12}>
          <TextField
            id="username"
            label="username"
            variant="outlined"
            size="small"
            required={true}
            value={formulario.username}
            onChange={(event) =>
              setFormulario({ ...formulario, username: event.target.value })
            }
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="password"
            label="password"
            variant="outlined"
            size="small"
            type="password"
            required={true}
            value={formulario.password}
            onChange={(event) =>
              setFormulario({ ...formulario, password: event.target.value })
            }
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                size="small"
                className={classes.botao}
                onClick={async () => {
                  ctxSpin.setSpin(true);

                  const res = await ObtemToken(formulario);

                  ctxAlert.setAlert(
                    setCreatedAlert(
                      res.status,
                      res.message,
                      res.internalMessage
                    )
                  );
                  if (res.status === 201) {
                    login(res.data.accessToken);
                    setStateTotais(
                      await calculaTotais(
                        stateCheckedDespesas,
                        stateCheckedReceitas,
                        stateAnoAtual,
                        stateMesAtual
                      )
                    );
                    setFormulario({ username: "", password: "" });
                  }

                  ctxSpin.setSpin(false);
                  setOpen(false);
                }}
              >
                LOGIN
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                size="small"
                className={classes.botao}
                onClick={async () => {
                  logout();
                  setOpen(false);
                  setStateTotais(emptyTotais);
                }}
              >
                logout
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}
