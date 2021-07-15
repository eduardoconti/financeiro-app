import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import CardSaldo from "./CardSaldoCarteira";
import { retornaReceitasAgrupadasPorCarteira } from "../common/ReceitaFuncoes";
import { retornaDespesasAgrupadasPorCarteira } from "../common/DepesaFuncoes";
import { retornaCarteiras } from "../common/CarteiraFuncoes";
import {
  retornaValoresTransferenciasOrigem,
  retornaValoresTransferenciasDestino,
} from "../common/TransferenciaFuncoes";

async function RetornaCards() {
  let object = await retornaDadosParaCard();

  return object.map((obj, i) => {
    return (
      <Grid item xs={6} md={3} key={i}>
        <CardSaldo
          valor={obj.valor}
          descricao={obj.descricao}
          cor="#3EA99F"
        ></CardSaldo>
      </Grid>
    );
  });
}
function retornaDados(obj) {
  if (typeof obj === "undefined") {
    return { valor: 0 };
  } else return obj;
}
async function retornaDadosParaCard() {
  try {
    const carteiras = await retornaCarteiras();
    const { data: despesas } = await retornaDespesasAgrupadasPorCarteira(
      0,
      0,
      true
    );
    const { data: receitas } = await retornaReceitasAgrupadasPorCarteira(
      0,
      0,
      true
    );
    const {
      data: transferenciasOrigem,
    } = await retornaValoresTransferenciasOrigem(0, 0);
    const {
      data: transferenciasDestino,
    } = await retornaValoresTransferenciasDestino(0, 0);
    const dadosCard = [];

    carteiras.forEach((carteira, i) => {
      let { valor: receita } = retornaDados(
        receitas.find((receita) => receita.id === carteira.id)
      );
      let { valor: despesa } = retornaDados(
        despesas.find((despesa) => despesa.id === carteira.id)
      );
      let { valor: transferenciaSaida } = retornaDados(
        transferenciasOrigem.find(
          (transferencia) => transferencia.id === carteira.id
        )
      );
      let { valor: transferenciaEntrada } = retornaDados(
        transferenciasDestino.find(
          (transferencia) => transferencia.id === carteira.id
        )
      );
      let valor =
        receita + transferenciaEntrada - (despesa + transferenciaSaida);

      if (Math.abs(valor.toFixed(2)) > 0.05) {
        dadosCard.push({
          descricao: carteira.descricao,
          valor: valor,
        });
      }
    });

    return await dadosCard;
  } catch (error) {
    console.log(error);
  }
}

export default function CorpoSaldo() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    RetornaCards().then((cards) => {
      setCards(cards);
    });
  }, []);

  return (
    <Grid container direction="row" spacing={1}>
      {cards}
    </Grid>
  );
}
