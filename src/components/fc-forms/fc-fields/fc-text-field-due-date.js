import { useContext } from "react";

import TextField from "@material-ui/core/TextField";
import { ContextForm } from "Context";

export default function FcTextFieldDueDate(props) {
  const { form, setForm } = useContext(ContextForm);

  return (
    <TextField
      id="vencimento"
      label="Vencimento"
      variant="outlined"
      size="small"
      type="date"
      fullWidth
      InputLabelProps={{ shrink: true }}
      value={form.vencimento ?? " "}
      onChange={(event) => {
        setForm({
          ...form,
          vencimento: event.target.value,
        });
      }}
    />
  );
}
