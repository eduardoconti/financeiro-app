import React, { useContext } from "react";
import { ContextForm } from "../../../Context/FormContext";
import TextField from "@material-ui/core/TextField";

export default function FcTextFieldDueDate(props) {
  const ctxForm = useContext(ContextForm);
  const setForm = ctxForm.setForm;
  const form = ctxForm.form;

  return (
    <TextField
      id="vencimento"
      label="Vencimento"
      variant="outlined"
      size="small"
      type="date"
      value={form.vencimento ? form.vencimento : " "}
      onChange={(event) => {

        setForm({
          ...form,
          vencimento: event.target.value,
        });
      }}
    />
  );
}
