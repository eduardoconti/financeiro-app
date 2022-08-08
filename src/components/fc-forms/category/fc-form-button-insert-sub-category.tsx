import { useContext } from "react";
import { ContextForm } from "../../../Context/FormContext";
import { ContextAlert } from "../../../Context/AlertContext";
import { setCreatedAlert } from "../../../common/AlertFuncoes";

import { emptyFormularioCategoria } from "../../../common/EmptyStates";

import FcFormIconButtonAdd from "../fc-form-button/fc-form-icon-button-add";
import { HttpStatus } from "common/enum";
import { CategoryContextType, ContextCategory } from "pages/category/context/category-context";
import { SubCategoryService } from "api/sub-category/service";
import { SubCategoryRequestDTO } from "api/sub-category/dto";

export default function FcFormButtonInsertSubCategory() {
  const { form, setForm } = useContext(ContextForm);
  const { setAlert } = useContext(ContextAlert);
  const { fetchCategories } = useContext(ContextCategory) as CategoryContextType;
  const service = new SubCategoryService();

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
        } = await service.insert(SubCategoryRequestDTO.build({
          description: form.subCategoryDescription,
          categoryId: form.categoriaId,
        }));

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
