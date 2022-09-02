import { useEffect, useState } from "react";
import { getValorDespesasPorCategoria } from "../../common/DepesaFuncoes";
import { useSpin } from "@hooks/use-spin";
import { useTheme } from "@material-ui/core";
import { isAuthenticated } from "../../common/Auth";
import FcSurface from "../fc-surface/fc-surface";
import FcGraphic from "./fc-graphics";
import { Money } from "common";
import { useCurrentTime } from "@hooks/use-current-time";
import { FcGraphicUnplannedExpenses, FcGraphicHeader } from "./";
import { CheckedValues, useDashValues } from "@hooks/use-dash-values";

export function FcGraphicsExpense() {
  const checkExpenses = useDashValues(s=>s.checkExpenses)
  const {year, month} = useCurrentTime();
  const setSpin = useSpin(s=>s.setSpin);

  const [despesas, setDespesas] = useState([]);
  const [stateGrafico, setStateGrafico] = useState("1");
  const [descricao, setDescricao] = useState("");
  const theme = useTheme();

  useEffect(() => {
    async function pegaDespesas() {
      if (isAuthenticated()) {
        if (stateGrafico === "1") {
          await general(checkExpenses);
        }
        if (stateGrafico === "2") {
          await graphMonth(checkExpenses);
        }
        if (stateGrafico === "3") {
          setDescricao("Despesas não planejadas");
        }
      } else {
        setDespesas([]);
      }
    }
    async function general(checkExpenses: CheckedValues) {
      setDescricao("Despesas por Categoria Geral");
      const { data, status } = await getValorDespesasPorCategoria(
        checkExpenses
      );
      if (status === 200) {
        setDespesas(
          data.map((item: any) => {
            item.valor = Money.toFloat(item.valor);
            return item;
          })
        );
      } else {
        setDespesas([]);
      }
    }
    async function graphMonth(checkExpenses: CheckedValues) {
      setDescricao("Despesas por Categoria Mensal");
      const { data, status } = await getValorDespesasPorCategoria(
        checkExpenses,
        year,
        month
      );
      if (status === 200) {
        setDespesas(
          data.map((item: any) => {
            item.valor = Money.toFloat(item.valor);
            return item;
          })
        );
      } else {
        setDespesas([]);
      }
    }
    setSpin(true);
    pegaDespesas();
    setSpin(false);
  }, [checkExpenses, stateGrafico, setSpin, year, month]);

  return (
    <FcSurface>
      <FcGraphicHeader
        setStateGrafico={(stateGrafico: string) => {
          setStateGrafico(stateGrafico);
        }}
        cor={theme.palette.error.light}
        descricao={descricao}
      />
      {stateGrafico !== "3" ? (
        <FcGraphic
          data={despesas}
          chaveX="descricao"
          chaveY="valor"
          cor={
            theme.palette.type === "dark"
              ? theme.palette.error.light
              : theme.palette.error.dark
          }
          stroke={theme.palette.error.main}
        />
      ) : (
        <FcGraphicUnplannedExpenses />
      )}
    </FcSurface>
  );
}
