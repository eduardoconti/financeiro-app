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

const useStyles = makeStyles({
  operacoes: {
    color: "#216260",
    padding: 4,
  },
});

export default function DataGridComponent({ setFormulario, rows, setRows }) {
  const ctxAnoMes = useContext(ContextAnoMes);
  const stateMesAtual = ctxAnoMes.stateMesAtual;
  const stateAnoAtual = ctxAnoMes.stateAnoAtual;

  const classes = useStyles();
  const [alert, setAlert] = useState(emptyAlertState);
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
                const formulario = await getTransferenciaPorId(field.row.id);
                setFormulario(formataDadosParaFormulario(formulario));
              }}
            >
              <CreateTwoToneIcon />
            </IconButton>

            <IconButton
              aria-label="excluir"
              className={classes.operacoes}
              onClick={async () => {
                let response = await deletaTransferencia(field.row.id);
                await setState();
                setAlert(
                  retornaStateAlertExclusao(
                    response.statusCode,
                    "Transferencia",
                    response.message
                  )
                );
              }}
            >
              <DeleteForeverTwoToneIcon />
            </IconButton>

            <IconButton
              aria-label="pago"
              className={classes.operacoes}
              style={{ color: cor }}
              onClick={async () => {
                let transferencia = {
                  id: field.row.id,
                  pago: !field.row.pago,
                };
                let response = await alteraFlagPago(transferencia);
                await setState();

                setAlert(
                  retornaStateAlertAlteracaoFlagPago(
                    response.statusCode,
                    transferencia.pago,
                    "Transferencia",
                    response.message
                  )
                );
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
    let transferencias = await getTransferencias(stateAnoAtual, stateMesAtual);
    setRows(formataDadosParaLinhasDataGrid(transferencias));
  }

  useEffect(() => {
    getTransferencias(stateAnoAtual, stateMesAtual).then((transferencias) => {
      setRows(formataDadosParaLinhasDataGrid(transferencias));
    }); // eslint-disable-next-line
  }, [stateAnoAtual, stateMesAtual]);

  return (
    <Box>
      <Alert alert={alert} setAlert={(alert) => setAlert(alert)}></Alert>
      <DataGrid rows={rows} columns={columns} />
    </Box>
  );
}
