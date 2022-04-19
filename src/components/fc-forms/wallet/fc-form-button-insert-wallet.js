import React, { useContext } from "react";
import { ContextForm } from "../../../Context/FormContext";
import { ContextAlert } from "../../../Context/AlertContext";
import { setCreatedAlert } from "../../../common/AlertFuncoes";
import {
  insereCarteira,
  retornaCarteiras,
} from "../../../common/CarteiraFuncoes";
import { emptyFormularioCarteira } from "../../../common/EmptyStates";
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

        response = await insereCarteira(ctxForm.form);

        ctxAlert.setAlert(
          setCreatedAlert(
            response.status,
            response.message,
            response.internalMessage
          )
        );

        ctxForm.setForm(emptyFormularioCarteira);
        const { data } = await retornaCarteiras();
        ctxDataGrid.setRows(data);
      }}
    />
  );
}
