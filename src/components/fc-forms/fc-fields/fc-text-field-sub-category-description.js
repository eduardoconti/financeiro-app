import React, { useContext } from "react";
import { ContextForm } from "../../../Context/FormContext";
import TextField from "@material-ui/core/TextField";

export default function FcTextFieldSubCategoryDescription(props) {
  const ctxForm = useContext(ContextForm);
  const setForm = ctxForm.setForm;
  const form = ctxForm.form;
  const { label, value } = props;

  return (
    <TextField
      id="descricao"
      label={label ?? "Descricao"}
      variant="outlined"
      size="small"
      fullWidth
      value={value ?? ""}
      onChange={(event) => {
        setForm({
          ...form,
          subCategoryDescription: event.target.value,
        });
      }}
    />
  );
}
