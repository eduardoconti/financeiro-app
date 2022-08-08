import { useContext } from "react";
import { Grid } from "@material-ui/core";
import ActionUpdateButon from "../fc-column-actions-update-button";
import ActionDeleteButon from "../fc-column-actions-delete-button";
import { ContextForm } from "../../../Context/FormContext";
import {
  deletaCategoria,
} from "../../../common/CategoriaFuncoes";

import { ContextCategory } from "pages/category/context/category-context";
export default function FcColumnActionsCategory(props) {

  const { setForm, form } = useContext(ContextForm);
  const { fetchCategories } = useContext(ContextCategory);
  const { field } = props;

  return (
    <Grid>
      <ActionUpdateButon
        onClick={async () => {
          setForm({ ...form, ...field });
        }}
      />
      <ActionDeleteButon
        onClick={async () => {
          const response = await deletaCategoria(field.id);
          await fetchCategories();
          return response;
        }}
        refreshTotal={false}
      />
    </Grid>
  );
}
