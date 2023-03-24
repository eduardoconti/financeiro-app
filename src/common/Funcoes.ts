import { retornaTotalDespesas } from "./DepesaFuncoes";
import { retornaTotalReceitas } from "./ReceitaFuncoes";

import { emptyTotais } from "./EmptyStates";
import { CheckedValues } from "@hooks/use-dash-values";

async function calculaTotais(
  stateCheckedDespesas: CheckedValues,
  stateCheckedReceitas: CheckedValues,
  stateAnoAtual: number,
  stateMesAtual: number
): Promise<{
  totalDespesas: number;
  totalReceitas: number;
  saldo: number;
  balanco: number;
}> {
  try {
  const [{ data: totalDespesas }, { data: totalGeralDespesas }, { data: totalReceitas },  { data: totalGeralReceitas } ] =  await Promise.all([retornaTotalDespesas(
      stateAnoAtual,
      stateMesAtual
    ),
retornaTotalDespesas(),
retornaTotalReceitas(
      stateAnoAtual,
      stateMesAtual
    ),
retornaTotalReceitas()
])

    let expenseValues = 0;
    if (stateCheckedDespesas.payed && stateCheckedDespesas.open) {
      expenseValues = parseInt(totalDespesas.total ?? 0);
    } else if (stateCheckedDespesas.payed) {
      expenseValues = parseInt(totalDespesas.totalPayed ?? 0);
    } else {
      expenseValues = parseInt(totalDespesas.totalOpen ?? 0);
    }

    let earningValues = 0;
    if (stateCheckedReceitas.payed && stateCheckedReceitas.open) {
      earningValues = parseInt(totalReceitas.total ?? 0);
    } else if (stateCheckedReceitas.payed) {
      earningValues = parseInt(totalReceitas.totalPayed ?? 0);
    } else {
      earningValues = parseInt(totalReceitas.totalOpen ?? 0);
    }

    return {
      totalDespesas: expenseValues,
      totalReceitas: earningValues,
      saldo: totalGeralReceitas.totalPayed - totalGeralDespesas.totalPayed,
      balanco: totalReceitas.total - totalDespesas.total,
    };
  } catch (error) {
    return emptyTotais;
  }
}

export { calculaTotais };
