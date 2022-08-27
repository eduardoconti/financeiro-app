import { FcTextField } from "@components/fc-forms/fc-fields";
import Menu from "@components/fc-forms/fc-menu-tem/fc-menu-item";
import { useCategory } from "@pages/category/hook";
import { useExpenseFilter } from "@pages/expenses/hook";
import { useMemo } from "react";
import shallow from "zustand/shallow";

export default function FcCategoryFilter() {

  const { categories } = useCategory();
  const { categoryId, setCategoryId } = useExpenseFilter(s => ({
    categoryId: s.categoryId,
    setCategoryId: s.setCategoryId
  }), shallow)

  const categoriesFilter = useMemo(() => {
    return [{ id: 0, descricao: "Todas", subCategories: [] }, ...categories]
  }, [categories])
  return (
    <FcTextField
      id={"fc-category-filter"}
      label={"Categoria"}
      value={categoryId ?? 0}
      select
      onChange={(event) => {
        setCategoryId(parseInt(event.target.value));
      }}
    >
      {Menu(categoriesFilter)}
    </FcTextField>
  );
}
