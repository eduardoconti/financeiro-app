import React, { useState, useEffect, useContext } from "react";
import DataGrid from "./DataGrid";
import IconButton from "@material-ui/core/IconButton";
import CreateTwoToneIcon from "@material-ui/icons/CreateTwoTone";
import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";
import FiberManualRecordTwoToneIcon from "@material-ui/icons/FiberManualRecordTwoTone";
import ImportExportTwoToneIcon from "@material-ui/icons/ImportExportTwoTone";
import {
  getReceitas,
  deletaReceita,
  alteraFlagPago,
  formataDadosParaLinhasDataGrid,
  formataDadosParaFormulario,
  retornaReceitaPorId,
  insereReceita,
} from "../common/ReceitaFuncoes";
import { makeStyles } from "@material-ui/core/styles";
import { calculaTotais } from "../common/Funcoes";
import { emptyAlertState } from "../common/EmptyStates";
import Alert from "./Alert";
import { Box } from "@material-ui/core";
import {
  retornaStateAlertAlteracaoFlagPago,
  retornaStateAlertExclusao,
  retornaStateAlertCadastro,
} from "../common/AlertFuncoes";
import { ContextTotais } from "../Context/TotaisContext";
import { ContextChecked } from "../Context/CheckedContext";
import { ContextAnoMes } from "../Context/AnoMesContext";

const useStyles = makeStyles({
  operacoes: {
    color: "#216260",
    padding: 2,
  },
});

export default function DataGridComponent({ setFormulario }) {
  const [rows, setRows] = useState([]);
  const classes = useStyles();
  const [alert, setAlert] = useState(emptyAlertState);
  const ctxTotais = useContext(ContextTotais);
  const ctxChecked = useContext(ContextChecked);
  const ctxAnoMes = useContext(ContextAnoMes);

  const setStateTotais = ctxTotais.setStateTotais;
  const stateTotais = ctxTotais.stateTotais;
  const stateCheckedDespesas = ctxChecked.stateCheckedDespesas;
  const stateCheckedReceitas = ctxChecked.stateCheckedReceitas;
  const stateMesAtual = ctxAnoMes.stateMesAtual;
  const stateAnoAtual = ctxAnoMes.stateAnoAtual;

  const columns = [
    { field: "descricao", headerName: "Descricao", width: 150 },

    {
      field: "carteira",
      headerName: "Carteira",
      width: 120,
    },
    {
      field: "valor",
      headerName: "Valor",
      type: "number",
      width: 100,
    },

    {
      field: "operacoes",
      headerName: "Operacoes",
      width: 150,
      sortable: false,
      renderCell: function operacoes(field) {
        let cor;
        field.row.pago ? (cor = "#85f07b") : (cor = "#E55451");
        return (
          <Box>
            <IconButton
              aria-label="alterar"
              className={classes.operacoes}
              onClick={async () => {
                const formulario = await retornaReceitaPorId(field.row.id);
                setFormulario(formataDadosParaFormulario(formulario));
              }}
            >
              <CreateTwoToneIcon />
            </IconButton>

            <IconButton
              aria-label="excluir"
              className={classes.operacoes}
              onClick={async () => {
                let response = await deletaReceita(field.row.id);
                await setState();
                setStateTotais(
                  await calculaTotais(
                    stateCheckedDespesas,
                    stateCheckedReceitas,
                    stateAnoAtual,
                    stateMesAtual
                  )
                );
                setAlert(
                  retornaStateAlertExclusao(
                    response.statusCode,
                    "Receita",
                    response.message
                  )
                );
              }}
            >
              <DeleteForeverTwoToneIcon />
            </IconButton>
            <IconButton
              aria-label="transfere"
              className={classes.operacoes}
              onClick={async () => {
                const receita = await retornaReceitaPorId(field.row.id);
                receita.pagamento = new Date(stateAnoAtual, stateMesAtual, 10);
                receita.id = 0;
                receita.pago = false;
                receita.user = receita.user.id;
                const response = await insereReceita(
                  formataDadosParaFormulario(receita)
                );
                await setState();
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
                    "Receita",
                    response.message
                  )
                );
              }}
            >
              <ImportExportTwoToneIcon />
            </IconButton>
            <IconButton
              aria-label="pago"
              className={classes.operacoes}
              style={{ color: cor }}
              onClick={async () => {
                let receita = {
                  id: field.row.id,
                  pago: !field.row.pago,
                };
                let response = await alteraFlagPago(receita);
                await setState();
                setStateTotais(
                  await calculaTotais(
                    stateCheckedDespesas,
                    stateCheckedReceitas,
                    stateAnoAtual,
                    stateMesAtual
                  )
                );
                setAlert(
                  retornaStateAlertAlteracaoFlagPago(
                    response.statusCode,
                    receita.pago,
                    "Receita",
                    response.message
                  )
                );
              }}
            >
              <FiberManualRecordTwoToneIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  async function setState() {
    let receitas = await getReceitas(
      stateCheckedReceitas,
      stateAnoAtual,
      stateMesAtual
    );
    setRows(formataDadosParaLinhasDataGrid(receitas));
  }

  useEffect(() => {
    getReceitas(stateCheckedReceitas, stateAnoAtual, stateMesAtual).then(
      (receitas) => {
        setRows(formataDadosParaLinhasDataGrid(receitas));
      }
    );
  }, [stateCheckedReceitas, stateTotais, stateAnoAtual, stateMesAtual]);

  return (
    <Box>
      <Alert alert={alert} setAlert={(alert) => setAlert(alert)}></Alert>
      <DataGrid rows={rows} columns={columns} />
    </Box>
  );
}
