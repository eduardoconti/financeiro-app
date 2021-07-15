import React from "react";
import FcCardWalletBalance from "./fc-cards/fc-card-wallet-balance";

export default function CardSaldo({ cor, descricao, valor }) {

  //let corValor = valor < 0 ? "red" : valor === 0 ? "black" : "#85f07b";
  return (<FcCardWalletBalance value={valor} description={descricao}/>  );
}
