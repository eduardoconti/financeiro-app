import React, { useContext } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import { Typography, useTheme } from "@material-ui/core";
import SpinCircular from "../fc-spin/fc-spin";
import { SpinContext } from "../../Context/SpinContext";

export default function FcCard(props) {
  const { onClick, description, value, children } = props;
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
        backgroundColor: theme.palette.background.paper01,
      }}
    >
      {ctxSpin.spin ? (
        <SpinCircular />
      ) : (
        <CardActionArea onClick={() => onClick()}>
          <CardContent style={{ margin: 0, padding: 0 }}>
            <Typography variant="h6" style={{ color: legendColor }}>
              {description}
            </Typography>

            <Typography
              variant="h5"
              style={{ color: theme.palette.primary.light }}
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
