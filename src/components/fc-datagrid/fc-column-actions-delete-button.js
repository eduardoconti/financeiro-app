import { useContext } from "react";
import { useTheme } from "@material-ui/core";
import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";
import { ContextAlert } from "../../Context/AlertContext";
import { setExclusionAlert } from "../../common/AlertFuncoes";
import { ContextTotais } from "../../Context/TotaisContext";
import { ContextChecked } from "../../Context/CheckedContext";
import { ContextAnoMes } from "../../Context/AnoMesContext";
import { calculaTotais } from "../../common/Funcoes";
import FcIconButton from "components/fc-button/fc-icon-button";
export default function ActionDeleteButon(props) {
  const theme = useTheme();
  let { onClick, refreshTotal = true } = props;

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
    <FcIconButton
      aria-label="excluir"
      style={{ padding: 2 }}
      color={theme.palette.error.light}
      onClick={async () => {
        const {
          status,
          message,
          internalMessage,
          title,
          detail,
        } = await onClick();
        ctxAlert.setAlert(
          setExclusionAlert(status, message ?? detail, internalMessage ?? title)
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
      }}
    >
      <DeleteForeverTwoToneIcon />
    </FcIconButton>
  );
}
