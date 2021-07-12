import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { insereDespesa, alteraDespesa } from "../common/DepesaFuncoes";
import { calculaTotais } from "../common/Funcoes";
import { Box } from "@material-ui/core";
import { emptyFormularioDespesa, emptyAlertState } from "../common/EmptyStates";
import Alert from "./Alert";
import { retornaStateAlertCadastro } from "../common/AlertFuncoes";
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

export default function FormDespesas() {
  const ctx = useContext(Context);
  const ctxTotais = useContext(ContextTotais);
  const ctxChecked = useContext(ContextChecked);
  const ctxAnoMes = useContext(ContextAnoMes);
  const ctxForm = useContext(ContextForm);
  const ctxWallet = useContext(ContextWallet);
  const ctxCategory = useContext(ContextCategory);
  const [alert, setAlert] = useState(emptyAlertState);
  const classes = useStyles();

  const setStateTotais = ctxTotais.setStateTotais;
  const stateCheckedDespesas = ctxChecked.stateCheckedDespesas;
  const stateCheckedReceitas = ctxChecked.stateCheckedReceitas;
  const stateMesAtual = ctxAnoMes.stateMesAtual;
  const stateAnoAtual = ctxAnoMes.stateAnoAtual;

  const descricaoBotao = ctxForm.form.id === 0 ? "CADASTRAR" : "ALTERAR";

  useEffect(() => {

    async function fetchData() {
      ctxCategory.setCategory(await retornaCategorias());
      ctxWallet.setWallet(await retornaCarteiras());
      ctxForm.setForm(emptyFormularioDespesa(stateAnoAtual, stateMesAtual))
    }
    fetchData(); // eslint-disable-next-line
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
      <Alert alert={alert} setAlert={(alert) => setAlert(alert)} />
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
            let response;
            ctxForm.form.user = ctx.userId;
            ctxForm.form.valor = parseFloat(ctxForm.form.valor);

            if (ctxForm.form.id === 0) {
              response = await insereDespesa(ctxForm.form);
            } else {
              response = await alteraDespesa(ctxForm.form);
            }
            if (response.statusCode === 200 || response.statusCode === 201) {
              ctxForm.setForm(
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
