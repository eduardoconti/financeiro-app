import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ContextForm } from "../../../Context/FormContext";
import FcTextFieldDescription from "../fc-fields/fc-text-field-description";
import FcFormButtonInsertWallet from "./fc-form-button-insert-wallet";
import FcFormButtonClear from "../fc-form-button/fc-form-button-clear";
import { Grid, Box } from "@material-ui/core";
import FcFormButtonUpdateWallet from "./fc-form-button-update-wallet";
import { emptyFormularioCarteira } from "common";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
  },
}));

export default function FcFormWallet() {
  const { form, setForm } = useContext(ContextForm);
  const classes = useStyles();
  useEffect(() => {
    setForm(emptyFormularioCarteira);
  }, [setForm]);
  return (
    <Box className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FcTextFieldDescription value={form.descricao}/>
        </Grid>
        <Grid item xs={12} md={8} lg={8}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              {form.id === 0 ? (
                <FcFormButtonInsertWallet />
              ) : (
                <FcFormButtonUpdateWallet />
              )}
            </Grid>
            <Grid item xs={6}>
              <FcFormButtonClear />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
