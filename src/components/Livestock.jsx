import React from "react";
import ChartCard from "./ChartCard";

export default function Livestock() {
  return (
    <>
      <div>Livestock</div>
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Livestock Dashboard</h2>
        <ChartCard/>
      </div>
    </>
  );
}
