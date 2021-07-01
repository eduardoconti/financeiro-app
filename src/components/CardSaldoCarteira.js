import React from "react";
import { Card, Typography } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";

export default function CardSaldo({ cor, descricao, valor }) {

  let corValor = valor < 0 ? "red" : valor === 0 ? "black" : "#85f07b";
  return (
    <Card
      className="Card"
      variant="outlined"
      style={{ backgroundColor: "#f9fefb", alignItems: "center", height: 70 }}
    >
      <CardContent style={{ margin: 0, padding: 0 }}>
        <Typography variant="h6" style={{ color: cor, paddingTop: 5 }}>
          {descricao}
        </Typography>
        <Typography variant="h6" style={{ color: corValor }}>
          {valor.toFixed(2)}
        </Typography>
      </CardContent>
    </Card>
  );
}
