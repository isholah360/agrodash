import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import React from "react";

export default function PieChartCard({ title, data }) {
  const COLORS = ["#4ade80", "#60a5fa", "#facc15", "#f87171"];

  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <h2 className="text-lg font-bold mb-3">{title}</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#4ade80"
            label
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
