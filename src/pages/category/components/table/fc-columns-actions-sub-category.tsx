import { Grid } from "@material-ui/core";

import ActionUpdateButon from "components/fc-datagrid/fc-column-actions-update-button";
import ActionDeleteButon from "components/fc-datagrid/fc-column-actions-delete-button";
import { SubCategoryResponseDTO } from "api/sub-category/dto";

import { useCategory, useFormSubCategory } from "pages/category/hook";
import { useSpin } from "@hooks/use-spin";
import { useContext } from "react";
import { ContextAlert } from "Context";
import { setCreatedAlert } from "@common/AlertFuncoes";

export default function FcColumnActionsSubCategory(props: {
  field: SubCategoryResponseDTO;
}) {
  const deleteSubCategory = useCategory(s => s.deleteSubCategory);
  const { setFormSubCategory } = useFormSubCategory();
  const { field } = props;

  const setSpin = useSpin(s => s.setSpin);
  const { setAlert } = useContext(ContextAlert);
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
          try {
            setSpin(true)
            const { status, message, internalMessage } = await deleteSubCategory(field.id);
            setAlert(setCreatedAlert(status, message, internalMessage));
          } catch (error: any) {
            setAlert(setCreatedAlert(error.status, error.detail, error.title));
          } finally {
            setSpin(false)
          }
        }}
        refreshTotal={false}
      />
    </Grid>
  );
}
