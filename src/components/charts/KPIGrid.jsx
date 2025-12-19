import React from "react";

export default function KPIGrid({ allData }) {
  const totalRecords = allData.length;

  const totalFarmSize = allData.reduce(
    (sum, d) => sum + Number(d.farmSize || 0),
    0
  );

  const uniqueFarmers = new Set(allData.map((d) => d.id)).size;

  const enterpriseCounts = {
    CROP: 0,
    AGRO_ALLIED: 0,
    LIVESTOCK: 0,
  };

  allData.forEach((d) => {
    if (enterpriseCounts[d.enterprise] !== undefined) {
      enterpriseCounts[d.enterprise]++;
    }
  });

  return (
    <div className="grid md:grid-cols-4 gap-6">
      <KPI title="Total Records" value={totalRecords} />
      <KPI title="Unique Farmers" value={uniqueFarmers} />
      <KPI title="Total Farm Size (ha)" value={totalFarmSize.toFixed(2)} />
      <KPI
        title="Crop / Agro / Livestock"
        value={`${enterpriseCounts.CROP} / ${enterpriseCounts.AGRO_ALLIED} / ${enterpriseCounts.LIVESTOCK}`}
      />
    </div>
  );
}

function KPI({ title, value }) {
  return (
    <div className="bg-white p-5 rounded-lg shadow">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-green-700">{value}</p>
    </div>
  );
}
