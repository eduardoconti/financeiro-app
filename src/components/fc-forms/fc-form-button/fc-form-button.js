import React from "react";
import { makeStyles } from "@material-ui/core";
import FcButton from "../../fc-button/fc-button";
const useStyles = makeStyles((theme) => ({
  botao: {
    background:
      theme.palette.type === "dark"
        ? theme.palette.primary.dark
        : theme.palette.primary.light,
    height: 36,
    width: 100,
    color: theme.palette.text.primary,
    "&:hover": {
      background: theme.palette.primary.main,
      boxShadow:
        "inset 2px 2px 1px 1px rgba(0, 0, 0, 0.1), 1px 1px 1px 1px rgba(0, 0, 0, 0.2)",
    },
  },
}));

export default function FcFormButton(props) {
  const classes = useStyles();
  const { description = "", onClick = () => {} } = props;
  return (
    <FcButton
      className={classes.botao}
      description={description}
      onClick={onClick}
    ></FcButton>
  );
}
