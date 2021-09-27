import React, { useContext } from "react";
import { ContextForm } from "../../../Context/FormContext";
import { ContextAlert } from "../../../Context/AlertContext";
import { getUserIdFromToken } from "../../../common/Auth";
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
        let response;
        ctxForm.form.user = getUserIdFromToken();

        response = await insereCategoria(ctxForm.form);

        ctxAlert.setAlert(
          setCreatedAlert(
            response.statusCode,
            response.message,
            response.internalMessage
          )
        );

        ctxForm.setForm(emptyFormularioCategoria);
        ctxDataGrid.setRows(await retornaCategorias());
      }}
    />
  );
}
