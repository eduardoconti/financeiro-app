import Menu from "../fc-menu-tem/fc-menu-item";
import { FcTextField, FcTextFieldProps } from "./fc-text-field";
import { useWallet } from "@pages/wallet/hooks";
export function FcSelectFieldWallet(props: Partial<FcTextFieldProps>) {
  const wallets = useWallet((state) => state.wallets);
  const { label, ...rest } = props;
  return (
    <FcTextField
      id="select-field-wallet"
      label={label ?? "Carteira"}
      select
      {...rest}
    >
      {Menu(wallets.filter((e) => e.active))}
    </FcTextField>
  );
}
