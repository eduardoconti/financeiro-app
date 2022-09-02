import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { retornaReceitasAgrupadasPorCarteira } from "../common/ReceitaFuncoes";
import { retornaDespesasAgrupadasPorCarteira } from "../common/DepesaFuncoes";
import {
  retornaValoresTransferenciasOrigem,
  retornaValoresTransferenciasDestino,
} from "../common/TransferenciaFuncoes";

import { isAuthenticated } from "common";
import { FcCardWalletBalance } from "./fc-dash";
import { useSpin } from "@hooks/use-spin";
import { WalletService } from "@api/wallet/service";

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
    const walletService = new WalletService()
    const { data: carteiras } = await walletService.getAll();
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

    return dadosCard;
  } catch (error) {}
}

export default function CorpoSaldo() {
  const [cards, setCards] = useState([]);
  const { setSpin } = useSpin();

  useEffect(() => {
    async function Set() {
      setSpin(true);
      setCards(await RetornaCards());
      setSpin(false);
    }

    if (isAuthenticated()) {
      Set();
    }
  }, [setSpin]);

  return (
    <Grid container direction="row" spacing={1}>
      {cards}
    </Grid>
  );
}
