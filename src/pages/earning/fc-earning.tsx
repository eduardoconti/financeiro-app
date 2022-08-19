import { setCreatedAlert } from "@common/AlertFuncoes";
import { useWallet } from "@pages/wallet/hooks";
import { ContextAlert, ContextAnoMes, ContextChecked, SpinContext } from "Context";
import { useContext, useEffect } from "react";
import { EarningBody } from "./fc-earning-body";
import { useEarning} from "./hooks";

export function FcEarningPage() {
  const initEarnings = useEarning((state) => state.fetchEarnings);
  const initWallet = useWallet((state) => state.fetchWallets);

  const { stateCheckedReceitas: checked } = useContext(ContextChecked);
  const { stateMesAtual: month, stateAnoAtual: year } = useContext(ContextAnoMes);
  const { setAlert } = useContext(ContextAlert);
  const { setSpin } = useContext(SpinContext);

  useEffect(() => {
    async function start() {
      try {
        setSpin(true);
        await initEarnings({ checked, month, year });
        await initWallet();
      } catch (error: any) {
        setAlert(setCreatedAlert(error.status, error.detail, error.title));
      } finally {
        setSpin(false);
      }
    }
    start();
  }, [checked, initEarnings, initWallet, month, setAlert, setSpin, year])
  return (
    <EarningBody />
  );
}
