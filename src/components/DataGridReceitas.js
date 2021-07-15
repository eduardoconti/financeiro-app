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
import { calculaTotais } from "../common/Funcoes";
import Alert from "./Alert";
import { Box } from "@material-ui/core";
import {
  setCreatedAlert,
  setExclusionAlert
} from "../common/AlertFuncoes";
import { ContextTotais } from "../Context/TotaisContext";
import { ContextChecked } from "../Context/CheckedContext";
import { ContextAnoMes } from "../Context/AnoMesContext";
import { SpinContext } from "../Context/SpinContext";
import { getToken, getUserIdFromToken } from "../common/Auth";
import { ContextAlert } from "../Context/AlertContext";
import { useTheme } from "@material-ui/core";
import { FcColumnDescription } from "./fc-datagrid/fc-column-description";
export default function DataGridComponent({ setFormulario }) {
  const theme = useTheme();
  const [rows, setRows] = useState([]);
  const ctxTotais = useContext(ContextTotais);
  const ctxChecked = useContext(ContextChecked);
  const ctxAnoMes = useContext(ContextAnoMes);
  const ctxAlert = useContext(ContextAlert);
  const ctxSpin = useContext(SpinContext) ;
  const setStateTotais = ctxTotais.setStateTotais;
  const stateTotais = ctxTotais.stateTotais;
  const stateCheckedDespesas = ctxChecked.stateCheckedDespesas;
  const stateCheckedReceitas = ctxChecked.stateCheckedReceitas;
  const stateMesAtual = ctxAnoMes.stateMesAtual;
  const stateAnoAtual = ctxAnoMes.stateAnoAtual;
  const setAlert = ctxAlert.setAlert;

  let columns = [FcColumnDescription];
  columns.push(

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

        return (
          <Box>
            <IconButton
              aria-label="pago"
              style={{
                color: field.row.pago
                  ? theme.palette.success.dark
                  : theme.palette.error.main,
                padding: 2,
              }}
              onClick={async () => {
                ctxSpin.setSpin(true);

                const receita = {
                  id: field.row.id,
                  pago: !field.row.pago,
                };

                const response = await alteraFlagPago(receita);

                setAlert(
                  setCreatedAlert(
                    response.statusCode,
                    response.message,
                    response.internalMessage
                  )
                );

                await setStateReceitas();
                ctxSpin.setSpin(false);
              }}
            >
              <FiberManualRecordTwoToneIcon />
            </IconButton>
            <IconButton
              aria-label="alterar"
              style={{ color: theme.palette.primary.dark, padding: 2 }}
              onClick={async () => {
                const { data: formulario } = await retornaReceitaPorId(
                  field.row.id
                );
                setFormulario(formataDadosParaFormulario(formulario));
              }}
            >
              <CreateTwoToneIcon />
            </IconButton>

            <IconButton
              aria-label="excluir"
              style={{ color: theme.palette.secondary.dark, padding: 2 }}
              onClick={async () => {
                ctxSpin.setSpin(true);

                let response = await deletaReceita(field.row.id);
                await setStateReceitas();
                setAlert(
                  setExclusionAlert(
                    response.statusCode,
                    response.message,
                    response.internalMessage
                  )
                );
                setStateTotais(
                  await calculaTotais(
                    stateCheckedDespesas,
                    stateCheckedReceitas,
                    stateAnoAtual,
                    stateMesAtual
                  )
                );

                ctxSpin.setSpin(false);
              }}
            >
              <DeleteForeverTwoToneIcon />
            </IconButton>
            <IconButton
              aria-label="transfere"
              style={{ color: theme.palette.primary.dark, padding: 2 }}
              onClick={async () => {
                ctxSpin.setSpin(true);
                const { data: receita } = await retornaReceitaPorId(
                  field.row.id
                );
                receita.pagamento = new Date(stateAnoAtual, stateMesAtual, 10);
                receita.id = 0;
                receita.pago = false;
                receita.user = getUserIdFromToken();

                const response = await insereReceita(
                  formataDadosParaFormulario(receita)
                );

                setAlert(
                  setCreatedAlert(
                    response.statusCode,
                    response.message,
                    response.internalMessage
                  )
                );

                if (response.statusCode === 201) {
                  await setStateReceitas();
                  setStateTotais(
                    await calculaTotais(
                      stateCheckedDespesas,
                      stateCheckedReceitas,
                      stateAnoAtual,
                      stateMesAtual
                    )
                  );
                }

                ctxSpin.setSpin(false);
              }}
            >
              <ImportExportTwoToneIcon />
            </IconButton>
          </Box>
        );
      },
    },
  );

  async function setStateReceitas() {
    if (getToken()) {
      ctxSpin.setSpin(true);
      let receitas = await getReceitas(
        stateCheckedReceitas,
        stateAnoAtual,
        stateMesAtual
      );

      if (receitas.statusCode < 400) {
        setRows(formataDadosParaLinhasDataGrid(receitas.data));
      }
      ctxSpin.setSpin(false);
    }
  }

  useEffect(() => {
    setStateReceitas(); // eslint-disable-next-line
  }, [stateCheckedReceitas, stateTotais, stateAnoAtual, stateMesAtual]);

  return (
    <Box>
      <Alert alert={alert} setAlert={(alert) => setAlert(alert)}></Alert>
      <DataGrid rows={rows} columns={columns} />
    </Box>
  );
}
