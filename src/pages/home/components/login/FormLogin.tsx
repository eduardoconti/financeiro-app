import { useContext, useState } from "react";

import { Grid, makeStyles } from "@material-ui/core";

import { login, logout } from "../../../../common/Auth";
import { ContextAlert } from "../../../../Context/AlertContext";
import { setCreatedAlert } from "../../../../common/AlertFuncoes";
import { ObtemToken } from "common";
import FcButton from "../../../../components/fc-button/fc-button";
import { useHistory } from "react-router-dom";
import { FcTextFieldDescription } from "../../../../components/fc-forms/fc-fields";
import { useSpin } from "@hooks/use-spin";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[theme.palette.type === "dark" ? 800 : 300],
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
    borderRadius: theme.shape.borderRadius,
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

export default function FormLogin({ setOpen }: any) {
  const [formulario, setFormulario] = useState({ username: "", password: "" });
  const classes = useStyles();
  const ctxAlert = useContext(ContextAlert);
  const history = useHistory();
  const setSpin = useSpin((s) => s.setSpin);

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12}>
          <FcTextFieldDescription
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
                  setSpin(true);
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
                  setSpin(false);
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
