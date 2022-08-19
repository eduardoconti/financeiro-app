import { useTheme } from "@material-ui/core";
import React from "react";
import FcIconButton from "../../fc-button/fc-icon-button";
import UpdateIcon from "@material-ui/icons/Update";
export default function FcFormIconButtonUpdate(props: any) {
  const theme = useTheme();
  const { onClick, disabled = false, ...rest } = props;

  return (
    <FcIconButton
      color={disabled ? theme.palette.grey[600] : theme.palette.success.main}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      <UpdateIcon fontSize="large" />
    </FcIconButton>
  );
}
