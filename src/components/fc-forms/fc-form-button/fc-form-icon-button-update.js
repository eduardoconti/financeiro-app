import { useTheme } from "@material-ui/core";
import React from "react";
import FcIconButton from "../../fc-button/fc-icon-button";
import UpdateIcon from "@material-ui/icons/Update";
export default function FcFormIconButtonUpdate(props) {
  const theme = useTheme();
  const { onClick, disabled = false } = props;

  return (
    <FcIconButton
      color={disabled ? theme.palette.grey[600] : theme.palette.secondary.main}
      onClick={onClick}
      disabled={disabled}
    >
      <UpdateIcon fontSize="large" />
    </FcIconButton>
  );
}
