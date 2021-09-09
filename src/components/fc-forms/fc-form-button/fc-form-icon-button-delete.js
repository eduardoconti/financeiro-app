import { useTheme } from "@material-ui/core";
import React from "react";
import FcIconButton from "../../fc-button/fc-icon-button";
import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";
export default function FcFormIconButtonDelete(props) {
  const theme = useTheme();
  const { onClick, disabled = false } = props;

  return (
    <FcIconButton
      color={disabled ? theme.palette.grey[600] : theme.palette.error.main}
      onClick={onClick}
      disabled={disabled}
    >
      <DeleteForeverTwoToneIcon fontSize="large" />
    </FcIconButton>
  );
}
