import React, { useContext } from "react";
import { ContextForm } from "../../../Context/FormContext";
import FcTextFieldDescription from "../fc-fields/fc-text-field-description";
import FcFormButtonInsertCategory from "./fc-form-button-insert-category";
import FcFormButtonClear from "../fc-form-button/fc-form-button-clear";
import { Grid } from "@material-ui/core";
import FcFormButtonUpdateCategory from "./fc-form-button-update-category";
import FcSurface from "../../fc-surface/fc-surface";

export default function FcFormCategory() {
  const ctxForm = useContext(ContextForm);

  return (
    <FcSurface>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FcTextFieldDescription />
        </Grid>
        <Grid item xs={12} lg={8}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              {ctxForm.form.id === 0 ? (
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
      </Grid>
    </FcSurface>
  );
}
