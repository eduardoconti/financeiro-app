import React, { useContext } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import { Typography, useTheme } from "@material-ui/core";
import SpinCircular from "../fc-spin/fc-spin";
import { SpinContext } from "../../Context/SpinContext";

export default function FcCard(props) {
  const { onClick, description, value, children } = props;
  let{ legendColor } = props;
  const theme = useTheme();
  const ctxSpin = useContext(SpinContext) ;

  if(!legendColor){
   legendColor = theme.palette.common.white 
  }
  return (
    <Card
      className="Card"
      variant="outlined"
      style={{ backgroundColor: theme.palette.grey[900] }}
    >
      
        {ctxSpin.spin ? (
          <SpinCircular />
        ) : (
          <CardActionArea onClick={() => onClick()}>
          <CardContent style={{ margin: 0, padding: 0 }}>
            <Typography
              variant="h6"
              style={{ color: legendColor, paddingTop: 5 }}
            >
              {description}
            </Typography>
            <Typography
              variant="h5"
              style={{ color: theme.palette.common.white }}
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
