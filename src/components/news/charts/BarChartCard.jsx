import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function BarChartCard({ title, data, datakey, label }) {
  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <h2 className="text-lg font-bold mb-3">{title}</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey={label} />
          <YAxis />
          <Tooltip />
          <Bar dataKey={datakey} fill="#4ade80" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
