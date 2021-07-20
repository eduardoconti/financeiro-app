import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { retornaCarteiras } from "../common/CarteiraFuncoes";
import { insereReceita, alteraReceita } from "../common/ReceitaFuncoes";
import { calculaTotais } from "../common/Funcoes";
import { Box } from "@material-ui/core";
import { emptyFormularioReceita } from "../common/EmptyStates";

import { setCreatedAlert } from "../common/AlertFuncoes";
import Menu from "./MenuItemForm";
import { getUserIdFromToken } from "../common/Auth";
import { ContextTotais } from "../Context/TotaisContext";
import { ContextChecked } from "../Context/CheckedContext";
import { ContextAnoMes } from "../Context/AnoMesContext";
import { SpinContext } from "../Context/SpinContext";
import { ContextAlert } from "../Context/AlertContext";
import { ContextForm } from "../Context/FormContext";

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

export default function FormReceitas() {
  const [carteiras, setCarteiras] = useState([]);
  const classes = useStyles();
  const ctxTotais = useContext(ContextTotais);
  const ctxChecked = useContext(ContextChecked);
  const ctxAnoMes = useContext(ContextAnoMes);
  const ctxSpin = useContext(SpinContext);
  const ctxAlert = useContext(ContextAlert);
  const ctxForm = useContext(ContextForm);

  const setStateTotais = ctxTotais.setStateTotais;
  const stateCheckedDespesas = ctxChecked.stateCheckedDespesas;
  const stateCheckedReceitas = ctxChecked.stateCheckedReceitas;
  const stateMesAtual = ctxAnoMes.stateMesAtual;
  const stateAnoAtual = ctxAnoMes.stateAnoAtual;
  const formulario = ctxForm.form;
  const setFormulario = ctxForm.setForm;

  const descricaoBotao = formulario.id === 0 ? "CADASTRAR" : "ALTERAR";

  useEffect(() => {
    retornaCarteiras().then((carteiras) => {
      setCarteiras(carteiras);
    });
  }, []);

  let MenuCarteira = Menu(carteiras);
  let MenuPago = Menu([
    { id: false, descricao: "Aberto" },
    { id: true, descricao: "Pago" },
  ]);
  let TextFieldPago = (
    <TextField
      id="pago"
      label="Pago"
      variant="outlined"
      size="small"
      style={{ width: 150 }}
      value={formulario.pago ? formulario.pago : " "}
      select
      onChange={(event) =>
        setFormulario({ ...formulario, pago: event.target.value })
      }
    >
      {MenuPago}
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

  return (
    <Box className="Formularios">
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

        {TextFieldCarteira}
        <TextField
          id="pagamento"
          label="Pagamento"
          variant="outlined"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          value={formulario.pagamento}
          size="small"
          onChange={(event) =>
            setFormulario({ ...formulario, pagamento: event.target.value })
          }
        />

        <TextField
          id="valor"
          label="Valor"
          variant="outlined"
          size="small"
          style={{ width: 120 }}
          value={formulario.valor}
          onChange={(event) =>
            setFormulario({ ...formulario, valor: event.target.value })
          }
        />
        {TextFieldPago}
        <Button
          variant="contained"
          size="small"
          className={classes.botao}
          onClick={async () => {
            ctxSpin.setSpin(true);
            let response = 0;
            formulario.user = getUserIdFromToken();
            if (formulario.id === 0) response = await insereReceita(formulario);
            else {
              response = await alteraReceita(formulario);
            }

            ctxAlert.setAlert(
              setCreatedAlert(
                response.statusCode,
                response.message,
                response.internalMessage
              )
            );

            if (response.statusCode === 200 || response.statusCode === 201) {
              setFormulario(
                emptyFormularioReceita(stateAnoAtual, stateMesAtual)
              );

              setStateTotais(
                await calculaTotais(
                  stateCheckedDespesas,
                  stateCheckedReceitas,
                  stateAnoAtual,
                  stateMesAtual
                )
              );
            }

            ctxSpin.setSpin(true);
          }}
        >
          {descricaoBotao}
        </Button>
        <Button
          variant="contained"
          size="small"
          className={classes.botao}
          onClick={() => {
            setFormulario(emptyFormularioReceita(stateAnoAtual, stateMesAtual));
          }}
        >
          LIMPAR
        </Button>
      </form>
    </Box>
  );
}
