import { emptyFormularioDespesa } from "common";
import { ContextForm } from "Context";
import { useContext } from "react";
import FcFormIconButtonClear from "./fc-form-icon-button-clear";
export default function FcFormButtonClear() {
  const { setForm } = useContext(ContextForm);
  return (
    <FcFormIconButtonClear
      description="limpar"
      onClick={() => {
        setForm(emptyFormularioDespesa());
      }}
    />
  );
}
