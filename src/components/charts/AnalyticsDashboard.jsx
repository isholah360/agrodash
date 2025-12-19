// // components/AnalyticsDashboard.jsx
// import { useMemo } from "react";
// import BarChartComponent from "./BarChartComponent";
// import PieChartComponent from "./PieChartComponent";
// import StackedEnterpriseCommodity from "./StackedEnterpriseCommodity";
// import EnterpriseTrendLine from "./EnterpriseTrendLine";
// import React from "react";

// import {
//   groupByCommodity,
//   groupByEnterprise,
//   groupByCommodityForEnterprise,
// } from "./chartHelpers";

// export default function AnalyticsDashboard({ allData }) {
//   const commodityData = useMemo(
//     () => groupByCommodity(allData),
//     [allData]
//   );

//   const enterpriseData = useMemo(
//     () => groupByEnterprise(allData),
//     [allData]
//   );

//   const cropData = useMemo(
//     () => groupByCommodityForEnterprise(allData, "CROP"),
//     [allData]
//   );

//   const agroAlliedData = useMemo(
//     () => groupByCommodityForEnterprise(allData, "AGRO_ALLIED"),
//     [allData]
//   );

//   const livestockData = useMemo(
//     () => groupByCommodityForEnterprise(allData, "LIVESTOCK"),
//     [allData]
//   );

//   return (
//     <div className="space-y-14">
//       {/* 🌍 Combined */}
//       <Section title="🌍 All Enterprises – Commodity Distribution">
//         <BarChartComponent data={commodityData} />
//         <PieChartComponent data={commodityData} />
//       </Section>

//       <Section title="🏷️ Enterprise Type Distribution">
//         <BarChartComponent data={enterpriseData} />
//         <PieChartComponent data={enterpriseData} />
//       </Section>

//       {/* 🌱 Per Enterprise */}
//       <Section title="🌱 Crop Commodities">
//         <BarChartComponent data={cropData} />
//         <PieChartComponent data={cropData} />
//       </Section>

//       <Section title="🏭 Agro-Allied Commodities">
//         <BarChartComponent data={agroAlliedData} />
//         <PieChartComponent data={agroAlliedData} />
//       </Section>

//       <Section title="🐄 Livestock Commodities">
//         <BarChartComponent data={livestockData} />
//         <PieChartComponent data={livestockData} />
//       </Section>
//     </div>
//   );
// }

// function Section({ title, children }) {
//   return (
//     <section>
//       <h2 className="text-xl font-bold mb-4">{title}</h2>
//       <div className="grid md:grid-cols-2 gap-6">{children}</div>
//     </section>
//   );
// }


// components/AnalyticsDashboard.jsx
import { useMemo } from "react";
import React from "react";

import BarChartComponent from "./BarChartComponent";
import PieChartComponent from "./PieChartComponent";
import StackedEnterpriseCommodity from "./StackedEnterpriseCommodity";
import EnterpriseTrendLine from "./EnterpriseTrendLine";
import KPIGrid from "./KPIGrid";

import {
  groupByCommodity,
  groupByEnterprise,
  groupByCommodityForEnterprise,
  stackEnterpriseCommodity,
  enterpriseTrend,
} from "./chartHelpers";

export default function AnalyticsDashboard({ allData }) {
  // ---------------- COMBINED DATA ----------------
  const commodityData = useMemo(() => groupByCommodity(allData), [allData]);
  const enterpriseData = useMemo(() => groupByEnterprise(allData), [allData]);

  // ---------------- PER ENTERPRISE ----------------
  const cropData = useMemo(
    () => groupByCommodityForEnterprise(allData, "CROP"),
    [allData]
  );
  const agroAlliedData = useMemo(
    () => groupByCommodityForEnterprise(allData, "AGRO_ALLIED"),
    [allData]
  );
  const livestockData = useMemo(
    () => groupByCommodityForEnterprise(allData, "LIVESTOCK"),
    [allData]
  );

  // ---------------- ADVANCED CHARTS ----------------
  const stackedData = useMemo(() => stackEnterpriseCommodity(allData), [allData]);
  const trendData = useMemo(() => enterpriseTrend(allData), [allData]);

  return (
    <div className="space-y-14">
      {/* ---------------- KPI GRID ---------------- */}
      <KPIGrid allData={allData} />

      {/* ---------------- COMBINED ---------------- */}
      <Section title="🌍 All Enterprises – Commodity Distribution">
        <BarChartComponent data={commodityData} />
        <PieChartComponent data={commodityData} />
      </Section>

      <Section title="🏷️ Enterprise Type Distribution">
        <BarChartComponent data={enterpriseData} />
        <PieChartComponent data={enterpriseData} />
      </Section>

      {/* ---------------- PER ENTERPRISE ---------------- */}
      <Section title="🌱 Crop Commodities">
        <BarChartComponent data={cropData} />
        <PieChartComponent data={cropData} />
      </Section>

      <Section title="🏭 Agro-Allied Commodities">
        <BarChartComponent data={agroAlliedData} />
        <PieChartComponent data={agroAlliedData} />
      </Section>

      <Section title="🐄 Livestock Commodities">
        <BarChartComponent data={livestockData} />
        <PieChartComponent data={livestockData} />
      </Section>

      {/* ---------------- ADVANCED CHARTS ---------------- */}
      {/* <Section title="📊 Enterprise × Commodity Breakdown">
        <StackedEnterpriseCommodity data={stackedData} />
      </Section> */}

      <Section title="📈 Enterprise Trend">
        <EnterpriseTrendLine data={trendData} />
      </Section>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section>
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="grid md:grid-cols-2 gap-6">{children}</div>
    </section>
  );
}
