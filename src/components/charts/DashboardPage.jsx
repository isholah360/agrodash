// pages/DashboardPage.jsx
import { useEffect, useState } from "react";
import AnalyticsDashboard from "./AnalyticsDashboard";
import React from "react";

export default function DashboardPage() {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const token = localStorage.getItem("authToken");

        const res = await fetch(
          "/api/v1/DashboardReporting/GetReport",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch report");
        }

        const json = await res.json();

        // 🔹 Normalize API data
        const cleanData = json.data.map((row, idx) => ({
          id: row.farmid ?? idx,
          name: row.farmerFullName,
          email: row.farmerEmail,
          phone: row.farmerPhone,
          region: row.regionname ?? "N/A",

          enterprise: row.enterpriseType,

          commodity:
            row.enterpriseType === "AGRO_ALLIED"
              ? row.businessTypeName ?? "N/A"
              : row.itemTypeName ?? "N/A",

          farmSize: row.farmsize ?? 0,
        }));

        setAllData(cleanData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  if (loading) return <p className="p-6">Loading analytics…</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-green-700 mb-8">
        📊 Agricultural Analytics Dashboard
      </h1>

      {/* ✅ THIS IS WHERE IT IS USED */}
      <AnalyticsDashboard allData={allData} />
    </div>
  );
}
