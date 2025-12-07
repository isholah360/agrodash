import React, { useEffect, useState } from "react";
import BarChartCard from "./charts/BarChartCard";
import PieChartCard from "./charts/PieChartCard";
import LineChartCard from "./charts/LineChartCard";

export default function Analytics() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admins/analytics`);
        if (!res.ok) throw new Error("Failed to fetch analytics");

        const data = await res.json();
        console.log("Analytics Data:", data);

        const formatted = {
          officers: data.metrics.totalOfficers,
          farmers: data.metrics.totalFarmers,
          farms: data.metrics.totalFarms,
          crops: data.metrics.totalCrops,
          livestock: data.metrics.totalLivestock,

          farmsPerOfficer: data.analytics.officerPerformance.map((o) => ({
            officer: o.name,
            farms: o.farms,
          })),

          cropPie: data.analytics.cropTypes.map((c) => ({
            name: c.type,
            value: c.value,
          })),

          livestockBar: data.analytics.livestockTypes.map((l) => ({
            type: l.type,
            value: l.value,
          })),

          monthlyActivity: data.analytics.monthlyCrops.map((m) => ({
            month: m.month,
            crops: m.value,
            livestock:
              data.analytics.monthlyLivestock.find(
                (v) => v.month === m.month
              )?.value || 0,
          })),
        };

        setMetrics(formatted);
      } catch (err) {
        console.log("Analytics Error:", err);
      }
    };

    loadAnalytics();
  }, []);

  if (!metrics)
    return (
      <p className="text-center mt-20 text-gray-500 animate-pulse">
        Loading analytics...
      </p>
    );

  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-10 text-gray-800">
        📊 Analytics Overview
      </h1>

  
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
        <StatCard label="Total Officers" value={metrics.officers} color="green" />
        <StatCard label="Total Farmers" value={metrics.farmers} color="blue" />
        <StatCard label="Total Farms" value={metrics.farms} color="yellow" />
        <StatCard label="Total Crops" value={metrics.crops} color="teal" />
        <StatCard label="Total Livestock" value={metrics.livestock} color="rose" />
      </div> */}

      {/* ---- Charts ---- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <ChartContainer>
          <BarChartCard
            title="Farms per Officer"
            data={metrics.farmsPerOfficer}
            datakey="farms"
            label="officer"
          />
        </ChartContainer>

        <ChartContainer>
          <PieChartCard title="Crop Distribution" data={metrics.cropPie} />
        </ChartContainer>

        <ChartContainer>
          <BarChartCard
            title="Livestock Types Count"
            data={metrics.livestockBar}
            datakey="value"
            label="type"
          />
        </ChartContainer>

        <ChartContainer>
          <LineChartCard title="Monthly Activity" data={metrics.monthlyActivity} />
        </ChartContainer>
      </div>
    </div>
  );
}

/* ---- BEAUTIFUL STAT CARD ---- */
function StatCard({ label, value, color }) {
  const colorMap = {
    green: "from-green-500 to-green-600",
    blue: "from-blue-500 to-blue-600",
    yellow: "from-yellow-500 to-yellow-600",
    teal: "from-teal-500 to-teal-600",
    rose: "from-rose-500 to-rose-600",
  };

  return (
    <div
      className={`
        bg-gradient-to-br ${colorMap[color]} 
        text-white p-6 rounded-xl shadow-lg 
        transform hover:scale-105 transition-all
      `}
    >
      <p className="text-sm uppercase tracking-wide opacity-90">{label}</p>
      <p className="text-3xl font-extrabold mt-2">{value}</p>
    </div>
  );
}

/* ---- CHART CONTAINER ---- */
function ChartContainer({ children }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-xl transition-all">
      {children}
    </div>
  );
}
