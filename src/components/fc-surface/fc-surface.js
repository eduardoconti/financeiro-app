import React from "react";
import { useTheme, Box } from "@material-ui/core";

export default function FcSurface(props) {
  const theme = useTheme();
  const { children } = props;
  return (
    <Box
      style={{
        backgroundColor: theme.palette.background.paper01,
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(1),
      }}
    >
      {children}
    </Box>
  );
}
