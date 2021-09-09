import React from "react";
import IconButton from "@material-ui/core/IconButton";

export default function FcIconButton(props) {
  const { color, onClick, children, description, disabled = false } = props;
  return (
    <IconButton
      aria-label={description}
      style={{ color: color, padding: 2 }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </IconButton>
  );
}
