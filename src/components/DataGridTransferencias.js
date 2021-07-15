import React, { useState, useEffect, useContext } from "react";
import DataGrid from "./DataGrid";
import IconButton from "@material-ui/core/IconButton";
import CreateTwoToneIcon from "@material-ui/icons/CreateTwoTone";
import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";
import FiberManualRecordTwoToneIcon from "@material-ui/icons/FiberManualRecordTwoTone";
import {
  getTransferencias,
  deletaTransferencia,
  alteraFlagPago,
  formataDadosParaLinhasDataGrid,
  formataDadosParaFormulario,
  getTransferenciaPorId,
} from "../common/TransferenciaFuncoes";
import { makeStyles } from "@material-ui/core/styles";
import { emptyAlertState } from "../common/EmptyStates";
import Alert from "./Alert";
import { Box } from "@material-ui/core";
import {
  retornaStateAlertAlteracaoFlagPago,
  retornaStateAlertExclusao,
} from "../common/AlertFuncoes";
import { ContextAnoMes } from "../Context/AnoMesContext";
import { ContextTotais } from "../Context/TotaisContext";
import { ContextChecked } from "../Context/CheckedContext";
import { calculaTotais } from "../common/Funcoes";
import { SpinContext } from "../Context/SpinContext";
import { getToken } from "../common/Auth";

const useStyles = makeStyles({
  operacoes: {
    color: "#216260",
    padding: 4,
  },
});

export default function DataGridComponent({ setFormulario }) {
  const [rows, setRows] = useState([]);
  const [alert, setAlert] = useState(emptyAlertState);
  const classes = useStyles();
  const ctxTotais = useContext(ContextTotais);
  const ctxChecked = useContext(ContextChecked);
  const ctxAnoMes = useContext(ContextAnoMes);
  const ctxSpin = useContext(SpinContext);

  const setStateTotais = ctxTotais.setStateTotais;
  const stateTotais = ctxTotais.stateTotais;
  const stateCheckedDespesas = ctxChecked.stateCheckedDespesas;
  const stateCheckedReceitas = ctxChecked.stateCheckedReceitas;
  const stateMesAtual = ctxAnoMes.stateMesAtual;
  const stateAnoAtual = ctxAnoMes.stateAnoAtual;

  const columns = [
    {
      field: "carteiraOrigem",
      headerName: "Origem",
      width: 120,
    },
    {
      field: "carteiraDestino",
      headerName: "Destino",
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
      width: 120,
      sortable: false,
      renderCell: function operacoes(field) {
        let cor;
        field.row.pago ? (cor = "#85f07b") : (cor = "#E55451");
        return (
          <div>
            <IconButton
              aria-label="alterar"
              className={classes.operacoes}
              onClick={async () => {
                ctxSpin.setSpin(true);
                const { data: formulario } = await getTransferenciaPorId(
                  field.row.id
                );
                setFormulario(formataDadosParaFormulario(formulario));
                ctxSpin.setSpin(false);
              }}
            >
              <CreateTwoToneIcon />
            </IconButton>

            <IconButton
              aria-label="excluir"
              className={classes.operacoes}
              onClick={async () => {
                ctxSpin.setSpin(true);
                let response = await deletaTransferencia(field.row.id);
                await setState();
                setAlert(
                  retornaStateAlertExclusao(
                    response.statusCode,
                    "Transferencia",
                    response.message
                  )
                );
                ctxSpin.setSpin(false);
              }}
            >
              <DeleteForeverTwoToneIcon />
            </IconButton>

            <IconButton
              aria-label="pago"
              className={classes.operacoes}
              style={{ color: cor }}
              onClick={async () => {
                ctxSpin.setSpin(true);
                let transferencia = {
                  id: field.row.id,
                  pago: !field.row.pago,
                };
                let response = await alteraFlagPago(transferencia);
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
                    transferencia.pago,
                    "Transferencia",
                    response.message
                  )
                );
                ctxSpin.setSpin(false);
              }}
            >
              <FiberManualRecordTwoToneIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];

  async function setState() {
    if (getToken()) {
      ctxSpin.setSpin(true);
      let transferencias = await getTransferencias(
        stateAnoAtual,
        stateMesAtual
      );

      if (transferencias.statusCode < 400) {
        setRows(formataDadosParaLinhasDataGrid(transferencias.data));
      }
      ctxSpin.setSpin(false);
    }
  }

  useEffect(() => {
    setState(); // eslint-disable-next-line
  }, [stateAnoAtual, stateMesAtual, stateTotais]);

  return (
    <Box>
      <Alert alert={alert} setAlert={(alert) => setAlert(alert)}></Alert>
      <DataGrid rows={rows} columns={columns} />
    </Box>
  );
}
