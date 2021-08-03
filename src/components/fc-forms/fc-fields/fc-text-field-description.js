import React, { useContext } from "react";
import { ContextForm } from "../../../Context/FormContext";
import TextField from "@material-ui/core/TextField";

export default function FcTextFieldDescription(props) {
  const ctxForm = useContext(ContextForm);
  const setForm = ctxForm.setForm;
  const form = ctxForm.form;

  return (
    <TextField
      id="descricao"
      label="Descricao"
      variant="outlined"
      size="small"
      fullWidth
      value={form.descricao ? form.descricao : " "}
      onChange={(event) => {
        setForm({
          ...form,
          descricao: event.target.value,
        });
      }}
    />
  );
}
