import React, { useContext } from "react";
import { ContextForm } from "../../../Context/FormContext";
import TextField from "@material-ui/core/TextField";

export default function FcTextFieldDueDate(props) {
  const ctxForm = useContext(ContextForm);
  const setForm = ctxForm.setForm;
  const form = ctxForm.form;
  const { id = "vencimento", label = "Vencimento" } = props;
  return (
    <TextField
      id={id}
      label={label}
      variant="outlined"
      size="small"
      type="date"
      fullWidth
      value={form[id] ? form[id] : " "}
      onChange={(event) => {
        setForm({
          ...form,
          [id]: event.target.value,
        });
      }}
    />
  );
}
