import { useContext } from "react";
import Menu from "../fc-menu-tem/fc-menu-item";
import {
  CategoryContextType,
  ContextCategory,
} from "pages/category/context/category-context";
import { FcTextField } from "./fc-text-field";
export default function FcSelectFieldCategory(props: any) {
  const { categories } = useContext(ContextCategory) as CategoryContextType;
  const { value, onChange } = props;

  return (
    <FcTextField
      id="select-field-category"
      label="Categoria"
      value={value ?? " "}
      select
      onChange={(event) => {
        onChange(event);
      }}
    >
      {Menu(categories) as JSX.Element}
    </FcTextField>
  );
}
