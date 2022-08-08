import { useContext } from "react";
import { Grid } from "@material-ui/core";

import { CategoryContextType, ContextCategory } from "pages/category/context/category-context";
import ActionUpdateButon from "components/fc-datagrid/fc-column-actions-update-button";
import ActionDeleteButon from "components/fc-datagrid/fc-column-actions-delete-button";
import { ContextForm } from "Context";
import { SubCategoryService } from "api/sub-category/service";
export default function FcColumnActionsSubCategory(props: any) {

  const { setForm, form } = useContext(ContextForm);
  const { fetchCategories } = useContext(ContextCategory) as CategoryContextType;
  const { field } = props;
  const service = new SubCategoryService();
  console.log(field);
  return (
    <Grid>
      <ActionUpdateButon
        onClick={async () => {
          setForm({...form, subCategoryId: field.id, subCategoryDescription: field.description });
        }}
      />
      <ActionDeleteButon
        onClick={async () => {
          const response = await service.delete(field.id);
          await fetchCategories();
          return response;
        }}
        refreshTotal={false}
      />
    </Grid>
  );
}
