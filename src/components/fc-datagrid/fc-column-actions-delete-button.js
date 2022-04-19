import React, { useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import { useTheme } from "@material-ui/core";
import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";
import { SpinContext } from "../../Context/SpinContext";
import { ContextAlert } from "../../Context/AlertContext";
import { setExclusionAlert } from "../../common/AlertFuncoes";
import { ContextTotais } from "../../Context/TotaisContext";
import { ContextChecked } from "../../Context/CheckedContext";
import { ContextAnoMes } from "../../Context/AnoMesContext";
import { calculaTotais } from "../../common/Funcoes";
export default function ActionDeleteButon(props) {
  const theme = useTheme();
  let { onClick, refreshTotal = true } = props;
  const ctxSpin = useContext(SpinContext);
  const ctxAlert = useContext(ContextAlert);
  const ctxTotais = useContext(ContextTotais);
  const ctxChecked = useContext(ContextChecked);
  const ctxAnoMes = useContext(ContextAnoMes);

  const setStateTotais = ctxTotais.setStateTotais;
  const stateCheckedDespesas = ctxChecked.stateCheckedDespesas;
  const stateCheckedReceitas = ctxChecked.stateCheckedReceitas;
  const stateMesAtual = ctxAnoMes.stateMesAtual;
  const stateAnoAtual = ctxAnoMes.stateAnoAtual;

  return (
    <IconButton
      aria-label="excluir"
      style={{ color: theme.palette.error.main, padding: 2 }}
      onClick={async () => {
        ctxSpin.setSpin(true);
        const { status, message, internalMessage } = await onClick();
        ctxAlert.setAlert(
          setExclusionAlert(
            status,
            message,
            internalMessage
          )
        );
        if (refreshTotal) {
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
      <DeleteForeverTwoToneIcon />
    </IconButton>
  );
}
