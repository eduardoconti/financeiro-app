import { Grid, Typography } from "@material-ui/core";
import FcSelectFieldCategory from "components/fc-forms/fc-fields/fc-select-field-category";
import FcFormClearButton from "components/fc-forms/fc-form-button/fc-form-clear-button-clear";

import FcSurface from "components/fc-surface/fc-surface";
import { useFormSubCategory } from "pages/category/hook";
import { useMemo } from "react";
import FcFormButtonInsertSubCategory from "./button/fc-form-button-insert-sub-category";
import FcFormButtonUpdateSubCategory from "./button/fc-form-button-update-sub-category";
import FcTextFieldSubCategoryDescription from "./fc-text-field-sub-category-description";

export default function FcFormSubCategory() {
  const {
    clearAllFields,
    formSubCategory,
    setFormSubCategory,
  } = useFormSubCategory();

  const selectCategory = useMemo(() => {
    const onChangeSelectField = (event: any) => {
      setFormSubCategory({
        ...formSubCategory,
        categoryId: event.target.value,
      });
    };

    return (<Grid item xs={12}>
      <FcSelectFieldCategory
        onChange={(event: any) => onChangeSelectField(event)}
        value={formSubCategory.categoryId}
      />
    </Grid>)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return useMemo(() => {
    const onClickClearButton = () => {
      clearAllFields();
    };
    return (
      <FcSurface>
        <Grid container spacing={1}>
          <Typography variant="subtitle1" style={{ padding: 4 }}>
            Cadastrar Sub Categoria
          </Typography>
          {selectCategory}
          <Grid item xs={12}>
            <FcTextFieldSubCategoryDescription />
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              {formSubCategory.subCategoryId === 0 ? (
                <FcFormButtonInsertSubCategory />
              ) : (
                <FcFormButtonUpdateSubCategory />
              )}
            </Grid>
            <Grid item xs={6}>
              <FcFormClearButton onClick={onClickClearButton} />
            </Grid>
          </Grid>
        </Grid>
      </FcSurface>
    )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formSubCategory.subCategoryId]);
}
