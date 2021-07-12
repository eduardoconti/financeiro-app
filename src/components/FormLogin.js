import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, TextField, Button } from "@material-ui/core";
import { ObtemToken } from "../common/Login";
import Alert from "./Alert";
import { login, logout } from "../common/Auth";
import { emptyAlertState } from "../common/EmptyStates";
import { Context } from "../Context/AuthContext";
import { ContextTotais } from "../Context/TotaisContext";
import { ContextChecked } from "../Context/CheckedContext";
import { calculaTotais } from "../common/Funcoes";
import { ContextAnoMes } from "../Context/AnoMesContext";
import { retornaStateAlertCadastro } from "../common/AlertFuncoes";
import { emptyTotais } from "../common/EmptyStates";
const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: "10px"
  },
  botao: {
    background: theme.palette.primary.dark,
    margin: 10,
    minHeight: 36,
    borderRadius: 5,
    textAlign: "center",
    fontWeight: "bold",
    boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)",
    color: "#fff",
    "&:hover": {
      background: theme.palette.primary.dark,
      boxShadow:
        "inset 2px 2px 1px 1px rgba(0, 0, 0, 0.1), 1px 1px 1px 1px rgba(0, 0, 0, 0.2)",
    },
  },
}));

export default function FormLogin({ setOpen }) {
  const [formulario, setFormulario] = useState({ username: "", password: "" });
  const classes = useStyles();
  const [alert, setAlert] = useState(emptyAlertState);
  const ctx = useContext(Context);
  const ctxTotais = useContext(ContextTotais);
  const ctxChecked = useContext(ContextChecked);
  const ctxAnoMes = useContext(ContextAnoMes);
  const stateMesAtual = ctxAnoMes.stateMesAtual;
  const stateAnoAtual = ctxAnoMes.stateAnoAtual;
  const setStateTotais = ctxTotais.setStateTotais;
  const stateCheckedDespesas = ctxChecked.stateCheckedDespesas;
  const stateCheckedReceitas = ctxChecked.stateCheckedReceitas;

  return (
    <Grid alignItems="center" justify="center">
      <Alert alert={alert} setAlert={(alert) => setAlert(alert)} />

        <form className={classes.root} noValidate autoComplete="off">
          <Grid item xs={12}>
            <TextField
              id="username"
              label="username"
              variant="outlined"
              size="small"
              style={{ width: 180, margin: 10 }}
              required={true}
              value={formulario.username}
              onChange={(event) =>
                setFormulario({ ...formulario, username: event.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="password"
              label="password"
              variant="outlined"
              size="small"
              style={{ width: 180,  margin: 10 }}
              required={true}
              value={formulario.password}
              onChange={(event) =>
                setFormulario({ ...formulario, password: event.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              size="small"
              className={classes.botao}
              onClick={async () => {
                ctx.setSpin(true);
                let { data, ...rest } = await ObtemToken(formulario);
                if (data.hasOwnProperty("accessToken")) {
                  login(data.accessToken);
                  setOpen(false);
                  ctx.setToken(data.accessToken);
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

                setAlert(
                  retornaStateAlertCadastro(
                    rest.status,
                    "Login",
                    rest.statusText
                  )
                );

                ctx.setSpin(false);
              }}
            >
              LOGIN
            </Button>

            <Button
              variant="contained"
              size="small"
              className={classes.botao}
              onClick={async () => {
                logout();
                setOpen(false);
                ctx.setToken("");
                ctx.setUserId("");
                setStateTotais(emptyTotais);
              }}
            >
              logout
            </Button>
          </Grid>
        </form>
    </Grid>
  );
}
