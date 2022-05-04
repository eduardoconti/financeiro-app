import React, { useContext } from "react";
import { ContextForm } from "../../../Context/FormContext";
import { ContextAlert } from "../../../Context/AlertContext";
import { setCreatedAlert } from "../../../common/AlertFuncoes";
import { alteraCategoria } from "../../../common/CategoriaFuncoes";
import FcFormIconButtonUpdate from "../fc-form-button/fc-form-icon-button-update";
import { emptyFormularioCategoria } from "common";
export default function FcFormButtonUpdateCategory() {
  const { form, setForm } = useContext(ContextForm);
  const ctxAlert = useContext(ContextAlert);

  return (
    <FcFormIconButtonUpdate
      description="alterar"
      onClick={async () => {
        const {
          status,
          message,
          internalMessage,
          title,
          detail,
        } = await alteraCategoria(form);

        ctxAlert.setAlert(
          setCreatedAlert(status, message ?? detail, internalMessage ?? title)
        );
        setForm(emptyFormularioCategoria);
      }}
    />
  );
}
