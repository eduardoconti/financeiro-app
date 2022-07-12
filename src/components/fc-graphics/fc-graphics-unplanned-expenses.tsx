import { useContext, useEffect, useState } from "react";

import { useTheme } from "@material-ui/core";
import { isAuthenticated, Money } from "common";
import { SpinContext } from "Context";
import { GraphicService } from "api/graphic/service";
import { Bar, CartesianGrid, ComposedChart, Tooltip, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts";

export default function FcGraphicUnplannedExpenses() {

  const { setSpin } = useContext(SpinContext);
  const [unplannedExpenses, setUnplannedExpenses] = useState([]);

  const theme = useTheme();


  useEffect(() => {
    if (isAuthenticated()) {
      const service = new GraphicService()
      async function pegaReceitas() {
        setSpin(true);
        const { data, status } = await service.unplannedExpenses();
        if (status === 200) {
          setUnplannedExpenses((data.months.map((month: any) => {
            month.total = Money.toFloat(month.total);
            month.totalOpen = Money.toFloat(month.totalOpen);
            month.totalPayed = Money.toFloat(month.totalPayed);
            return month
          })));
        }
        setSpin(false);
      }
      pegaReceitas();
    }
  }, [setSpin]);

  return (
    //<FcSurface>
      <ResponsiveContainer height={180}>
        <ComposedChart data={unplannedExpenses}>
          <XAxis
            dataKey="month"
            fill={theme.palette.text.primary}
            stroke={theme.palette.text.primary}
          />
          <YAxis
            fill={theme.palette.text.primary}
            stroke={theme.palette.text.primary}
            scale="linear"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: theme.palette.background.default,
              borderRadius: theme.shape.borderRadius,
              border: "none",
            }}
          />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />

          <Bar
            dataKey="total"
            name="Valor"
            maxBarSize={30}
            fill={
              theme.palette.type === "dark"
                ? theme.palette.error.light
                : theme.palette.error.dark
            }
            stroke={theme.palette.error.main}
          />
         
        </ComposedChart>
      </ResponsiveContainer>
    //</FcSurface>
  );
}
