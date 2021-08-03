import React, { useContext } from "react";
import Menu from "../fc-menu-tem/fc-menu-item";
import TextField from "@material-ui/core/TextField";
import { ContextForm } from "../../../Context/FormContext";
export default function FcSelectFieldPayed() {
  const options = [
    { id: false, descricao: "Aberto" },
    { id: true, descricao: "Pago" },
  ];
  const ctxForm = useContext(ContextForm);

  return (
    <TextField
      id="pago"
      label="Pago"
      variant="outlined"
      size="small"
      fullWidth
      value={ctxForm.form.pago ? ctxForm.form.pago : false}
      select
      onChange={(event) => {
        ctxForm.setForm({ ...ctxForm.form, pago: event.target.value });
      }}
    >
      {Menu(options)}
    </TextField>
  );
}
