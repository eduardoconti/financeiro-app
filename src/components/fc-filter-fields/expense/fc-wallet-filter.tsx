import { TextField } from "@material-ui/core";
import { isAuthenticated, retornaCarteiras } from "common";
import Menu from "components/fc-forms/fc-menu-tem/fc-menu-item";
import SpinCircular from "components/fc-spin/fc-spin";
import { ContextExpenseFilter, ExpenseFilterContextType } from "Context";
import { useContext, useEffect, useState } from "react";

export default function FcWalletFilter() {
  const { filter, setFilter } = useContext(ContextExpenseFilter) as ExpenseFilterContextType;
  const [wallets, setWallets] = useState([]);
  const [spin, setSpin] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const { data } = await retornaCarteiras();
      data.unshift({id: 0, descricao: "Todas"})
      setWallets(data);
    }
    if (isAuthenticated()) {
      setSpin(true);
      fetchData();
      setSpin(false);
    }
  }, []);

  return (
    <TextField
      id={'fc-wallet-filter'}
      label={'Carteira'}
      variant="outlined"
      size="small"
      fullWidth
      value={filter?.walletId ?? 0}
      select
      onChange={(event) => {
        setFilter({ ...filter, walletId: parseInt(event.target.value) });
      }}
    >
      {spin ? <SpinCircular size={20} /> : Menu(wallets)}
    </TextField>
  );

}