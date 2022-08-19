import { CategoryResponseDTO } from "@api/category/dto";
import { FcTextField } from "@components/fc-forms/fc-fields";
import Menu from "@components/fc-forms/fc-menu-tem/fc-menu-item";
import { useCategory } from "@pages/category/hook";
import { ContextExpenseFilter, ExpenseFilterContextType } from "Context";
import { useContext, useEffect, useState } from "react";

export default function FcCategoryFilter() {
  const { filter, setFilter } = useContext(
    ContextExpenseFilter
  ) as ExpenseFilterContextType;
  const [cat, setCategories] = useState<CategoryResponseDTO[]>([]);
  const { categories } = useCategory();

  useEffect(() => {
    async function fetchData() {
      const newCategories = [...categories];
      newCategories.unshift({ id: 0, descricao: "Todas", subCategories: [] });
      setCategories(newCategories);
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
