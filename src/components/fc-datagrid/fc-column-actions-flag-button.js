import { useContext } from "react";

import { useTheme } from "@material-ui/core";
import FiberManualRecordTwoToneIcon from "@material-ui/icons/FiberManualRecordTwoTone";
import { ContextAlert } from "../../Context/AlertContext";
import { setCreatedAlert } from "../../common/AlertFuncoes";
import { ContextTotais } from "../../Context/TotaisContext";
import { ContextChecked } from "../../Context/CheckedContext";
import { ContextAnoMes } from "../../Context/AnoMesContext";
import { calculaTotais } from "../../common/Funcoes";
import FcIconButton from "components/fc-button/fc-icon-button";

export default function ActionFlagButon(props) {
  const theme = useTheme();
  const { onClick, payed } = props;
  const ctxAlert = useContext(ContextAlert);
  const ctxTotais = useContext(ContextTotais);
  const ctxChecked = useContext(ContextChecked);
  const ctxAnoMes = useContext(ContextAnoMes);
  return (
    <FcIconButton
      aria-label="pago"
      color={payed ? theme.palette.success.dark : theme.palette.error.light}
      onClick={async () => {
        const {
          status,
          message,
          internalMessage,
          title,
          detail,
        } = await onClick();

        ctxAlert.setAlert(
          setCreatedAlert(status, message ?? detail, internalMessage ?? title)
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

      }}
    >
      <FiberManualRecordTwoToneIcon />
    </FcIconButton>
  );
}
