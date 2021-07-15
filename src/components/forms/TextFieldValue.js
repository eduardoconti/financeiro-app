import React, { useContext } from "react";
import { ContextForm } from "../../Context/FormContext";
import TextField from "@material-ui/core/TextField";

export default function TextFieldValue(props) {
  const ctxForm = useContext(ContextForm);
  const setForm = ctxForm.setForm;
  const form = ctxForm.form;

  return (
    <TextField
      id="valor"
      label="Valor"
      variant="outlined"
      size="small"
      type="number"
      style={{ width: 120 }}
      value={form.valor ? form.valor : " "}
      onChange={(event) => {
        let valor = event.target.value;
        if (valor) {
          valor = parseFloat(valor);
        }

        setForm({
          ...form,
          valor: event.target.value,
        });
      }}
    />
  );
}
