import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { insereCategoria, alteraCategoria } from "../common/CategoriaFuncoes";
import { Box } from "@material-ui/core";
import { retornaCategorias } from "../common/CategoriaFuncoes";
import {
  emptyFormularioCategoria,
  emptyAlertState,
} from "../common/EmptyStates";
import Alert from "./Alert";
import { retornaStateAlertCadastro } from "../common/AlertFuncoes";
import { getUserIdFromToken } from "../common/Auth";
import { ContextForm } from "../Context/FormContext";
import { ContextDataGrid } from "../Context/DataGridContext";

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

export default function FormCategorias() {
  const classes = useStyles();
  const [alert, setAlert] = useState(emptyAlertState);
  const ctxForm = useContext(ContextForm);
  const ctxDataGrid = useContext(ContextDataGrid);
  const formulario = ctxForm.form;
  const setFormulario = ctxForm.setForm;
  const setRows = ctxDataGrid.setRows;
  const descricaoBotao = formulario.id === 0 ? "CADASTRAR" : "ALTERAR";
  return (
    <Box className="Formularios">
      <Alert alert={alert} setAlert={(alert) => setAlert(alert)} />
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="descricao"
          label="Descricao Categoria"
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
              response = await insereCategoria(formulario);
            } else {
              response = await alteraCategoria(formulario);
            }

            setRows(await retornaCategorias());
            setFormulario(emptyFormularioCategoria);
            setAlert(
              retornaStateAlertCadastro(
                response.statusCode,
                "Categoria",
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
            setFormulario(emptyFormularioCategoria);
          }}
        >
          LIMPAR
        </Button>
      </form>
    </Box>
  );
}
