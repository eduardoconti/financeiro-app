import { WalletResponseDTO } from "@api/wallet/dto";
import { FcSelectMultiple } from "@components/fc-forms/fc-fields/fc-select-multiple";
import { useExpenseFilter } from "@pages/expenses/hook";
import { useWallet } from "@pages/wallet/hooks";
import shallow from "zustand/shallow";

export function FcWalletFilter() {
  const wallets = useWallet((state) => state.wallets);
  const { setWalletId, walletId } = useExpenseFilter(
    (s) => ({
      walletId: s.walletId,
      setWalletId: s.setWalletId,
    }),
    shallow
  );

  const onChange = (_: any, value: WalletResponseDTO[]) => {
    setWalletId(
      value.map((element) => {
        return element.id;
      })
    );
  };

  const defaultValue = wallets.filter((c) => walletId?.includes(c.id));

  return (
    <FcSelectMultiple
      options={wallets}
      placeHolder="Carteira"
      label="Carteira"
      defaultValue={defaultValue}
      getOptionLabel={(option: any) => option.descricao}
      onChange={onChange}
    />
  );
}
