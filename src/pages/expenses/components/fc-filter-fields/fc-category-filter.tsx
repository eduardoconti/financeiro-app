import { CategoryResponseDTO } from "@api/category/dto";
import { FcSelectMultiple } from "@components/fc-forms/fc-fields/fc-select-multiple";
import { useCategory } from "@pages/category/hook";
import { useExpenseFilter } from "@pages/expenses/hook";
import shallow from "zustand/shallow";

export function FcCategoryFilter() {
  const { categories } = useCategory();
  const { setCategoryId, categoryId } = useExpenseFilter(
    (s) => ({
      categoryId: s.categoryId,
      setCategoryId: s.setCategoryId,
    }),
    shallow
  );

  const onChange = (_: any, value: CategoryResponseDTO[]) => {
    setCategoryId(
      value.map((element) => {
        return element.id;
      })
    );
  };
  const defaultValue = categories.filter((c) => categoryId?.includes(c.id));
  return (
    <FcSelectMultiple
      options={categories}
      placeHolder="Categoria"
      label={"Categoria"}
      defaultValue={defaultValue}
      getOptionLabel={(option: any) => option.descricao}
      onChange={onChange}
    />
  );
}
