// import React, { useEffect, useState, useMemo } from "react";

// const LivestockPage = () => {
//   const [livestock, setLivestock] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const pageSize = 6;

//   const token = localStorage.getItem("token");

//   const emojiMap = {
//     Cow: "🐄",
//     Goat: "🐐",
//     Sheep: "🐏",
//     Pig: "🐖",
//     Chicken: "🐔",
//     Camel: "🐪",
//     default: "🐾",
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);

//         const res = await fetch(`${import.meta.env.VITE_API_URL}/get/livestocks/all`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (!res.ok) throw new Error("Failed to fetch livestock");

//         const data = await res.json();
//         setLivestock(data);
//       } catch (err) {
//         setError("Failed to fetch livestock.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [token]);

//   // SEARCH
//   const filtered = useMemo(() => {
//     const term = search.toLowerCase();
//     return livestock.filter(
//       (i) =>
//         i.type?.toLowerCase().includes(term) ||
//         i.breed?.toLowerCase().includes(term) ||
//         i.farmerId?.toLowerCase().includes(term) ||
//         i.farmId?.toLowerCase().includes(term)
//     );
//   }, [search, livestock]);

//   // PAGINATION
//   const totalPages = Math.ceil(filtered.length / pageSize);
//   const paginated = filtered.slice(
//     (currentPage - 1) * pageSize,
//     currentPage * pageSize
//   );

//   return (
//     <div className="min-h-screen bg-gray-100 p-6 px-[5%]">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800">🐄 Livestock</h1>

//       <input
//         type="text"
//         placeholder="🔍 Search livestock by type, breed, farmer..."
//         className="w-full p-3 mb-6 border rounded-lg shadow-sm bg-white"
//         value={search}
//         onChange={(e) => {
//           setSearch(e.target.value);
//           setCurrentPage(1);
//         }}
//       />

//       {loading ? (
//         <p>Loading livestock...</p>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : (
//         <>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//             {paginated.map((item) => (
//               <div
//                 key={item._id}
//                 className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition"
//               >
//                 <h2 className="text-xl font-bold text-gray-800 mb-1">
//                   {emojiMap[item.type] || emojiMap.default} {item.type}
//                 </h2>
//                 <p className="text-gray-600 mb-1">Breed: {item.breed}</p>
//                 <p className="text-gray-600 mb-1">Count: {item.count}</p>
//                 <p className="text-gray-600 mb-1">
//                   Farmer: {item.farmerId?.slice(0, 8)}...
//                 </p>
//                 <p className="text-gray-500 text-xs mt-3">
//                   Added: {new Date(item.createdAt).toLocaleDateString()}
//                 </p>
//               </div>
//             ))}
//           </div>

//           {/* PAGINATION */}
//           <Pagination
//             totalPages={totalPages}
//             currentPage={currentPage}
//             setCurrentPage={setCurrentPage}
//             count={paginated.length}
//             total={filtered.length}
//           />
//         </>
//       )}
//     </div>
//   );
// };

// export default LivestockPage;

// // Reusable pagination component
// const Pagination = ({ totalPages, currentPage, setCurrentPage, count, total }) => (
//   <div className="flex justify-between items-center mt-10">
//     <p className="text-gray-600">
//       Showing {count} of {total}
//     </p>

//     <div className="flex space-x-1">
//       <button
//         onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
//         disabled={currentPage === 1}
//         className="px-3 py-1 border rounded disabled:opacity-40"
//       >
//         Prev
//       </button>

//       {[...Array(totalPages).keys()].map((n) => (
//         <button
//           key={n}
//           onClick={() => setCurrentPage(n + 1)}
//           className={`px-3 py-1 rounded ${
//             currentPage === n + 1 ? "bg-purple-600 text-white" : "border"
//           }`}
//         >
//           {n + 1}
//         </button>
//       ))}

//       <button
//         onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
//         disabled={currentPage === totalPages}
//         className="px-3 py-1 border rounded disabled:opacity-40"
//       >
//         Next
//       </button>
//     </div>
//   </div>
// );

import React, { useState, useEffect, useMemo } from "react";

const ROWS_PER_PAGE = 6;
const API_URL = "/api/v1/DashboardReporting/GetReport";

const formatDate = (dateObj) => {
  if (!dateObj) return "N/A";
  const { year, month, day } = dateObj;
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
    2,
    "0"
  )}`;
};

export default function LivestockPage() {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const [commodityFilter, setCommodityFilter] = useState("");

  // Fetch API
  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        setLoading(true);
        setError("");
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("Authentication token not found");

        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok)
          throw new Error(`Failed to fetch farmers: ${response.status}`);
        const json = await response.json();
        if (!json.success)
          throw new Error("API returned an unsuccessful response");

        const cleanData = json.data
          .filter((row) => row.enterpriseType === "LIVESTOCK")
          .map((row, idx) => ({
            id: `${row.farmid}-${idx}`,
            name: row.farmerFullName || "N/A",
            email: row.farmerEmail || "N/A",
            phone: row.farmerPhone || "N/A",
            region: row.regionname || "N/A",
            enterprise: row.enterpriseType || "N/A",
            commodity: row.itemTypeName || "N/A",
            farmSize: row.farmsize ?? "0",
            plantingDate: formatDate(row.plantingdate),
            harvestDate: formatDate(row.harvestdate),
          }));

        setAllData(cleanData);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFarmers();
  }, []);

  const regions = useMemo(
    () => [...new Set(allData.map((d) => d.region))],
    [allData]
  );
  const commodities = useMemo(
    () => [...new Set(allData.map((d) => d.commodity))],
    [allData]
  );

  const filteredData = useMemo(() => {
    return allData.filter((farmer) => {
      const matchesSearch =
        farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        farmer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        farmer.phone.includes(searchTerm);

      const matchesRegion =
        regionFilter === "" || farmer.region === regionFilter;
      const matchesCommodity =
        commodityFilter === "" || farmer.commodity === commodityFilter;

      return matchesSearch && matchesRegion && matchesCommodity;
    });
  }, [allData, searchTerm, regionFilter, commodityFilter]);

  const totalPages = Math.ceil(filteredData.length / ROWS_PER_PAGE);
  const paginatedData = filteredData.slice(
    currentPage * ROWS_PER_PAGE,
    (currentPage + 1) * ROWS_PER_PAGE
  );

  useEffect(
    () => setCurrentPage(0),
    [searchTerm, regionFilter, commodityFilter]
  );

  if (loading) return <div className="p-6 pt-10">Loading crop farmers…</div>;
  if (error) return <div className="p-6 pt-10 text-red-600">❌ {error}</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto pt-10">
      <h2 className="text-2xl font-bold mb-6 text-green-700">
        Livestock Farmers ({filteredData.length})
      </h2>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6 grid gap-4 md:grid-cols-3">
        <input
          type="text"
          placeholder="Search name, email or phone…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <select
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">All Regions</option>
          {regions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <select
          value={commodityFilter}
          onChange={(e) => setCommodityFilter(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">All Commodities</option>
          {commodities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Farmer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paginatedData.map((farmer) => (
          <div
            key={farmer.id}
            className="bg-white border rounded-xl p-5 shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-green-700 mb-4">
              👨‍🌾 {farmer.name}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm text-gray-700">
              <p>✉️ {farmer.email}</p>
              <p>📞 {farmer.phone}</p>
              <p>🌍 {farmer.region}</p>
              <p>🏷️ {farmer.enterprise}</p>
              <p>🌱 {farmer.commodity}</p>
              <p>📐 {farmer.farmSize} ha</p>
              <p>🌾 Planting: {farmer.plantingDate}</p>
              <p>🧺 Harvest: {farmer.harvestDate}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-between items-center">
        <button
          onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
          disabled={currentPage === 0}
          className="px-4 py-2 bg-green-600 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span className="text-sm">
          Page {currentPage + 1} of {totalPages || 1}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
          disabled={currentPage >= totalPages - 1}
          className="px-4 py-2 bg-green-600 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}
