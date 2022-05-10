import React, { useContext } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import { Typography, useTheme } from "@material-ui/core";
import { SpinContext } from "Context";
import SpinCircular from "components/fc-spin/fc-spin";

export default function FcCard(props: any) {
  const { onClick, color, value, description, children, ref } = props;
  let { legendColor } = props;
  const theme = useTheme();
  const ctxSpin = useContext(SpinContext);

  if (!legendColor) {
    legendColor = theme.palette.text.primary;
  }
  return (
    <Card
      variant="outlined"
      style={{
        textAlign: "center",
        height: "100%",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
        border: "none",
      }}
      ref={ref}
    >
      {ctxSpin.spin ? (
        <SpinCircular />
      ) : (
        <CardActionArea onClick={onClick}>
          <CardContent style={{ margin: 0, padding: theme.spacing(1) }}>
            <Typography variant="h6" style={{ color: legendColor }}>
              {description}
            </Typography>

            <Typography
              variant="h5"
              style={{ color: color ?? theme.palette.primary.light }}
            >
              {value.toFixed(2)}
            </Typography>
          </CardContent>
        </CardActionArea>
      )}
      {children}
    </Card>
  );
}
