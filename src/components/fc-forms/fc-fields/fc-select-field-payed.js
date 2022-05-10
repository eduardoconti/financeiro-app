import React, { useContext } from "react";
import Menu from "../fc-menu-tem/fc-menu-item";
import TextField from "@material-ui/core/TextField";
import { ContextForm } from "../../../Context/FormContext";
import { dateIso8601, formatDateToForm } from "common";
export default function FcSelectFieldPayed() {
  const options = [
    { id: false, descricao: "Aberto" },
    { id: true, descricao: "Pago" },
  ];
  const { form, setForm } = useContext(ContextForm);

  return (
    <TextField
      id="pago"
      label="Pago"
      variant="outlined"
      size="small"
      fullWidth
      value={form.pago ? form.pago : false}
      select
      onChange={(event) => {
        setForm({
          ...form,
          pago: event.target.value,
          pagamento: event.target.value
            ? form.pagamento ?? formatDateToForm(dateIso8601())
            : undefined,
        });
      }}
    >
      {Menu(options)}
    </TextField>
  );
}
