import { Grid } from "@material-ui/core";

import { useCategory, useFormCategory } from "pages/category/hook";
import { CategoryResponseDTO } from "api/category/dto";
import ActionUpdateButon from "components/fc-datagrid/fc-column-actions-update-button";
import ActionDeleteButon from "components/fc-datagrid/fc-column-actions-delete-button";
export default function FcColumnActionsCategory(props: {
  field: CategoryResponseDTO;
}) {
  const { deleteCategory } = useCategory();
  const { dispatch, setInvalidFields } = useFormCategory();
  const { field } = props;

  return (
    <Grid>
      <ActionUpdateButon
        onClick={async () => {
          dispatch({
            type: "setCategoryId",
            categoryId: field.id,
          });
          dispatch({
            type: "setCategoryDescription",
            categoryDescription: field.descricao,
          });
          setInvalidFields();
        }}
      />
      <ActionDeleteButon
        onClick={async () => {
          await deleteCategory(field.id);
        }}
        refreshTotal={false}
      />
    </Grid>
  );
}
