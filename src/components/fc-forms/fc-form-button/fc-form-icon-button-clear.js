import { useTheme } from "@material-ui/core";
import React from "react";
import FcIconButton from "../../fc-button/fc-icon-button";
import ClearIcon from "@material-ui/icons/Clear";
export default function FcFormIconButtonClear(props) {
  const theme = useTheme();
  const { onClick, description, disabled = false } = props;

  return (
    <FcIconButton
      color={theme.palette.primary.main}
      onClick={onClick}
      description={description}
      disabled={disabled}
    >
      <ClearIcon fontSize="large" />
    </FcIconButton>
  );
}
