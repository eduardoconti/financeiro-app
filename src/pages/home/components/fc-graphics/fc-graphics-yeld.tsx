import { useEffect, useState } from "react";


import { useSpin } from "@hooks/use-spin";
import { useTheme } from "@material-ui/core";

import FcGraphic from "./fc-graphics";
import { isAuthenticated, Money } from "common";
import { useCurrentTime } from "@hooks/use-current-time";
import { FcGraphicHeader } from "./fc-graphics-header";
import { useDashValues } from "@hooks/use-dash-values";
import { getReceitas, retornaReceitasAgrupadasPorCarteiraChecked } from "@common/ReceitaFuncoes";
import FcSurface from "@components/fc-surface/fc-surface";

export function FcGraphicsYeld() {
  const checkEarnings = useDashValues(s=>s.checkEarnings)
  const { year, month } = useCurrentTime();
  const setSpin = useSpin(s=>s.setSpin)

  const [receitas, setReceitas] = useState([]);
  const [stateGrafico, setStateGrafico] = useState("1");
  const [descricao, setDescricao] = useState("");
  const theme = useTheme();

  useEffect(() => {
    if (isAuthenticated()) {
      async function pegaReceitas() {
        let receitas;

        if (stateGrafico === "1") {
          receitas = await getReceitas(
            checkEarnings,
            year,
            month
          );
          setDescricao("Receitas");
        } else if (stateGrafico === "2") {
          receitas = await retornaReceitasAgrupadasPorCarteiraChecked(
            checkEarnings,
            year,
            month
          );
          setDescricao("Receitas por Carteira");
        }
        if (receitas.status === 200) {
          const { data } = receitas;
          setReceitas(
            data.map((item: any) => {
              item.valor = Money.toFloat(item.valor);
              return item;
            })
          );
        }
      }
      setSpin(true)
      pegaReceitas();
      setSpin(false)
    } else {
      setReceitas([]);
    }
  }, [
    checkEarnings,
    year,
    month,
    stateGrafico,
    setSpin,
  ]);

  return (
    <FcSurface>
      <FcGraphicHeader
        setStateGrafico={(stateGrafico: string) => {
          setStateGrafico(stateGrafico);
        }}
        cor={theme.palette.success.main}
        descricao={descricao}
      />
      <FcGraphic
        data={receitas}
        chaveX="descricao"
        chaveY="valor"
        cor={
          theme.palette.type === "dark"
            ? theme.palette.success.light
            : theme.palette.success.dark
        }
        stroke={theme.palette.success.main}
      />
    </FcSurface>
  );
}
