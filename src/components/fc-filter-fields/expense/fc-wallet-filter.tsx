import { WalletResponseDTO } from "@api/wallet/dto";
import { FcTextField } from "@components/fc-forms/fc-fields";
import { useWallet } from "@pages/wallet/hooks";
import Menu from "components/fc-forms/fc-menu-tem/fc-menu-item";
import { ContextExpenseFilter, ExpenseFilterContextType } from "Context";
import { useContext, useEffect, useState } from "react";

export default function FcWalletFilter() {
  const { filter, setFilter } = useContext(
    ContextExpenseFilter
  ) as ExpenseFilterContextType;

  const [wallet, setWallet] = useState<WalletResponseDTO[]>([]);

  const wallets = useWallet((state) => state.wallets);

  useEffect(() => {
    const newWallets = [...wallets];
    newWallets.unshift({ id: 0, descricao: "Todas" })
    setWallet(newWallets)
  }, [wallets]);

  console.log(filter);
  return (
    <FcTextField
      id={"fc-wallet-filter"}
      label={"Carteira"}
      value={filter?.walletId ?? 0}
      select
      onChange={(event) => {
        setFilter({ ...filter, walletId: parseInt(event.target.value) });
      }}
    >
      {Menu(wallet)}
    </FcTextField>
  );
}
