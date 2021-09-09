import { useTheme } from "@material-ui/core";
import React from "react";
import FcIconButton from "../../fc-button/fc-icon-button";
import AddIcon from "@material-ui/icons/Add";
export default function FcFormIconButtonAdd(props) {
  const theme = useTheme();
  const { onClick, disabled = false } = props;

  return (
    <FcIconButton
      color={theme.palette.secondary.main}
      onClick={onClick}
      disabled={disabled}
    >
      <AddIcon fontSize="large" />
    </FcIconButton>
  );
}
