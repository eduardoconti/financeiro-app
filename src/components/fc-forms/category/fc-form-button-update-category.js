import React, { useContext } from "react";
import { ContextForm } from "../../../Context/FormContext";
import { ContextAlert } from "../../../Context/AlertContext";
import { setCreatedAlert } from "../../../common/AlertFuncoes";
import { alteraCategoria } from "../../../common/CategoriaFuncoes";
import FcFormIconButtonUpdate from "../fc-form-button/fc-form-icon-button-update";
export default function FcFormButtonUpdateCategory() {
  const ctxForm = useContext(ContextForm);
  const ctxAlert = useContext(ContextAlert);

  return (
    <FcFormIconButtonUpdate
      description="alterar"
      onClick={async () => {

        const { status, ...response} = await alteraCategoria(ctxForm.form);
        if(status === 200){
          ctxAlert.setAlert(
            setCreatedAlert(
              status,
              response.message,
              response.internalMessage
            )
          );
        }else {
          ctxAlert.setAlert(
            setCreatedAlert(
              status,
              response.title,
              response.detail
            )
          );
        }
        
      }}
    />
  );
}
