import { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { retornaReceitasAgrupadasPorCarteira } from "../../common/ReceitaFuncoes";
import { retornaDespesasAgrupadasPorCarteira } from "../../common/DepesaFuncoes";
import { retornaCarteiras } from "../../common/CarteiraFuncoes";
import {
  retornaValoresTransferenciasOrigem,
  retornaValoresTransferenciasDestino,
} from "../../common/TransferenciaFuncoes";

import { useSpin } from "@hooks/use-spin";
import { isAuthenticated } from "common";
import { FcCardWalletBalance } from "@components/fc-dash";
import { useCurrentTime } from "@hooks/use-current-time";

async function RetornaCards(ano, mes) {
  let object = await retornaDadosParaCard(ano, mes);

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
async function retornaDadosParaCard(ano, mes) {
  try {
    const { data: carteiras } = await retornaCarteiras();
    const { data: despesas } = await retornaDespesasAgrupadasPorCarteira(
      ano,
      mes
    );
    const { data: receitas } = await retornaReceitasAgrupadasPorCarteira(
      ano,
      mes
    );
    const {
      data: transferenciasOrigem,
    } = await retornaValoresTransferenciasOrigem(ano, mes, undefined);
    const {
      data: transferenciasDestino,
    } = await retornaValoresTransferenciasDestino(ano, mes, undefined);
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
  } catch (error) { }
}

export default function CorpoBalanco() {
  const [cards, setCards] = useState([]);
  const setSpin = useSpin(s => s.setSpin);
  const { year, month } = useCurrentTime();
  useEffect(() => {
    if (isAuthenticated()) {
      set();
    }

    async function set() {
      setSpin(true);
      setCards(
        await RetornaCards(year, month)
      );
      setSpin(false);
    }
  }, [month, setSpin, year]);

  return (
    <Grid container direction="row" spacing={1}>
      {cards}
    </Grid>
  );
}
