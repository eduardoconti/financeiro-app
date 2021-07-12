import React, { useState, useEffect, useContext } from "react";
import DataGrid from "./DataGrid";
import IconButton from "@material-ui/core/IconButton";
import CreateTwoToneIcon from "@material-ui/icons/CreateTwoTone";
import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";
import FiberManualRecordTwoToneIcon from "@material-ui/icons/FiberManualRecordTwoTone";
import {
  getDespesas,
  deletaDespesa,
  alteraFlagPago,
  formataDadosParaLinhasDataGrid,
  formataDadosParaFormulario,
  retornaDespesaPorId,
  insereDespesa,
} from "../common/DepesaFuncoes";
import { calculaTotais } from "../common/Funcoes";
import Alert from "./Alert";
import { Box } from "@material-ui/core";
import { emptyAlertState } from "../common/EmptyStates";
import {
  retornaStateAlertExclusao,
  retornaStateAlertAlteracaoFlagPago,
  retornaStateAlertCadastro,
} from "../common/AlertFuncoes";
import ImportExportTwoToneIcon from "@material-ui/icons/ImportExportTwoTone";
import { ContextTotais } from "../Context/TotaisContext";
import { ContextChecked } from "../Context/CheckedContext";
import { ContextAnoMes } from "../Context/AnoMesContext";
import { Context } from "../Context/AuthContext";
import { ContextForm } from "../Context/FormContext";
import { useTheme } from "@material-ui/core";

export default function DataGridDespesas() {

  const theme = useTheme();
  const ctxTotais = useContext(ContextTotais);
  const ctxChecked = useContext(ContextChecked);
  const ctxAnoMes = useContext(ContextAnoMes);
  const ctx = useContext(Context);
  const ctxForm = useContext(ContextForm);
  const setStateTotais = ctxTotais.setStateTotais;
  const stateTotais = ctxTotais.stateTotais;
  const stateCheckedDespesas = ctxChecked.stateCheckedDespesas;
  const stateCheckedReceitas = ctxChecked.stateCheckedReceitas;
  const stateMesAtual = ctxAnoMes.stateMesAtual;
  const stateAnoAtual = ctxAnoMes.stateAnoAtual;

  const [rows, setRows] = useState([]);
  const [alert, setAlert] = useState(emptyAlertState);

  const columns = [
    { field: "descricao", headerName: "Descricao", width: 170 },
    {
      field: "categoria",
      headerName: "Categoria",
      width: 120,
    },
    {
      field: "carteira",
      headerName: "Carteira",
      width: 120,
    },
    {
      field: "vencimento",
      headerName: "Vencimento",
      width: 120,
    },
    {
      field: "valor",
      headerName: "Valor",
      type: "number",
      width: 90,
    },
    {
      field: "operacoes",
      headerName: "Operacoes",
      width: 140,
      sortable: false,
      renderCell: function operacoes(field) {
        return (
          <Box>
            <IconButton
              aria-label="alterar"
              style={{color:theme.palette.primary.dark, padding: 2}}
              onClick={async () => {
                const formulario = await retornaDespesaPorId(field.row.id);
                ctxForm.setForm(formataDadosParaFormulario(formulario));
              }}
            >
              <CreateTwoToneIcon />
            </IconButton>

            <IconButton
              aria-label="excluir"
              style={{color:theme.palette.primary.dark, padding: 2}}
              onClick={async () => {
                let response = await deletaDespesa(field.row.id);
                await pegaDespesas();

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
                    "Despesa",
                    response.message
                  )
                );
              }}
            >
              <DeleteForeverTwoToneIcon />
            </IconButton>
            <IconButton
              aria-label="transfere"
              style={{color:theme.palette.primary.dark, padding: 2}}
              onClick={async () => {
                const despesa = await retornaDespesaPorId(field.row.id);
                let nextDate = new Date(
                  stateAnoAtual,
                  stateMesAtual,
                  10
                ).toISOString();

                despesa.id = 0;
                despesa.vencimento = nextDate;
                despesa.dataPagamento = nextDate;
                despesa.pago = false;
                despesa.user = despesa.user.id;

                const response = await insereDespesa(
                  formataDadosParaFormulario(despesa)
                );

                await pegaDespesas();

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
              size="small"
            >
              <ImportExportTwoToneIcon />
            </IconButton>
            <IconButton
              aria-label="pago"
              style={{ color: field.row.pago ? theme.palette.success.dark : theme.palette.error.dark, padding: 2 }}
              onClick={async () => {
                let despesa = {
                  id: field.row.id,
                  pago: !field.row.pago,
                };

                const response = await alteraFlagPago(despesa);
                await pegaDespesas();
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
                    despesa.pago,
                    "Despesa",
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

  async function pegaDespesas() {

      let despesas = await getDespesas(
        stateCheckedDespesas,
        stateAnoAtual,
        stateMesAtual
      );

      if (despesas.statusCode < 400 ) {
        setRows(formataDadosParaLinhasDataGrid(despesas.data));
      }

  }

  useEffect(() => {
    getDespesas(stateCheckedDespesas, stateAnoAtual, stateMesAtual).then(
      (despesas) => {
        if (despesas.statusCode < 400) {
          setRows(formataDadosParaLinhasDataGrid(despesas.data));
        }
      }
    );
  }, [
    stateCheckedDespesas,
    stateTotais,
    stateAnoAtual,
    stateMesAtual,
    ctx.userId,
  ]);

  return (
    <Box>
      <Alert alert={alert} setAlert={(alert) => setAlert(alert)} />
      <DataGrid rows={rows} columns={columns} />
    </Box>
  );
}
