import { Grid, Typography } from "@material-ui/core";

import FcFormClearButton from "components/fc-forms/fc-form-button/fc-form-clear-button-clear";

import FcSurface from "components/fc-surface/fc-surface";
import { useFormCategory } from "pages/category/hook/use-form-category";
import shallow from "zustand/shallow";
import FcFormButtonInsertCategory from "./button/fc-form-button-insert-category";
import FcFormButtonUpdateCategory from "./button/fc-form-button-update-category";

import FcTextFieldCategoryDescription from "./fc-text-field-category-description";

export default function FcFormCategory() {
  const { id, clearAllFields } = useFormCategory(
    (s) => ({
      id: s.id,
      clearAllFields: s.clearAllFields,
    }),
    shallow
  );

  const onClickClearButton = () => {
    clearAllFields();
  };
  return (
    <FcSurface>
      <Grid container item spacing={1}>
        <Typography variant="subtitle1" style={{ padding: 4 }}>
          Cadastrar Categoria
        </Typography>
        <Grid item xs={12}>
          <FcTextFieldCategoryDescription />
        </Grid>
        <Grid container item xs={12} lg={8}>
          <Grid item xs={6}>
            {id === 0 ? (
              <FcFormButtonInsertCategory />
            ) : (
              <FcFormButtonUpdateCategory />
            )}
          </Grid>
          <Grid item xs={6}>
            <FcFormClearButton onClick={onClickClearButton} />
          </Grid>
        </Grid>
      </Grid>
    </FcSurface>
  );
}
