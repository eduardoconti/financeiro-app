import { useContext } from "react";
import { ContextForm } from "../../../Context/FormContext";
import { ContextAlert } from "../../../Context/AlertContext";
import { setCreatedAlert } from "../../../common/AlertFuncoes";
import {
  alteraCategoria,
  retornaCategorias,
} from "../../../common/CategoriaFuncoes";
import FcFormIconButtonUpdate from "../fc-form-button/fc-form-icon-button-update";
import { emptyFormularioCategoria } from "common";
import { ContextDataGrid } from "Context";
export default function FcFormButtonUpdateCategory() {
  const { form, setForm } = useContext(ContextForm);
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
          title,
          detail,
        } = await alteraCategoria(form);

        ctxAlert.setAlert(
          setCreatedAlert(status, message ?? detail, internalMessage ?? title)
        );
        setForm(emptyFormularioCategoria);
        setRows(await retornaCategorias());
      }}
    />
  );
}
