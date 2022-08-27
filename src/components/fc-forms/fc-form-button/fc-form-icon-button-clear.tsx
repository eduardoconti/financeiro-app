import { useTheme } from "@material-ui/core";
import React from "react";
import FcIconButton from "../../fc-button/fc-icon-button";
import ClearIcon from "@material-ui/icons/Clear";
export default function FcFormIconButtonClear(props: any) {
  const theme = useTheme();
  const { onClick, description, disabled, ...rest } = props;

  return (
    <FcIconButton
      color={theme.palette.primary.main}
      onClick={onClick}
      description={description}
      disabled={disabled}
      {...rest}
    >
      <ClearIcon fontSize="large" />
    </FcIconButton>
  );
}
