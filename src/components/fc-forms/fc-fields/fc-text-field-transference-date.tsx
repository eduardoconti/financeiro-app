import { useContext } from "react";

import TextField from "@material-ui/core/TextField";
import { ContextForm } from "Context";

export default function FcTextFieldTransferenceDate(props: any) {
  const { form, setForm } = useContext(ContextForm);

  return (
    <TextField
      id="transferencia"
      label="Transferencia"
      variant="outlined"
      size="small"
      type="date"
      fullWidth
      InputLabelProps={{ shrink: true }}
      value={form.transferencia ?? " "}
      onChange={(event) => {
        setForm({
          ...form,
          transferencia: event.target.value,
        });
      }}
    />
  );
}
