import { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

import { login, logout } from "../common/Auth";
import { ContextAlert } from "../Context/AlertContext";
import { setCreatedAlert } from "../common/AlertFuncoes";
import { ObtemToken } from "common";
import FcButton from "./fc-button/fc-button";
import { HttpStatus } from "common/enum";
import { useHistory } from "react-router-dom";
import { FcTextFieldDescription } from "./fc-forms/fc-fields";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[900],
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
  const ctxAlert = useContext(ContextAlert);
  const history = useHistory();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12}>
          <FcTextFieldDescription
            error={formulario.username.length <= 4}
            id="username"
            label="username"
            required={true}
            value={formulario.username}
            onChange={(event) =>
              setFormulario({ ...formulario, username: event.target.value })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <FcTextFieldDescription
            error={formulario.password.length <= 4}
            id="password"
            label="password"
            type="password"
            required={true}
            value={formulario.password}
            onChange={(event) =>
              setFormulario({ ...formulario, password: event.target.value })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <FcButton
                description="Login"
                className={classes.botao}
                onClick={async () => {
                  if (
                    formulario.username.length <= 4 ||
                    formulario.password.length <= 4
                  ) {
                    ctxAlert.setAlert(
                      setCreatedAlert(
                        HttpStatus.BAD_REQUEST,
                        "Preencha os campos corretamente",
                        "Campo(s) inválido(s)"
                      )
                    );
                    return;
                  }
                  const {
                    status,
                    message,
                    internalMessage,
                    title,
                    detail,
                    data,
                  } = await ObtemToken(formulario);

                  ctxAlert.setAlert(
                    setCreatedAlert(
                      status,
                      message ?? detail,
                      internalMessage ?? title
                    )
                  );
                  if (status === 201) {
                    login(data.accessToken);
                    setFormulario({ username: "", password: "" });
                    setOpen(false);
                  }
                  history.push("");
                  window.location.reload();
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <FcButton
                description="Logout"
                className={classes.botao}
                onClick={async () => {
                  logout();
                  setOpen(false);
                  history.push("");
                  window.location.reload();
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}
