import { useTheme } from "@material-ui/core";
import React from "react";
import ArrowForwardIosTwoToneIcon from "@material-ui/icons/ArrowForwardIosTwoTone";

import FcIconButton from "../../fc-button/fc-icon-button";
export default function FcFormIconButtonAddNextMonth(props) {
  const theme = useTheme();
  const { onClick, disabled = false } = props;

  return (
    <FcIconButton
      color={disabled ? theme.palette.grey[600] : theme.palette.secondary.main}
      onClick={onClick}
      disabled={disabled}
    >
      <ArrowForwardIosTwoToneIcon fontSize="large" />
    </FcIconButton>
  );
}
