import React, { useContext } from "react";
import { ContextForm } from "../../../Context/FormContext";
import TextField from "@material-ui/core/TextField";

export default function FcTextFieldInstalment(props: any) {
  const { form, setForm } = useContext(ContextForm);

  return (
    <TextField
      id="instalment"
      label="Parcela"
      variant="outlined"
      size="small"
      fullWidth
      value={form.instalment ? form.instalment.toString() : ""}
      onChange={(event) => {
        setForm({
          ...form,
          instalment: parseInt(event.target.value),
        });
      }}
    />
  );
}
