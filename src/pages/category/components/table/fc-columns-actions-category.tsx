import { Grid } from "@material-ui/core";
import { useCategory, useFormCategory } from "pages/category/hook";
import { CategoryResponseDTO } from "api/category/dto";
import ActionUpdateButon from "components/fc-datagrid/fc-column-actions-update-button";
import ActionDeleteButon from "components/fc-datagrid/fc-column-actions-delete-button";
import { setCreatedAlert } from "@common/AlertFuncoes";
import { useSpin } from "@hooks/use-spin";
import { useContext } from "react";
import { ContextAlert } from "Context";
import shallow from "zustand/shallow";

export default function FcColumnActionsCategory(props: {
  field: CategoryResponseDTO;
}) {
  const deleteCategory = useCategory(s => s.deleteCategory);
  const { setId, setDescription } = useFormCategory((s) => ({
    setId: s.setId,
    setDescription: s.setDescription
  }), shallow)
  const { field } = props;
  const setSpin = useSpin(s => s.setSpin);
  const { setAlert } = useContext(ContextAlert);
  return (
    <Grid>
      <ActionUpdateButon
        onClick={async () => {
          setId(field.id)
          setDescription(field.descricao)
        }}
      />
      <ActionDeleteButon
        onClick={async () => {
          try {
            setSpin(true)
            const { status, message, internalMessage } = await deleteCategory(field.id);
            setAlert(setCreatedAlert(status, message, internalMessage));
          } catch (error: any) {
            setAlert(setCreatedAlert(error.status, error.detail, error.title));
          } finally {
            setSpin(false)
          }
        }}
      />
    </Grid>
  );
}
