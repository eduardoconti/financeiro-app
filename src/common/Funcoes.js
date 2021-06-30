import {
  retornaTotalDespesasPagas,
  retornaTotalDespesasAbertas,
  retornaTotalGeralDespesasPagas,
} from "./DepesaFuncoes";
import {
  retornaTotalReceitasPagas,
  retornaTotalReceitasAbertas,
  retornaTotalGeralReceitasPagas,
} from "./ReceitaFuncoes";

async function calculaTotais(
  stateCheckedDespesas,
  stateCheckedReceitas,
  stateAnoAtual,
  stateMesAtual
) {
  let totalDespesas, totalDespesasPagas, totalDespesasAbertas;
  let totalReceitas, totalReceitasPagas, totalReceitasAbertas;
  let totalGeralReceitasPagas, totalGeralDespesasPagas;

  totalDespesas = 0;
  totalDespesasPagas = await retornaTotalDespesasPagas(
    stateAnoAtual,
    stateMesAtual
  );
  totalDespesasAbertas = await retornaTotalDespesasAbertas(
    stateAnoAtual,
    stateMesAtual
  );
  totalGeralDespesasPagas = await retornaTotalGeralDespesasPagas();

  stateCheckedDespesas.checkedPago
    ? (totalDespesas += totalDespesasPagas)
    : (totalDespesas += 0);
  stateCheckedDespesas.checkedAberto
    ? (totalDespesas += totalDespesasAbertas)
    : (totalDespesas += 0);

  totalReceitas = 0;
  totalReceitasPagas = await retornaTotalReceitasPagas(
    stateAnoAtual,
    stateMesAtual
  );
  totalReceitasAbertas = await retornaTotalReceitasAbertas(
    stateAnoAtual,
    stateMesAtual
  );
  totalGeralReceitasPagas = await retornaTotalGeralReceitasPagas();

  stateCheckedReceitas.checkedPago
    ? (totalReceitas += totalReceitasPagas)
    : (totalReceitas += 0);
  stateCheckedReceitas.checkedAberto
    ? (totalReceitas += totalReceitasAbertas)
    : (totalReceitas += 0);

  return {
    totalDespesas: totalDespesas,
    totalReceitas: totalReceitas,
    saldo: totalGeralReceitasPagas - totalGeralDespesasPagas,
    balanco:
      totalReceitasAbertas +
      totalReceitasPagas -
      (totalDespesasPagas + totalDespesasAbertas),
  };
}

export { calculaTotais };
