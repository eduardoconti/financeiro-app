import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { insereDespesa, alteraDespesa } from "../common/DepesaFuncoes";
import { calculaTotais } from "../common/Funcoes";
import { Box } from "@material-ui/core";
import { emptyFormularioDespesa } from "../common/EmptyStates";
import {
  setCreatedAlert,
} from "../common/AlertFuncoes";
import Menu from "./MenuItemForm";
import { Context } from "../Context/AuthContext";
import { ContextTotais } from "../Context/TotaisContext";
import { ContextChecked } from "../Context/CheckedContext";
import { ContextAnoMes } from "../Context/AnoMesContext";
import { ContextForm } from "../Context/FormContext";
import TextFieldValue from "./forms/TextFieldValue";
import { ContextWallet } from "../Context/WalletContext";
import { ContextCategory } from "../Context/CategoryContext";
import { retornaCategorias } from "../common/CategoriaFuncoes";
import { retornaCarteiras } from "../common/CarteiraFuncoes";
import { getUserIdFromToken, isAuthenticated } from "../common/Auth";
import { ContextAlert } from "../Context/AlertContext";

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
    background: theme.palette.primary.dark,
    margin: theme.spacing(1),
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

export default function FormDespesas() {
  const ctx = useContext(Context);
  const ctxTotais = useContext(ContextTotais);
  const ctxChecked = useContext(ContextChecked);
  const ctxAnoMes = useContext(ContextAnoMes);
  const ctxForm = useContext(ContextForm);
  const ctxWallet = useContext(ContextWallet);
  const ctxCategory = useContext(ContextCategory);
  const classes = useStyles();
  const ctxAlert = useContext(ContextAlert);
  const setStateTotais = ctxTotais.setStateTotais;
  const stateCheckedDespesas = ctxChecked.stateCheckedDespesas;
  const stateCheckedReceitas = ctxChecked.stateCheckedReceitas;
  const stateMesAtual = ctxAnoMes.stateMesAtual;
  const stateAnoAtual = ctxAnoMes.stateAnoAtual;
  const descricaoBotao = ctxForm.form.id === 0 ? "CADASTRAR" : "ALTERAR";
  const setAlert = ctxAlert.setAlert;

  useEffect(() => {
    if ( isAuthenticated() ) {
      async function fetchData() {
        ctx.setSpin(true);
        ctxCategory.setCategory(await retornaCategorias());
        ctxWallet.setWallet(await retornaCarteiras());
        ctxForm.setForm(emptyFormularioDespesa(stateAnoAtual, stateMesAtual));
        ctx.setSpin(false);
      }
      fetchData();
    }
    // eslint-disable-next-line
  }, [stateAnoAtual, stateMesAtual]);

  let MenuCategoria = Menu(ctxCategory.category);
  let MenuCarteira = Menu(ctxWallet.wallet);
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
      value={ctxForm.form.categoria ? ctxForm.form.categoria : " "}
      select
      onChange={(event) => {
        ctxForm.setForm({ ...ctxForm.form, categoria: event.target.value });
      }}
      children={MenuCategoria}
    ></TextField>
  );

  let TextFieldCarteira = (
    <TextField
      id="carteira"
      label="Carteira"
      variant="outlined"
      size="small"
      style={{ width: 150 }}
      value={ctxForm.form.carteira ? ctxForm.form.carteira : " "}
      select
      onChange={(event) =>
        ctxForm.setForm({ ...ctxForm.form, carteira: event.target.value })
      }
      children={MenuCarteira}
    ></TextField>
  );

  let TextFieldPago = (
    <TextField
      id="pago"
      label="Pago"
      variant="outlined"
      size="small"
      style={{ width: 150 }}
      value={ctxForm.form.pago ? ctxForm.form.pago : " "}
      select
      onChange={(event) =>
        ctxForm.setForm({ ...ctxForm.form, pago: event.target.value })
      }
      children={MenuPago}
    ></TextField>
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
          value={ctxForm.form.descricao ? ctxForm.form.descricao : " "}
          onChange={(event) =>
            ctxForm.setForm({ ...ctxForm.form, descricao: event.target.value })
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
          value={ctxForm.form.vencimento ? ctxForm.form.vencimento : " "}
          size="small"
          onChange={(event) =>
            ctxForm.setForm({ ...ctxForm.form, vencimento: event.target.value })
          }
        />
        <TextFieldValue />
        {TextFieldPago}
        <Button
          variant="contained"
          size="small"
          className={classes.botao}
          onClick={async () => {
            ctx.setSpin(true);
            let response;
            ctxForm.form.user = getUserIdFromToken();
            ctxForm.form.valor = parseFloat(ctxForm.form.valor);

            if (ctxForm.form.id === 0 || ctxForm.form.id === "") {
              response = await insereDespesa(ctxForm.form);
            } else {
              response = await alteraDespesa(ctxForm.form);
            }

            setAlert(
              setCreatedAlert(
                response.statusCode,
                response.message,
                response.internalMessage
              )
            );

            if (response.statusCode === 200 || response.statusCode === 201) {
              ctxForm.setForm(
                emptyFormularioDespesa(stateAnoAtual, stateMesAtual)
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

            ctx.setSpin(false);
          }}
        >
          {descricaoBotao}
        </Button>
        <Button
          variant="contained"
          size="small"
          className={classes.botao}
          onClick={() => {
            ctxForm.setForm(
              emptyFormularioDespesa(stateAnoAtual, stateMesAtual)
            );
          }}
        >
          LIMPAR
        </Button>
      </form>
    </Box>
  );
}
