// components/charts/PieChartComponent.jsx
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";
import React from "react";

const COLORS = ["#16a34a", "#22c55e", "#4ade80", "#86efac"];

export default function PieChartComponent({ data }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" label>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
