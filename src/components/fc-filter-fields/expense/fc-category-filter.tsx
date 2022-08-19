import { FcTextField } from "@components/fc-forms/fc-fields";
import { useCategory } from "@pages/category/hook";
import { isAuthenticated, retornaCategorias } from "common";
import Menu from "components/fc-forms/fc-menu-tem/fc-menu-item";
import SpinCircular from "components/fc-spin/fc-spin";
import { ContextExpenseFilter, ExpenseFilterContextType } from "Context";
import { useContext, useEffect, useState } from "react";

export default function FcCategoryFilter() {
  const { filter, setFilter } = useContext(
    ContextExpenseFilter
  ) as ExpenseFilterContextType;
  const [cat, setCategories] = useState([]);
  const { categories } = useCategory();

  useEffect(() => {
    async function fetchData() {
      categories.unshift({ id: 0, descricao: "Todas", subCategories: [] });
      setCategories(categories as []);
    }
    fetchData();
  }, [categories]);

  return (
    <FcTextField
      id={"fc-category-filter"}
      label={"Categoria"}
      value={filter?.categoryId ?? 0}
      select
      onChange={(event) => {
        setFilter({ ...filter, categoryId: parseInt(event.target.value) });
      }}
    >
      {Menu(cat)}
    </FcTextField>
  );
}
