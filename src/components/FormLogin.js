import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, TextField, Button } from "@material-ui/core";
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
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    justifyContent: "center",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
  },
  botao: {
    "&:hover": {
      backgroundColor: "#9Ebfc0",
    },
    margin: 5,
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
    <Box className="Formularios">
      <Alert alert={alert} setAlert={(alert) => setAlert(alert)} />
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="username"
          label="username"
          variant="outlined"
          size="small"
          style={{ width: 180 }}
          required={true}
          value={formulario.username}
          onChange={(event) =>
            setFormulario({ ...formulario, username: event.target.value })
          }
        />
        <TextField
          id="password"
          label="password"
          variant="outlined"
          size="small"
          style={{ width: 180 }}
          required={true}
          value={formulario.password}
          onChange={(event) =>
            setFormulario({ ...formulario, password: event.target.value })
          }
        />

        <Button
          variant="contained"
          size="small"
          className={classes.botao}
          onClick={async () => {
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
              retornaStateAlertCadastro(rest.status, "Login", rest.statusText)
            );
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
          }}
        >
          logout
        </Button>
      </form>
    </Box>
  );
}
