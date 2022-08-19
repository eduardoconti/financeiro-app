import { SubCategoryResponseDTO } from "api/sub-category/dto";
import { MenuItem } from "@material-ui/core";

import { FcTextField, FcTextFieldProps } from "./fc-text-field";
import { useCategory } from "@pages/category/hook";

export default function FcSelectFieldSubCategory(
  props: Partial<FcTextFieldProps> & { categoryId: number }
) {
  const { categories } = useCategory();
  const { categoryId, ...rest } = props;

  const Menu = () => {
    const categoria = categories.find((c) => c.id === categoryId)

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
    <FcTextField id="subCategoryId" label="Sub Categoria" select {...rest}>
      {Menu()}
    </FcTextField>
  );
}
