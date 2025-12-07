import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Analytics from "./analytics";
import ProjectTable from "../ProjectTable";

const Dashboard = () => {
  const [stats, setStats] = useState({
    officers: [],
    farmers: [],
    farms: [],
    crops: [],
    livestock: [],
  });
  

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);

        const endpoints = [
          "officers",
          "farmers",
          "farms/all",
          "crops/all",
          "livestocks/all",
        ];

        const responses = await Promise.all(
          endpoints.map((endpoint) =>
            fetch(`/api/get/${endpoint}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
          )
        );
       
      

        const jsonData = await Promise.all(responses.map((res) => res.json()));
        console.log("📊 Dashboard data fetched:", jsonData);

        setStats({
          officers: jsonData[0],
          farmers: jsonData[1],
          farms: jsonData[2],
          crops: jsonData[3],
          livestock: jsonData[4],
        });
      } catch (err) {
        console.error(err);
        setError("❌ Failed to load dashboard data. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [token]);

  // ===== Derived Analytics =====
  const totalLivestockCount = stats.livestock.reduce(
    (sum, item) => sum + (item.count || 0),
    0
  );

  const farmsWithCrops = stats.farms.filter((farm) =>
    stats.crops.some((c) => c.farmId === farm._id)
  ).length;

  const farmsWithLivestock = stats.farms.filter((farm) =>
    stats.livestock.some((l) => l.farmId === farm._id)
  ).length;

  return (
    <div className="min-h-screen bg-gray-100 ">
  
      {/* Main Section */}
      <div className="p-6 px-[5%]">
        {loading ? (
          <p className="text-center text-gray-600 mt-10 animate-pulse">
            Loading dashboard...
          </p>
        ) : error ? (
          <p className="text-center text-red-600 mt-10">{error}</p>
        ) : (
          <>
            <h1 className="text-4xl font-extrabold mb-10 text-gray-800">
              🧮 Dashboard
            </h1>
            {/* ===== Summary Metrics ===== */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              <Link to="/officers">
                <StatCard
                  title="Officers"
                  count={stats.officers.length}
                  color="bg-[#e6cfe5]"
                  icon="👮"
                />
              </Link>

              <StatCard
                title="Farmers"
                count={stats.farmers.length}
                color="bg-[#ccd6c1]"
                icon="🧑‍🌾"
              />

              <StatCard
                title="Farms"
                count={stats.farms.length}
                color="bg-[#e1e4d1]"
                icon="🌱"
              />

              <StatCard
                title="Total Livestock"
                count={totalLivestockCount}
                color="bg-[#e4dadb]"
                icon="🐄"
              />

              <StatCard
                title="Farms w/ Crops"
                count={farmsWithCrops}
                color="bg-[#945293]"
                icon="🌾"
              />

              <StatCard
                title="Farms w/ Livestock"
                count={farmsWithLivestock}
                color="bg-purple-600"
                icon="🐑"
              />
            </div>

              <ProjectTable officers={stats.officers} />

            <Analytics />

          

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
              {/* <DataTable
                title="Officers"
                data={stats.officers}
                columns={["name", "email"]}
              />
              <DataTable
                title="Farmers"
                data={stats.farmers}
                columns={["name", "phone"]}
              />
              <DataTable
                title="Farms"
                data={stats.farms}
                columns={["name", "location", "size"]}
              />

              <DataTable
                title="Crops"
                data={stats.crops}
                columns={["cropType", "variety", "plantingDate"]}
              />

              <DataTable
                title="Livestock"
                data={stats.livestock.map((l) => ({
                  ...l,
                  farmName:
                    stats.farms.find((f) => f._id === l.farmId)?.name ||
                    "Unknown",
                }))}
                columns={["type", "species", "breed", "count", "farmName"]}
              /> */}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

/* ---------------------------- Components ---------------------------- */

const StatCard = ({ title, count, color, icon }) => (
  <div
    className={`${color} text-white rounded-xl p-6 shadow-md cursor-pointer transform hover:scale-105 transition duration-300`}
  >
    <div className="flex flex-col items-center">
      <span className="text-4xl mb-2">{icon}</span>
      <h2 className="text-3xl font-bold">{count}</h2>
      <p className="text-sm mt-1 uppercase tracking-widest">{title}</p>
    </div>
  </div>
);

const DataTable = ({ title, data, columns }) => (
  <div className="bg-white shadow-lg rounded-xl p-6 overflow-x-auto">
    <h3 className="text-xl font-semibold text-gray-700 mb-4">{title}</h3>

    {data.length === 0 ? (
      <p className="text-gray-500 text-sm">No records found.</p>
    ) : (
      <table className="min-w-full border border-gray-200 rounded-md text-sm">
        <thead>
          <tr className="bg-gray-100 border-b">
            {columns.map((col) => (
              <th
                key={col}
                className="py-2 px-3 text-left text-gray-700 font-medium capitalize border-b"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="border-b hover:bg-gray-50 transition">
              {columns.map((col) => (
                <td key={col} className="py-2 px-3">
                  {col.toLowerCase().includes("date") && row[col]
                    ? new Date(row[col]).toLocaleDateString()
                    : row[col] || "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);
