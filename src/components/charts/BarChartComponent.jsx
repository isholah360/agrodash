// components/charts/BarChartComponent.jsx
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import React from "react";

export default function BarChartComponent({ data, yAxisLabel = "Value", xAxisLabel = "Value" }) {
  return (
    <div className="bg-white p-5 py-10 rounded shadow relative">
      <ResponsiveContainer width="100%" height={350}>
        <div className="w-full mb-4 text-center absolute flex items-center left-[5%] rotate-270 transform -translate-x-1/2">
           <h3 className="text-sm text-gray-600 mb-2 font-bold">{yAxisLabel}</h3>
          
        </div>
        
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis 
            // label={{
            //   value: yAxisLabel,
            //   angle: -90,
            //   position: 'insideLeft',
            //   offset: 8,
            //   style: { textAnchor: 'middle' }
            // }} 
            // className="text-sm ml-5 absolute left-0"
          />
          <Tooltip />
          <Bar dataKey="value" fill="#16a34a" />
        </BarChart>
        <div className="w-full mt-4 text-center absolute bottom-2 left-[50%] transform -translate-x-1/2">
           <h3 className="text-sm text-gray-600 mb-2 font-bold">{xAxisLabel}</h3>
        </div>
      </ResponsiveContainer>
    </div>
  );
}