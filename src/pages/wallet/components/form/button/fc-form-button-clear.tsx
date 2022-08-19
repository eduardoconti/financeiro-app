import FcFormIconButtonClear from "@components/fc-forms/fc-form-button/fc-form-icon-button-clear";
import { useFormWallet } from "@pages/wallet/hooks/use-form-wallet";

export default function FcFormButtonClearWallet() {
  const clear = useFormWallet((state) => state.clearAllFields)
  const onClick = () => {
    clear();
  }
  return <FcFormIconButtonClear description="limpar" onClick={onClick} />;
}
