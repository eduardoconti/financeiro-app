import React, { useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import ImportExportTwoToneIcon from "@material-ui/icons/ImportExportTwoTone";
import { ContextAlert } from "../../Context/AlertContext";
import { setCreatedAlert } from "../../common/AlertFuncoes";
import { ContextTotais } from "../../Context/TotaisContext";
import { ContextChecked } from "../../Context/CheckedContext";
import { ContextAnoMes } from "../../Context/AnoMesContext";
import { calculaTotais } from "../../common/Funcoes";
import { useTheme } from "@material-ui/core";

export default function ActionReplicateButon(props) {
  const { onClick } = props;

  const ctxAlert = useContext(ContextAlert);
  const ctxTotais = useContext(ContextTotais);
  const { stateCheckedDespesas, stateCheckedReceitas } = useContext(
    ContextChecked
  );
  const { stateAnoAtual, stateMesAtual } = useContext(ContextAnoMes);
  const theme = useTheme();

  const setStateTotais = ctxTotais.setStateTotais;

  return (
    <IconButton
      aria-label="transfere"
      style={{ padding: 2 }}
      color={theme.palette.success.dark}
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
        setStateTotais(
          await calculaTotais(
            stateCheckedDespesas,
            stateCheckedReceitas,
            stateAnoAtual,
            stateMesAtual
          )
        );

      }}
    >
      <ImportExportTwoToneIcon />
    </IconButton>
  );
}
