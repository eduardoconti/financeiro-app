import Menu from "../fc-menu-tem/fc-menu-item";
import { FcTextField, FcTextFieldProps } from "./fc-text-field";
import { useWallet } from "@pages/wallet/hooks";
export  function FcSelectFieldWallet(props: Partial<FcTextFieldProps>) {
  const wallets = useWallet((state) => state.wallets);
  return (
    <FcTextField
      id="select-field-wallet"
      label="Carteira"
      select
      {...props}
    >
      {Menu(wallets)}
    </FcTextField>
  );
}
