import Menu from "../fc-menu-tem/fc-menu-item";
import { FcTextField, FcTextFieldProps } from "./fc-text-field";
import { useCategory } from "@pages/category/hook";
export default function FcSelectFieldCategory(
  props: Partial<FcTextFieldProps>
) {
  const { categories } = useCategory();

  return (
    <FcTextField id="select-field-category" label="Categoria" select {...props}>
      {Menu(categories)}
    </FcTextField>
  );
}
