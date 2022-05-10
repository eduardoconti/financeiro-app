import React, { useContext } from "react";
import { ContextForm } from "../../../Context/FormContext";
import TextField from "@material-ui/core/TextField";
import { isDate } from "common";

export default function FcTextFieldPaymentDate(props) {
  const ctxForm = useContext(ContextForm);
  const setForm = ctxForm.setForm;
  const form = ctxForm.form;
  const { yeld } = props;

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
          pago: !yeld ? (isDate(event.target.value) ? true : false) : false,
        });
      }}
    />
  );
}
