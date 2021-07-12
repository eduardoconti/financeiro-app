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

import { emptyTotais} from './EmptyStates';

async function calculaTotais(
  stateCheckedDespesas,
  stateCheckedReceitas,
  stateAnoAtual,
  stateMesAtual
) {

  try {
    let totalDespesas;
    let totalReceitas;
 
    totalDespesas = 0;
    let {data: totalDespesasPagas } = await retornaTotalDespesasPagas(
      stateAnoAtual,
      stateMesAtual
    );
    let {data: totalDespesasAbertas} = await retornaTotalDespesasAbertas(
      stateAnoAtual,
      stateMesAtual
    );
    let {data: totalGeralDespesasPagas} = await retornaTotalGeralDespesasPagas();
  
    stateCheckedDespesas.checkedPago
      ? (totalDespesas += totalDespesasPagas)
      : (totalDespesas += 0);
    stateCheckedDespesas.checkedAberto
      ? (totalDespesas += totalDespesasAbertas)
      : (totalDespesas += 0);
  
    totalReceitas = 0;
    let {data: totalReceitasPagas} = await retornaTotalReceitasPagas(
      stateAnoAtual,
      stateMesAtual
    );
    let {data: totalReceitasAbertas} = await retornaTotalReceitasAbertas(
      stateAnoAtual,
      stateMesAtual
    );

    let {data: totalGeralReceitasPagas } = await retornaTotalGeralReceitasPagas();

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
  } catch (error) {
    return emptyTotais
  }
 
}

export { calculaTotais };
