import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { retornaCategorias } from "../common/CategoriaFuncoes";
import { retornaCarteiras } from "../common/CarteiraFuncoes";
import { insereDespesa, alteraDespesa } from "../common/DepesaFuncoes";
import { calculaTotais } from "../common/Funcoes";
import { Box } from "@material-ui/core";
import { emptyFormularioDespesa, emptyAlertState } from "../common/EmptyStates";
import Alert from "./Alert";
import {
  retornaStateAlertCadastro,
  AlertWarning,
} from "../common/AlertFuncoes";
import Menu from "./MenuItemForm";
import { Context } from "../Context/AuthContext";
import { ContextTotais } from "../Context/TotaisContext";
import { ContextChecked } from "../Context/CheckedContext";
import { ContextAnoMes } from "../Context/AnoMesContext";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
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

export default function FormDespesas({ setFormulario, formulario }) {
  const ctx = useContext(Context);
  const ctxTotais = useContext(ContextTotais);
  const ctxChecked = useContext(ContextChecked);
  const ctxAnoMes = useContext(ContextAnoMes);

  const [categorias, setCategorias] = useState([]);
  const [carteiras, setCarteiras] = useState([]);
  const [alert, setAlert] = useState(emptyAlertState);
  const classes = useStyles();

  const setStateTotais = ctxTotais.setStateTotais;
  const stateCheckedDespesas = ctxChecked.stateCheckedDespesas;
  const stateCheckedReceitas = ctxChecked.stateCheckedReceitas;
  const stateMesAtual = ctxAnoMes.stateMesAtual;
  const stateAnoAtual = ctxAnoMes.stateAnoAtual;

  const descricaoBotao = formulario.id === 0 ? "CADASTRAR" : "ALTERAR";

  useEffect(() => {
    retornaCategorias().then((categorias) => {
      if (categorias && categorias.length === 0) {
        setAlert(AlertWarning("Necessário cadastrar categoria"));
      } else {
        setCategorias(categorias);
      }
    });

    retornaCarteiras().then((carteiras) => {
      if (carteiras && carteiras.length === 0) {
        setAlert(AlertWarning("Necessário cadastrar carteira"));
      } else {
        setCarteiras(carteiras);
      }
    });
  }, []);

  let MenuCategoria = Menu(categorias);
  let MenuCarteira = Menu(carteiras);
  let MenuPago = Menu([
    { id: false, descricao: "Aberto" },
    { id: true, descricao: "Pago" },
  ]);
  let TextFieldCategoria = (
    <TextField
      id="categoria"
      label="Categoria"
      variant="outlined"
      size="small"
      style={{ width: 150 }}
      value={formulario.categoria}
      select
      onChange={(event) =>
        setFormulario({ ...formulario, categoria: event.target.value })
      }
    >
      {MenuCategoria}
    </TextField>
  );

  let TextFieldCarteira = (
    <TextField
      id="carteira"
      label="Carteira"
      variant="outlined"
      size="small"
      style={{ width: 150 }}
      value={formulario.carteira}
      select
      onChange={(event) =>
        setFormulario({ ...formulario, carteira: event.target.value })
      }
    >
      {MenuCarteira}
    </TextField>
  );

  let TextFieldPago = (
    <TextField
      id="pago"
      label="Pago"
      variant="outlined"
      size="small"
      style={{ width: 150 }}
      value={formulario.pago}
      select
      onChange={(event) =>
        setFormulario({ ...formulario, pago: event.target.value })
      }
    >
      {MenuPago}
    </TextField>
  );

  return (
    <Box className="Formularios">
      <Alert alert={alert} setAlert={(alert) => setAlert(alert)} />
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="descricao"
          label="Descricao"
          variant="outlined"
          size="small"
          style={{ width: 150 }}
          required={true}
          value={formulario.descricao}
          onChange={(event) =>
            setFormulario({ ...formulario, descricao: event.target.value })
          }
        />
        {TextFieldCategoria}
        {TextFieldCarteira}
        <TextField
          id="vencimento"
          label="Vencimento"
          variant="outlined"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          value={formulario.vencimento}
          size="small"
          onChange={(event) =>
            setFormulario({ ...formulario, vencimento: event.target.value })
          }
        />
        <TextField
          id="valor"
          label="Valor"
          variant="outlined"
          size="small"
          type="number"
          style={{ width: 120 }}
          value={formulario.valor}
          onChange={(event) =>
            setFormulario({
              ...formulario,
              valor: parseFloat(event.target.value),
            })
          }
        />
        {TextFieldPago}
        <Button
          variant="contained"
          size="small"
          className={classes.botao}
          onClick={async () => {
            let response;
            formulario.user = ctx.userId;
            if (formulario.id === 0) {
              response = await insereDespesa(formulario);
            } else {
              response = await alteraDespesa(formulario);
            }
            console.log(response);
            if (response.statusCode === 200 || response.statusCode === 201) {
              setFormulario(
                emptyFormularioDespesa(stateAnoAtual, stateMesAtual)
              );
            }

            setStateTotais(
              await calculaTotais(
                stateCheckedDespesas,
                stateCheckedReceitas,
                stateAnoAtual,
                stateMesAtual
              )
            );
            setAlert(
              retornaStateAlertCadastro(
                response.statusCode,
                "Despesa",
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
          onClick={() => {
            setFormulario(emptyFormularioDespesa(stateAnoAtual, stateMesAtual));
          }}
        >
          LIMPAR
        </Button>
      </form>
    </Box>
  );
}
