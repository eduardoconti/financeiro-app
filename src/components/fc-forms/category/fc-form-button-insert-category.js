import React, { useContext } from "react";
import { ContextForm } from "../../../Context/FormContext";
import { ContextAlert } from "../../../Context/AlertContext";
import { setCreatedAlert } from "../../../common/AlertFuncoes";
import {
  insereCategoria,
  retornaCategorias,
} from "../../../common/CategoriaFuncoes";
import { emptyFormularioCategoria } from "../../../common/EmptyStates";
import { ContextDataGrid } from "../../../Context/DataGridContext";
import FcFormIconButtonAdd from "../fc-form-button/fc-form-icon-button-add";

export default function FcFormButtonInsertCategory() {
  const ctxForm = useContext(ContextForm);
  const ctxAlert = useContext(ContextAlert);
  const ctxDataGrid = useContext(ContextDataGrid);

  return (
    <FcFormIconButtonAdd
      description="cadastrar"
      onClick={async () => {
        const {
          status,
          message,
          internalMessage,
          title,
          detail,
        } = await insereCategoria(ctxForm.form);

        ctxAlert.setAlert(
          setCreatedAlert(status, message ?? detail, internalMessage ?? title)
        );
        if (status === 201) {
          ctxForm.setForm(emptyFormularioCategoria);
          ctxDataGrid.setRows(await retornaCategorias());
        }
      }}
    />
  );
}
