import React from "react";
import IconButton from "@material-ui/core/IconButton";
import { useTheme } from "@material-ui/core";
import CreateTwoToneIcon from "@material-ui/icons/CreateTwoTone";

export default function ActionUpdateButon(props) {
  const theme = useTheme();
  const { onClick } = props;
  return (
    <IconButton
      aria-label="alterar"
      style={{ color: theme.palette.primary.main, padding: 2 }}
      onClick={onClick}
    >
      <CreateTwoToneIcon />
    </IconButton>
  );
}
