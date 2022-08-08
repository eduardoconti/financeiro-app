import React, { useEffect, useState, useContext } from "react";
import Menu from "../fc-menu-tem/fc-menu-item";
import { retornaCarteiras } from "../../../common/CarteiraFuncoes";
import { ContextForm } from "../../../Context/FormContext";
import TextField from "@material-ui/core/TextField";
import { isAuthenticated } from "../../../common/Auth";
import SpinCircular from "../../fc-spin/fc-spin";
export default function FcSelectFieldWallet(props) {
  const [wallets, setWallets] = useState([]);
  const [spin, setSpin] = useState(false);
  const ctxForm = useContext(ContextForm);
  const { id = "carteiraId", label = "Carteira" } = props;

  useEffect(() => {
    async function fetchData() {
      if (isAuthenticated()) {
        setSpin(true);
        const { data } = await retornaCarteiras();
        setWallets(data);
        setSpin(false);
      } else {
        setWallets([]);
      }
    }
    fetchData();
  }, []);

  return (
    <TextField
      id={id}
      label={label}
      variant="outlined"
      size="small"
      fullWidth
      value={ctxForm.form[id] ?? ""}
      select
      onChange={(event) => {
        ctxForm.setForm({ ...ctxForm.form, [id]: event.target.value });
      }}
    >
      {spin ? <SpinCircular size={20} /> : Menu(wallets)}
    </TextField>
  );
}
