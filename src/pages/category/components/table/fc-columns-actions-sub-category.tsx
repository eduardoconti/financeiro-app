import { Grid } from "@material-ui/core";

import ActionUpdateButon from "components/fc-datagrid/fc-column-actions-update-button";
import ActionDeleteButon from "components/fc-datagrid/fc-column-actions-delete-button";
import { SubCategoryResponseDTO } from "api/sub-category/dto";

import { useCategory, useFormSubCategory } from "pages/category/hook";

export default function FcColumnActionsSubCategory(props: {
  field: SubCategoryResponseDTO;
}) {
  const { deleteSubCategory } = useCategory();
  const { setFormSubCategory } = useFormSubCategory();
  const { field } = props;

  return (
    <Grid>
      <ActionUpdateButon
        onClick={async () => {
          setFormSubCategory({
            categoryId: field.categoryId,
            subCategoryDescription: field.description,
            subCategoryId: field.id,
          });
        }}
      />
      <ActionDeleteButon
        onClick={async () => {
          await deleteSubCategory(field.id);
        }}
        refreshTotal={false}
      />
    </Grid>
  );
}
