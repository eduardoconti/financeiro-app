import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import { Grid } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  form: {
    "& > *": {
      margin: theme.spacing(1),
    },
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
  },
}));

export default function FcFormControl(props) {
  const { children } = props;
  const classes = useStyles();

  return (
    <Grid container item>
      <FormControl className={classes.form} noValidate autoComplete="off">
        {children}
      </FormControl>
    </Grid>
  );
}
