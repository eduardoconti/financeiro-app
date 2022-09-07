import { useEffect, useState } from "react";
import { useSpin } from "@hooks/use-spin";
import { Grid, Typography, useTheme } from "@material-ui/core";
import { getValorDespesasPorCategoria, Money } from "common";
import { useCurrentTime } from "@hooks/use-current-time";

import { CheckedValues, useDashValues } from "@hooks/use-dash-values";
import FcSurface from "@components/fc-surface/fc-surface";
import FcGraphic from "@pages/home/components/fc-graphics/fc-graphics";
import { SuccessResponseData } from "@api/http-request/dto";
// import { GetExpenseAmountGroupByCategoryResponse } from "@api/expense/dto";
import { colors } from "@common/colors";
import { shuffleArray } from "@common/math";

function GraphicTitle({ title }: { title: string }) {
  const theme = useTheme();
  return (
    <Typography
      variant="subtitle1"
      style={{ color: theme.palette.text.primary, padding: theme.spacing(1) }}
      align="center"
    >
      {title}
    </Typography>
  );
}

export function FcGraphicExpenseByCategory() {
  const checkExpenses = useDashValues((s) => s.checkExpenses);
  const { year, month } = useCurrentTime();
  const setSpin = useSpin((s) => s.setSpin);

  const [despesas, setDespesas] = useState<any[]>([]);
  // const theme = useTheme();
  useEffect(() => {
    async function pegaDespesas() {
      await graphMonth(checkExpenses);
    }
    async function graphMonth(checkExpenses: CheckedValues) {
      const {
        data,
        status,
      }: SuccessResponseData<any[]> = await getValorDespesasPorCategoria(
        checkExpenses,
        year,
        month
      );
      if (status === 200) {
        shuffleArray(colors);
        const newData = data.map((item, i) => {
          const cor = colors[i];
          item.value = Money.toFloat(item.value);
          item.subCategoryData.map((sub: any) => {
            sub.value = Money.toFloat(sub.value);
            sub.color = cor;
            return sub;
          });
          return { ...item, color: cor };
        });
        setDespesas(newData);
      } else {
        setDespesas([]);
      }
    }
    setSpin(true);
    pegaDespesas();
    setSpin(false);
  }, [checkExpenses, setSpin, year, month]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6}>
        <FcSurface>
          <GraphicTitle title={"Despesas por categoria"} />
          <FcGraphic data={despesas} chaveX="description" chaveY="value" />
        </FcSurface>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FcSurface>
          <GraphicTitle title={"Despesas por sub categoria"} />
          <FcGraphic
            data={despesas.reduce((acc: any[], element: any) => {
              if (!element.id) {
                return acc;
              }
              return [
                ...acc,
                ...element.subCategoryData.filter((e: any) => {
                  return e.id;
                }),
              ].sort((a, b) =>
                a.value > b.value ? 1 : b.value > a.value ? -1 : 0
              );
            }, [])}
            chaveX="description"
            chaveY="value"
          />
        </FcSurface>
      </Grid>
    </Grid>
  );
}
