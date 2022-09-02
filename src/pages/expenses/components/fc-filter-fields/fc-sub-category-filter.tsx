import { CategoryResponseDTO } from "@api/category/dto";
import { SubCategoryResponseDTO } from "@api/sub-category/dto";
import { FcSelectMultiple } from "@components/fc-forms/fc-fields/fc-select-multiple";
import { useCategory } from "@pages/category/hook";
import { useExpenseFilter } from "@pages/expenses/hook";
import { useMemo } from "react";
import shallow from "zustand/shallow";

export function FcSubCategoryFilter() {

  const categories = useCategory(s => s.categories);
  const { setSubCategoryId, subCategoryId } = useExpenseFilter(s => (
    {
      setSubCategoryId: s.setSubCategoryId,
      subCategoryId: s.subCategoryId
    }
  ), shallow)

  const onChange = (_: any, value: SubCategoryResponseDTO[]) => {
    setSubCategoryId(value.map((element) => { return element.id }))
  }

  const categoryId = useExpenseFilter(s => s.categoryId)

  const options = useMemo(() => {
    const categoriesFiltered = categories.filter((element) => {
      return categoryId?.includes(element.id)
    })
    const subCategories = categoriesFiltered.reduce((acc: SubCategoryResponseDTO[], element: CategoryResponseDTO) => {
      const { subCategories } = element
      return [...acc, ...subCategories]
    }, [])

    return subCategories
  }, [categories, categoryId])

  const defaultValue = options.filter((element) => subCategoryId?.includes(element.id))
  return (
    <FcSelectMultiple
      options={options}
      placeHolder="Sub Categoria"
      label={"Sub Categoria"}
      defaultValue={defaultValue}
      getOptionLabel={(option: SubCategoryResponseDTO) => option.description}
      onChange={onChange}
    />
  );
}
