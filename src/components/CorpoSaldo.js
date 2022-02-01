import React, { useState, useEffect, useContext } from "react";
import { Grid } from "@material-ui/core";
import { retornaReceitasAgrupadasPorCarteira } from "../common/ReceitaFuncoes";
import { retornaDespesasAgrupadasPorCarteira } from "../common/DepesaFuncoes";
import { retornaCarteiras } from "../common/CarteiraFuncoes";
import {
  retornaValoresTransferenciasOrigem,
  retornaValoresTransferenciasDestino,
} from "../common/TransferenciaFuncoes";
import FcCardWalletBalance from "./fc-cards/fc-card-wallet-balance";
import { SpinContext } from "../Context/SpinContext";

async function RetornaCards() {
  let object = await retornaDadosParaCard();

  return object.map((obj, i) => {
    return (
      <Grid item xs={6} md={3} key={i}>
        <FcCardWalletBalance
          value={obj.valor}
          description={obj.descricao}
        ></FcCardWalletBalance>
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
      undefined,
      undefined,
      true
    );
    const { data: receitas } = await retornaReceitasAgrupadasPorCarteira(
      undefined,
      undefined,
      true
    );
    const {
      data: transferenciasOrigem,
    } = await retornaValoresTransferenciasOrigem(0, 0, true);
    const {
      data: transferenciasDestino,
    } = await retornaValoresTransferenciasDestino(0, 0, true);
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
  const ctxSpin = useContext(SpinContext);

  useEffect(() => {
    set();

    async function set() {
      ctxSpin.setSpin(true);
      setCards(await RetornaCards());
      ctxSpin.setSpin(false);
    } // eslint-disable-next-line
  }, []);

  return (
    <Grid container direction="row" spacing={1}>
      {cards}
    </Grid>
  );
}
