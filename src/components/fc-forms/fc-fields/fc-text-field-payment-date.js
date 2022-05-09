import React, { useContext } from "react";
import { ContextForm } from "../../../Context/FormContext";
import TextField from "@material-ui/core/TextField";

export default function FcTextFieldPaymentDate(props) {
  const ctxForm = useContext(ContextForm);
  const setForm = ctxForm.setForm;
  const form = ctxForm.form;

  return (
    <TextField
      id="pagamento"
      label="Pagamento"
      variant="outlined"
      size="small"
      type="date"
      fullWidth
      InputLabelProps={{ shrink: true }} 
      value={form.pagamento ?? ""}
      onChange={(event) => {
        setForm({
          ...form,
          pagamento: event.target.value,
        });
      }}
    />
  );
}
