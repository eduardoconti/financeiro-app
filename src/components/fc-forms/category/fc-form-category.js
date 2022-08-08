import { useContext, useEffect } from "react";
import { ContextForm } from "../../../Context/FormContext";
import FcTextFieldDescription from "../fc-fields/fc-text-field-description";
import FcFormButtonInsertCategory from "./fc-form-button-insert-category";
import FcFormButtonClear from "../fc-form-button/fc-form-button-clear";
import { Grid } from "@material-ui/core";
import FcFormButtonUpdateCategory from "./fc-form-button-update-category";
import FcSurface from "../../fc-surface/fc-surface";
import { emptyFormularioCategoria } from "common";
import FcSelectFieldCategory from "../fc-fields/fc-select-field-category";
import FcFormButtonInsertSubCategory from "./fc-form-button-insert-sub-category";
import FcTextFieldSubCategoryDescription from "../fc-fields/fc-text-field-sub-category-description";

export default function FcFormCategory() {
  const { setForm, form } = useContext(ContextForm);
  useEffect(() => {
    setForm(emptyFormularioCategoria);
  }, [setForm]);

  return (
    <Grid >
      <FcSurface>
        Cadastrar Categoria
        <Grid container item spacing={1}>
          <Grid item xs={12}>
            <FcTextFieldDescription label={"Categoria"} value={form.descricao} />
          </Grid>
          <Grid container item xs={12} lg={8}>
            <Grid item xs={6}>
              {form.id === 0 ? (
                <FcFormButtonInsertCategory />
              ) : (
                <FcFormButtonUpdateCategory />
              )}
            </Grid>
            <Grid item xs={6}>
              <FcFormButtonClear />
            </Grid>
          </Grid>
        </Grid>

      </FcSurface>
      <FcSurface style={{marginTop: 8}} >

        Cadastrar Sub Categoria
        <Grid container item spacing={1}>
          <Grid item xs={12}>
            <FcSelectFieldCategory />
          </Grid>
          <Grid item xs={12}>
            <FcTextFieldSubCategoryDescription label={"Sub Categoria"} value={form.subCategoryDescription} />
          </Grid>
          <Grid container item xs={12} lg={8}>

            <Grid item xs={6}>
              {form.subCategoryId === 0 ? (
                <FcFormButtonInsertSubCategory />
              ) : (
                <FcFormButtonUpdateCategory />
              )}
            </Grid>
            <Grid item xs={6}>
              <FcFormButtonClear />
            </Grid>

          </Grid>
        </Grid>

      </FcSurface>
    </Grid>


  );
}
