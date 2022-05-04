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
  const { form, setForm } = useContext(ContextForm);
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
        } = await insereCarteira(form);

        ctxAlert.setAlert(
          setCreatedAlert(status, message ?? detail, internalMessage ?? title)
        );

        setForm(emptyFormularioCarteira);
        const { data } = await retornaCarteiras();
        ctxDataGrid.setRows(data);
      }}
    />
  );
}
