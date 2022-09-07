import { useEffect } from "react";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { Box, Divider, Grid, Typography, useTheme } from "@material-ui/core";

import { useSpin } from "@hooks/use-spin";
import FcSurface from "@components/fc-surface/fc-surface";
import { useGraphic } from "@pages/home/hook";
import shallow from "zustand/shallow";
import { Money } from "@common/money";
import { pink, teal } from "@material-ui/core/colors";

const CustomTooltip = ({ active, payload, label }: any) => {
  const theme = useTheme();

  if (active && payload && payload.length) {
    return (
      <Box
        className="custom-tooltip"
        style={{
          backgroundColor: theme.palette.grey[800],
          borderRadius: theme.shape.borderRadius,
          border: "none",
          padding: theme.spacing(1),
        }}
      >
        <Typography style={{ color: theme.palette.text.primary }}>
          {`${label}`}
        </Typography>
        <Divider />
        {payload.map((e: any, i: number) => {
          return (
            <>
              <Typography>
                <span>{`${payload[i].name}: `}</span>
                <span style={{ color: payload[i].stroke }}>
                  {`${Money.formatBrl(payload[i].value)}`}
                </span>
              </Typography>
            </>
          );
        })}
      </Box>
    );
  }
  return null;
};
export function FcGraphicsGeneral() {
  const { setSpin } = useSpin();
  const { init, general } = useGraphic(
    (s) => ({
      init: s.fetchGenereal,
      general: s.general,
    }),
    shallow
  );
  const theme = useTheme();

  useEffect(() => {
    async function initGraphic() {
      try {
        setSpin(true);
        await init();
      } catch (error) {
      } finally {
        setSpin(false);
      }
    }
    initGraphic();
  }, [init, setSpin]);
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <FcSurface>
          <ResponsiveContainer height={220}>
            <ComposedChart data={general}>
              <XAxis
                dataKey="month"
                fill={theme.palette.text.primary}
                stroke={theme.palette.text.primary}
              />
              <YAxis
                fill={theme.palette.text.primary}
                stroke={theme.palette.text.primary}
                scale="sqrt"
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <CartesianGrid strokeDasharray="1" style={{ opacity: 0.5 }} />
              <Bar
                dataKey="expenses.total"
                name="Despesas"
                maxBarSize={30}
                fill={
                  theme.palette.type === "dark"
                    ? theme.palette.error.light
                    : theme.palette.error.dark
                }
                stroke={theme.palette.error.main}
              />
              <Bar
                dataKey="earnings.total"
                name="Receitas"
                fill={
                  theme.palette.type === "dark"
                    ? theme.palette.success.light
                    : theme.palette.success.dark
                }
                stroke={theme.palette.success.main}
                fillOpacity={"60%"}
                maxBarSize={30}
              />
              <Line
                type="monotone"
                dataKey="totalBallance"
                name="Saldo"
                stroke={theme.palette.warning.light}
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="ballance"
                name="Balanço"
                stroke={
                  theme.palette.type === "dark"
                    ? theme.palette.info.light
                    : theme.palette.info.dark
                }
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="medianExpenses"
                name="Mediana despesas"
                dot={false}
                stroke={pink[500]}
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="medianEarnings"
                name="Mediana receitas"
                dot={false}
                stroke={teal[500]}
                strokeWidth={2}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </FcSurface>
      </Grid>
    </Grid>
  );
}
