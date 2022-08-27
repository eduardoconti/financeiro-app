import { FcTextField } from "@components/fc-forms/fc-fields";
import { useExpenseFilter } from "@pages/expenses/hook";
import { useWallet } from "@pages/wallet/hooks";
import Menu from "components/fc-forms/fc-menu-tem/fc-menu-item";
import { useMemo } from "react";
import shallow from "zustand/shallow";

export default function FcWalletFilter() {
  const wallets = useWallet((state) => state.wallets);
  const { walletId, setWalletId } = useExpenseFilter(s => ({
    walletId: s.walletId,
    setWalletId: s.setWalletId
  }), shallow)

  const walletsFilter = useMemo(() => {
    return [{ id: 0, descricao: "Todas" }, ...wallets]
  }, [wallets])

  return (
    <FcTextField
      id={"fc-wallet-filter"}
      label={"Carteira"}
      value={walletId ?? 0}
      select
      onChange={(event) => {
        setWalletId(parseInt(event.target.value));
      }}
    >
      {Menu(walletsFilter)}
    </FcTextField>
  );
}
