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
import { isAuthenticated } from "common";

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
    const { data: carteiras } = await retornaCarteiras();
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
    } = await retornaValoresTransferenciasOrigem(undefined, undefined, true);
    const {
      data: transferenciasDestino,
    } = await retornaValoresTransferenciasDestino(undefined, undefined, true);
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
        parseInt(receita) +
        parseInt(transferenciaEntrada) -
        (parseInt(despesa) + parseInt(transferenciaSaida));

      if (valor !== 0) {
        dadosCard.push({
          descricao: carteira.descricao,
          valor: valor,
        });
      }
    });

    return await dadosCard;
  } catch (error) {}
}

export default function CorpoSaldo() {
  const [cards, setCards] = useState([]);
  const { setSpin } = useContext(SpinContext);

  useEffect(() => {
    async function set() {
      setSpin(true);
      setCards(await RetornaCards());
      setSpin(false);
    }

    if (isAuthenticated()) {
      set();
    }
  }, [setSpin]);

  return (
    <Grid container direction="row" spacing={1}>
      {cards}
    </Grid>
  );
}
