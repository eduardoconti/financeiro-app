import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
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
    container:{
      backgroundColor: theme.palette.background.paper01,
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(1),
    }
  }));

export default function FcFormControl(props) {
  const { children } = props;
  const classes = useStyles();

  return (
    <FormControl className={classes.form} noValidate autoComplete="off">
      {children}
    </FormControl>
  );
}
