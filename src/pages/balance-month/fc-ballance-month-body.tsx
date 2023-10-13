import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { retornaReceitasAgrupadasPorCarteira } from "../../common/ReceitaFuncoes";
import { retornaDespesasAgrupadasPorCarteira } from "../../common/DepesaFuncoes";
import {
  retornaValoresTransferenciasOrigem,
  retornaValoresTransferenciasDestino,
} from "../../common/TransferenciaFuncoes";

import { isAuthenticated } from "common";
import { FcCardWalletBalance } from "../../components/fc-dash";
import { useSpin } from "@hooks/use-spin";
import { WalletService } from "@api/wallet/service";
import { WalletResponseDTO } from "@api/wallet/dto";
import { ExpenseResponseDTO } from "@api/expense/dto";
import { TransferenceResponseDTO } from "@api/transference/dto";

function montaCards(object: { descricao: string; valor: number }[]) {
  return object.map((obj: { descricao: string; valor: number }, i: number) => {
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
function retornaDados(obj: any) {
  if (typeof obj === "undefined") {
    return { valor: 0 };
  } else return obj;
}
async function retornaDadosParaCard(): Promise<
  { descricao: string; valor: number }[]
> {
  const dadosCard: { descricao: string; valor: number }[] = [];
  try {
    const walletService = new WalletService();

    const [
      { data: carteiras },
      { data: despesas },
      { data: receitas },
      { data: transferenciasOrigem },
      { data: transferenciasDestino },
    ] = await Promise.all([
      walletService.getAll(),
      retornaDespesasAgrupadasPorCarteira(undefined, undefined, true),
      retornaReceitasAgrupadasPorCarteira(undefined, undefined, true),
      retornaValoresTransferenciasOrigem(undefined, undefined, true),
      retornaValoresTransferenciasDestino(undefined, undefined, true),
    ]);

    carteiras.forEach((carteira, i) => {
      let { valor: receita } = retornaDados(
        receitas.find(
          (receita: WalletResponseDTO) => receita.id === carteira.id
        )
      );
      let { valor: despesa } = retornaDados(
        despesas.find(
          (despesa: ExpenseResponseDTO) => despesa.id === carteira.id
        )
      );
      let { valor: transferenciaSaida } = retornaDados(
        transferenciasOrigem.find(
          (transferencia: TransferenceResponseDTO) =>
            transferencia.id === carteira.id
        )
      );
      let { valor: transferenciaEntrada } = retornaDados(
        transferenciasDestino.find(
          (transferencia: TransferenceResponseDTO) =>
            transferencia.id === carteira.id
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
  } catch (error) {}

  return dadosCard;
}

export default function CorpoSaldo() {
  const [cards, setCards] = useState<{ descricao: string; valor: number }[]>(
    []
  );
  const { setSpin } = useSpin();

  useEffect(() => {
    async function Set() {
      setSpin(true);
      setCards(await retornaDadosParaCard());
      setSpin(false);
    }

    if (isAuthenticated()) {
      Set();
    }
  }, [setSpin]);

  return (
    <Grid container direction="row" spacing={1}>
      {montaCards(cards)}
    </Grid>
  );
}
