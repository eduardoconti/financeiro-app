import React, { useContext } from "react";
import { ContextForm } from "../../../Context/FormContext";
import { ContextAlert } from "../../../Context/AlertContext";
import { getUserIdFromToken } from "../../../common/Auth";
import { setCreatedAlert } from "../../../common/AlertFuncoes";
import { alteraCarteira } from "../../../common/CarteiraFuncoes";
import FcFormIconButtonUpdate from "../fc-form-button/fc-form-icon-button-update";
export default function FcFormButtonUpdateWallet() {
  const ctxForm = useContext(ContextForm);
  const ctxAlert = useContext(ContextAlert);

  return (
    <FcFormIconButtonUpdate
      description="alterar"
      onClick={async () => {
        let response;
        ctxForm.form.userId = getUserIdFromToken();

        response = await alteraCarteira(ctxForm.form);

        ctxAlert.setAlert(
          setCreatedAlert(
            response.status,
            response.message,
            response.internalMessage
          )
        );
      }}
    />
  );
}
