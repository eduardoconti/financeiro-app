import { useContext } from "react";

import { SubCategoryResponseDTO } from "api/sub-category/dto";
import { MenuItem } from "@material-ui/core";
import {
  CategoryContextType,
  ContextCategory,
} from "pages/category/context/category-context";

import { FcTextField } from "./fc-text-field";

export default function FcSelectFieldSubCategory(props: any) {
  const { categories } = useContext(ContextCategory) as CategoryContextType;
  const { value, onChange, categoryId } = props;

  const Menu = () => {
    const categoria = categories.find((c) => c.id === categoryId);
    return categoria?.subCategories.map(
      (obj: SubCategoryResponseDTO, i: number) => {
        return (
          <MenuItem key={i} value={obj.id}>
            {obj.description}
          </MenuItem>
        );
      }
    );
  };
  return (
    <FcTextField
      id="subCategoryId"
      label="Sub Categoria"
      value={value ?? " "}
      select
      onChange={(event) => {
        onChange(event);
      }}
    >
      {Menu()}
    </FcTextField>
  );
}
