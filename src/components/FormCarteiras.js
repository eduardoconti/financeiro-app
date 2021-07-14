import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, TextField, Button } from "@material-ui/core";
import { insereCarteira, alteraCarteira } from "../common/CarteiraFuncoes";
import Alert from "./Alert";

import { retornaCarteiras } from "../common/CarteiraFuncoes";
import {
  emptyFormularioCarteira,
  emptyAlertState,
} from "../common/EmptyStates";
import { retornaStateAlertCadastro } from "../common/AlertFuncoes";
import { getUserIdFromToken } from "../common/Auth";

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

export default function FormCarteiras({ setRows, formulario, setFormulario }) {
  const classes = useStyles();
  const descricaoBotao = formulario.id === 0 ? "CADASTRAR" : "ALTERAR";
  const [alert, setAlert] = useState(emptyAlertState);

  return (
    <Box className="Formularios">
      <Alert alert={alert} setAlert={(alert) => setAlert(alert)} />
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="descricao"
          label="Descricao Carteira"
          variant="outlined"
          size="small"
          style={{ width: 180 }}
          required={true}
          value={formulario.descricao}
          onChange={(event) =>
            setFormulario({ ...formulario, descricao: event.target.value })
          }
        />
        <Button
          variant="contained"
          size="small"
          className={classes.botao}
          onClick={async () => {
            let response;
            formulario.user = getUserIdFromToken();
            if (formulario.id === 0) {
              response = await insereCarteira(formulario);
            } else {
              response = await alteraCarteira(formulario);
            }

            setRows(await retornaCarteiras());
            setFormulario(emptyFormularioCarteira);
            setAlert(
              retornaStateAlertCadastro(
                response.statusCode,
                "Carteira",
                response.message
              )
            );
          }}
        >
          {descricaoBotao}
        </Button>

        <Button
          variant="contained"
          size="small"
          className={classes.botao}
          onClick={async () => {
            setFormulario(emptyFormularioCarteira);
          }}
        >
          LIMPAR
        </Button>
      </form>
    </Box>
  );
}
