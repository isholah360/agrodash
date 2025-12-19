import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import React from "react";

export default function StackedEnterpriseCommodity({ data }) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="commodity" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="CROP" stackId="a" fill="#16a34a" />
        <Bar dataKey="AGRO_ALLIED" stackId="a" fill="#22c55e" />
        <Bar dataKey="LIVESTOCK" stackId="a" fill="#4ade80" />
      </BarChart>
    </ResponsiveContainer>
  );
}
