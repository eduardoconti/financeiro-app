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

const renderColorfulLegendText = (value, entry) => {
  const { color } = entry;

  return <span style={{ color }}>{value} </span>;
};

export default function Grafico({ data, chaveX, chaveY, stroke, cor }) {
  return (
    <ResponsiveContainer>
      <BarChart
        data={data}
        margin={{
          right: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={chaveX} />
        <Legend formatter={renderColorfulLegendText} />
        <YAxis type="number" domain={[0, 6000]} />
        <Tooltip />
        <Bar dataKey={chaveY} fill={cor} maxBarSize={30} stroke={stroke} />
      </BarChart>
    </ResponsiveContainer>
  );
}
