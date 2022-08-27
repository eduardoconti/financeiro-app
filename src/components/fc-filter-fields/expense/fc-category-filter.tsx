import { CategoryResponseDTO } from "@api/category/dto";
import { FcTextField } from "@components/fc-forms/fc-fields";
import { FcSelectMultiple } from "@components/fc-forms/fc-fields/fc-select-multiple";
import Menu from "@components/fc-forms/fc-menu-tem/fc-menu-item";
import { useCategory } from "@pages/category/hook";
import { useExpenseFilter } from "@pages/expenses/hook";
import { useMemo } from "react";
import shallow from "zustand/shallow";

export default function FcCategoryFilter() {

  const { categories } = useCategory();
  const { setCategoryId } = useExpenseFilter(s => ({
    categoryId: s.categoryId,
    setCategoryId: s.setCategoryId
  }), shallow)

  const onChange = (_: any, value: CategoryResponseDTO[]) => {
    setCategoryId(value.map((element) => { return element.id }))
  }
  return (
    <FcSelectMultiple
      options={categories}
      placeHolder="categoria"
      getOptionLabel={(option: any) => option.descricao}
      onChange={onChange}
    />
  );
}
