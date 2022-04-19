import React, { useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import { useTheme } from "@material-ui/core";
import FiberManualRecordTwoToneIcon from "@material-ui/icons/FiberManualRecordTwoTone";
import { SpinContext } from "../../Context/SpinContext";
import { ContextAlert } from "../../Context/AlertContext";
import { setCreatedAlert } from "../../common/AlertFuncoes";
import { ContextTotais } from "../../Context/TotaisContext";
import { ContextChecked } from "../../Context/CheckedContext";
import { ContextAnoMes } from "../../Context/AnoMesContext";
import { calculaTotais } from "../../common/Funcoes";

export default function ActionFlagButon(props) {
  const theme = useTheme();
  const { onClick, payed } = props;
  const ctxSpin = useContext(SpinContext);
  const ctxAlert = useContext(ContextAlert);
  const ctxTotais = useContext(ContextTotais);
  const ctxChecked = useContext(ContextChecked);
  const ctxAnoMes = useContext(ContextAnoMes);
  return (
    <IconButton
      aria-label="pago"
      style={{
        color: payed ? theme.palette.secondary.dark : theme.palette.error.main,
        padding: 2,
      }}
      onClick={async () => {
        ctxSpin.setSpin(true);
        const { status, message, internalMessage } = await onClick();

        ctxAlert.setAlert(
          setCreatedAlert(status, message, internalMessage)
        );

        if (status === 200) {
          ctxTotais.setStateTotais(
            await calculaTotais(
              ctxChecked.stateCheckedDespesas,
              ctxChecked.stateCheckedReceitas,
              ctxAnoMes.stateAnoAtual,
              ctxAnoMes.stateMesAtual
            )
          );
        }

        ctxSpin.setSpin(false);
      }}
    >
      <FiberManualRecordTwoToneIcon />
    </IconButton>
  );
}
