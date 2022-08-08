import { useContext } from "react";
import { ContextForm } from "../../../Context/FormContext";
import { ContextAlert } from "../../../Context/AlertContext";
import { setCreatedAlert } from "../../../common/AlertFuncoes";
import {
  insereCategoria,
} from "../../../common/CategoriaFuncoes";
import { emptyFormularioCategoria } from "../../../common/EmptyStates";

import FcFormIconButtonAdd from "../fc-form-button/fc-form-icon-button-add";
import { HttpStatus } from "common/enum";
import { ContextCategory } from "pages/category/context/category-context";

export default function FcFormButtonInsertCategory() {
  const { form, setForm } = useContext(ContextForm);
  const { setAlert } = useContext(ContextAlert);
  const { fetchCategories } = useContext(ContextCategory);

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
        } = await insereCategoria(form);

        setAlert(
          setCreatedAlert(status, message ?? detail, internalMessage ?? title)
        );
        if (status === HttpStatus.CREATED) {
          setForm(emptyFormularioCategoria);
          fetchCategories();
        }
      }}
    />
  );
}
