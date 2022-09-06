import { useEffect, useState } from "react";
import { useSpin } from "@hooks/use-spin";
import { Grid, Typography, useTheme } from "@material-ui/core";
import { getValorDespesasPorCategoria, Money } from "common";
import { useCurrentTime } from "@hooks/use-current-time";

import { CheckedValues, useDashValues } from "@hooks/use-dash-values";
import FcSurface from "@components/fc-surface/fc-surface";
import FcGraphic from "@pages/home/components/fc-graphics/fc-graphics";
import { pink } from "@material-ui/core/colors";

export function FcGraphicExpenseByCategory() {
  const checkExpenses = useDashValues(s => s.checkExpenses)
  const { year, month } = useCurrentTime();
  const setSpin = useSpin(s => s.setSpin);

  const [despesas, setDespesas] = useState<any[]>([]);
  const theme = useTheme();

  useEffect(() => {
    async function pegaDespesas() {
      await graphMonth(checkExpenses);
    }
    async function graphMonth(checkExpenses: CheckedValues) {
      const { data, status } = await getValorDespesasPorCategoria(
        checkExpenses,
        year,
        month
      );
      if (status === 200) {
        setDespesas(
          data.map((item: any) => {
            item.value = Money.toFloat(item.value);
            item.subCategoryData.map((item: any) => {
              item.value = Money.toFloat(item.value);
              return item;
            })
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
  }, [checkExpenses, setSpin, year, month]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6}>
        <FcSurface>
          <Typography
            variant="subtitle1"
            style={{ color: theme.palette.text.primary, padding: theme.spacing(1) }}
            align="center"
          >
            Despesas por categoria
          </Typography>
          <FcGraphic
            data={despesas}
            chaveX="description"
            chaveY="value"
            cor={
              theme.palette.type === "dark"
                ? theme.palette.error.light
                : theme.palette.error.dark
            }
            stroke={theme.palette.error.main}
          />
        </FcSurface>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FcSurface>
          <Typography
            variant="subtitle1"
            style={{ color: theme.palette.text.primary, padding: theme.spacing(1) }}
            align="center"
          >
            Despesas por sub categoria
          </Typography>
          <FcGraphic
            data={despesas.reduce((acc: any[], element: any) => {
              return [...acc, ...element.subCategoryData].sort((a, b) =>
                a.value > b.value ? 1 : b.value > a.value ? -1 : 0
              )
            }, [])}
            chaveX="description"
            chaveY="value"
            cor={
              theme.palette.type === "dark"
                ? pink[200]
                : pink[400]
            }
            stroke={pink[500]}
          />
        </FcSurface>
      </Grid>

    </Grid>

  );
}
