import React, { useContext } from "react";
import FcFormButton from "../fc-form-button/fc-form-button";
import { ContextForm } from "../../../Context/FormContext";
import { ContextAlert } from "../../../Context/AlertContext";
import { getUserIdFromToken } from "../../../common/Auth";
import { setCreatedAlert } from "../../../common/AlertFuncoes";
import {
  insereCarteira,
  retornaCarteiras,
} from "../../../common/CarteiraFuncoes";
import { emptyFormularioCarteira } from "../../../common/EmptyStates";
import { ContextDataGrid } from "../../../Context/DataGridContext";

export default function FcFormButtonInsertCategory() {
  const ctxForm = useContext(ContextForm);
  const ctxAlert = useContext(ContextAlert);
  const ctxDataGrid = useContext(ContextDataGrid);

  return (
    <FcFormButton
      description="cadastrar"
      onClick={async () => {
        let response;
        ctxForm.form.user = getUserIdFromToken();

        response = await insereCarteira(ctxForm.form);

        ctxAlert.setAlert(
          setCreatedAlert(
            response.statusCode,
            response.message,
            response.internalMessage
          )
        );

        ctxForm.setForm(emptyFormularioCarteira);
        ctxDataGrid.setRows(await retornaCarteiras());
      }}
    />
  );
}
