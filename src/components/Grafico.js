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

export default function Grafico({ data, chaveX, chaveY, stroke, cor }) {
  const theme = useTheme();
  return (
    <ResponsiveContainer height={180}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={chaveX} fill="#FFF" stroke="#FFF" />
        <Legend />
        <YAxis type="number" fill="#FFF" stroke="#FFF" domain={[0, 5000]} />
        <Tooltip
          contentStyle={{
            backgroundColor: theme.palette.grey[900],
            borderRadius: theme.shape.borderRadius,
            border: "none",
          }}
        />
        <Bar dataKey={chaveY} fill={cor} maxBarSize={30} stroke={stroke} />
      </BarChart>
    </ResponsiveContainer>
  );
}
