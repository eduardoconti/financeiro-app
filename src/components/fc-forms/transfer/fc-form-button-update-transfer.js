import React, { useContext } from "react";
import FcFormButton from "../fc-form-button/fc-form-button";
import { ContextForm } from "../../../Context/FormContext";
import { ContextAlert } from "../../../Context/AlertContext";
import { getUserIdFromToken } from "../../../common/Auth";
import { setCreatedAlert } from "../../../common/AlertFuncoes";
import { alteraTransferencia } from "../../../common/TransferenciaFuncoes";
export default function FcFormButtonUpdateTransfer() {
  const ctxForm = useContext(ContextForm);
  const ctxAlert = useContext(ContextAlert);

  return (
    <FcFormButton
      description="alterar"
      onClick={async () => {
        let response;
        ctxForm.form.user = getUserIdFromToken();

        response = await alteraTransferencia(ctxForm.form);

        ctxAlert.setAlert(
          setCreatedAlert(
            response.statusCode,
            response.message,
            response.internalMessage
          )
        );
      }}
    />
  );
}
