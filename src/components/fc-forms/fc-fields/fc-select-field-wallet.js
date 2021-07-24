import React, { useEffect, useState, useContext} from "react";
import  Menu  from '../fc-menu-tem/fc-menu-item';
import { retornaCarteiras} from '../../../common/CarteiraFuncoes';
import { ContextForm } from "../../../Context/FormContext";
import TextField from "@material-ui/core/TextField";
import { isAuthenticated } from "../../../common/Auth";
import SpinCircular from '../../fc-spin/fc-spin'
export default function FcSelectFieldWallet() {

  const [ wallets, setWallets ] = useState([]);
  const [spin, setSpin] = useState(false);
  const ctxForm = useContext(ContextForm);

  useEffect(() => {
    if (isAuthenticated()) {
      async function fetchData() {       
        setWallets(await retornaCarteiras());
      }
      setSpin(true);
      fetchData();
      setSpin(false);
    }
  }, []);

  return (
    <TextField
      id="carteira"
      label="Carteira"
      variant="outlined"
      size="small"
      style={{ width: 150 }}
      value={ctxForm.form.carteira ? ctxForm.form.carteira : " "}
      select
      onChange={(event) => {
        ctxForm.setForm({ ...ctxForm.form, carteira: event.target.value });
      }}
    >   
     {spin ? <SpinCircular size={20} /> :  Menu(wallets) }
        
    </TextField>
  );
}
