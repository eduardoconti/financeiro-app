import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, TextField, Button } from "@material-ui/core";
import { ObtemToken } from "../common/Login";
import { login, logout } from "../common/Auth";
import { SpinContext } from "../Context/SpinContext";
import { ContextTotais } from "../Context/TotaisContext";
import { ContextChecked } from "../Context/CheckedContext";
import { ContextAlert} from "../Context/AlertContext";
import { calculaTotais } from "../common/Funcoes";
import { ContextAnoMes } from "../Context/AnoMesContext";
import { emptyTotais } from "../common/EmptyStates";
import { setCreatedAlert } from "../common/AlertFuncoes";

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
  const ctxSpin = useContext(SpinContext) ;
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
    <Grid alignItems="center" justify="center">

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
                ctxSpin.setSpin(true);

                const res = await ObtemToken(formulario);

                ctxAlert.setAlert(
                  setCreatedAlert(
                    res.statusCode,
                    res.message,
                    res.internalMessage
                  )
                )
                if (res.statusCode === 200) {
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
        </form>
    </Grid>
  );
}
