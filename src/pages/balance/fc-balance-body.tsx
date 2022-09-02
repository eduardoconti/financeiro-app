import { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { retornaReceitasAgrupadasPorCarteira } from "../../common/ReceitaFuncoes";
import { retornaDespesasAgrupadasPorCarteira } from "../../common/DepesaFuncoes";
import {
  retornaValoresTransferenciasOrigem,
  retornaValoresTransferenciasDestino,
} from "../../common/TransferenciaFuncoes";

import { useSpin } from "@hooks/use-spin";
import { isAuthenticated } from "common";
import { FcCardWalletBalance } from "@components/fc-dash";
import { useCurrentTime } from "@hooks/use-current-time";
import { WalletResponseDTO } from "@api/wallet/dto";
import { EarningResponseDTO } from "@api/earning/dto";
import { ExpenseResponseDTO } from "@api/expense/dto";
import { TransferenceResponseDTO } from "@api/transference/dto";
import { WalletService } from "@api/wallet/service";

async function RetornaCards(ano: number, mes: number) {
  let object = await retornaDadosParaCard(ano, mes);

  return object?.map((obj, i) => {
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
function retornaDados(obj: any): any {
  if (typeof obj === "undefined") {
    return { valor: 0 };
  } else return obj;
}
async function retornaDadosParaCard(ano: number, mes: number) {
  try {
    const walletService = new WalletService()
    const { data: carteiras } = await walletService.getAll();
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
    const dadosCard: any[] = [];

    carteiras.forEach((carteira: WalletResponseDTO) => {
      let { valor: receita } = retornaDados(
        receitas.find((receita: EarningResponseDTO) => receita.id === carteira.id)
      );
      let { valor: despesa } = retornaDados(
        despesas.find((despesa: ExpenseResponseDTO) => despesa.id === carteira.id)
      );
      let { valor: transferenciaSaida } = retornaDados(
        transferenciasOrigem.find(
          (transferencia: TransferenceResponseDTO) => transferencia.id === carteira.id
        )
      );
      let { valor: transferenciaEntrada } = retornaDados(
        transferenciasDestino.find(
          (transferencia: TransferenceResponseDTO) => transferencia.id === carteira.id
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
  const [cards, setCards] = useState<any[] | undefined>([]);
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
