import { useTheme } from "@material-ui/core";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function FcGraphic({ data, chaveX, chaveY, stroke, cor }) {
  const theme = useTheme();
  return (
    <ResponsiveContainer height={180}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey={chaveX}
          fill={theme.palette.text.primary}
          stroke={theme.palette.text.primary}
        />
        <Legend />
        <YAxis
          type="number"
          fill={theme.palette.text.primary}
          stroke={theme.palette.text.primary}
          domain={[0, 40000]}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: theme.palette.background.paper,
            borderRadius: theme.shape.borderRadius,
            border: "none",
          }}
        />
        <Bar dataKey={chaveY} fill={cor} maxBarSize={30} stroke={stroke} />
      </BarChart>
    </ResponsiveContainer>
  );
}
