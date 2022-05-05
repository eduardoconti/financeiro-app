import { retornaTotalDespesas } from "./DepesaFuncoes";
import { retornaTotalReceitas } from "./ReceitaFuncoes";

import { emptyTotais } from "./EmptyStates";

async function calculaTotais(
  stateCheckedDespesas = false,
  stateCheckedReceitas = false,
  stateAnoAtual = 0,
  stateMesAtual = 0
) {
  try {
    const { data: totalDespesas } = await retornaTotalDespesas(
      stateAnoAtual,
      stateMesAtual
    );

    const { data: totalGeralDespesas } = await retornaTotalDespesas();

    const { data: totalReceitas } = await retornaTotalReceitas(
      stateAnoAtual,
      stateMesAtual
    );

    const { data: totalGeralReceitas } = await retornaTotalReceitas();

    let expenseValues = 0;
    if (
      stateCheckedDespesas.checkedPago &&
      stateCheckedDespesas.checkedAberto
    ) {
      expenseValues = totalDespesas.total;
    } else if (stateCheckedDespesas.checkedPago) {
      expenseValues = totalDespesas.totalPayed;
    } else {
      expenseValues = totalDespesas.totalOpen;
    }

    let earningValues = 0;
    if (
      stateCheckedReceitas.checkedPago &&
      stateCheckedReceitas.checkedAberto
    ) {
      earningValues = totalReceitas.total;
    } else if (stateCheckedReceitas.checkedPago) {
      earningValues = totalReceitas.totalPayed;
    } else {
      earningValues = totalReceitas.totalOpen;
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
