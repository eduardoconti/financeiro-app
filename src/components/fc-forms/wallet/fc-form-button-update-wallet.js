import { useContext } from "react";
import { ContextForm } from "../../../Context/FormContext";
import { ContextAlert } from "../../../Context/AlertContext";
import { setCreatedAlert } from "../../../common/AlertFuncoes";
import {
  alteraCarteira,
  retornaCarteiras,
} from "../../../common/CarteiraFuncoes";
import FcFormIconButtonUpdate from "../fc-form-button/fc-form-icon-button-update";
import { ContextDataGrid } from "Context";
export default function FcFormButtonUpdateWallet() {
  const ctxForm = useContext(ContextForm);
  const ctxAlert = useContext(ContextAlert);
  const { setRows } = useContext(ContextDataGrid);

  return (
    <FcFormIconButtonUpdate
      description="alterar"
      onClick={async () => {
        const {
          status,
          message,
          internalMessage,
          detail,
          title,
          invalidFields,
        } = await alteraCarteira(ctxForm.form);

        ctxAlert.setAlert(
          setCreatedAlert(
            status,
            message ?? title + " Reason: " + JSON.stringify(invalidFields),
            internalMessage ?? detail
          )
        );

        const { data } = await retornaCarteiras();
        setRows(data);
      }}
    />
  );
}
