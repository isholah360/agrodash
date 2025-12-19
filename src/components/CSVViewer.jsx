// // CSVViewer.jsx
// import React, { useState, useEffect, useMemo } from "react";
// import Papa from "papaparse";
// import { Text } from "lucide-react";

// const ROWS_PER_PAGE = 6;

// export default function CSVViewer() {
//   const [allData, setAllData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(0);

//   // 🔍 Search & Filters
//   const [searchTerm, setSearchTerm] = useState("");
//   const [regionFilter, setRegionFilter] = useState("");
//   const [cropFilter, setCropFilter] = useState("");

//   useEffect(() => {
//     const loadCSV = async () => {
//       try {
//         const response = await fetch("/report.csv");
//         const text = await response.text();

//         Papa.parse(text, {
//           header: true,
//           skipEmptyLines: true,
//           complete: (results) => {
//             const cleanData = results.data.map((row) => ({
//               id: row.farmid || row.farmerid || Math.random(),
//               name: row.farmer_full_name || "N/A",
//               email: row.farmer_email || "N/A",
//               phone: row.farmer_phone || "N/A",
//               region: row.regionname || "N/A",
//               crop: row.item_type_name || "N/A",
//               allied: row.business_type_name || "N/A",
//               farmSize: row.farmsize || "0",
//               plantingDate: row.plantingdate || "N/A",
//               harvestDate: row.harvestdate || "N/A",
//             }));

//             setAllData(cleanData);
//             setLoading(false);
//           },
//         });
//       } catch (err) {
//         console.error(err);
//         setLoading(false);
//       }
//     };

//     loadCSV();
//   }, []);

//   // 🎯 Unique filter values
//   const regions = useMemo(
//     () => [...new Set(allData.map((d) => d.region))],
//     [allData]
//   );

//   const crops = useMemo(
//     () => [...new Set(allData.map((d) => d.crop))],
//     [allData]
//   );
//   const allieds = useMemo(
//     () => [...new Set(allData.map((d) => d.allied))],
//     [allData]
//   );

//   // 🔎 Filtered Data
//   const filteredData = useMemo(() => {
//     return allData.filter((farmer) => {
//       const matchesSearch =
//         farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         farmer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         farmer.phone.includes(searchTerm);

//       const matchesRegion =
//         regionFilter === "" || farmer.region === regionFilter;

//       const matchesCrop = cropFilter === "" || farmer.crop === cropFilter;

//       return matchesSearch && matchesRegion && matchesCrop;
//     });
//   }, [allData, searchTerm, regionFilter, cropFilter]);

//   const totalPages = Math.ceil(filteredData.length / ROWS_PER_PAGE);

//   const paginatedData = filteredData.slice(
//     currentPage * ROWS_PER_PAGE,
//     (currentPage + 1) * ROWS_PER_PAGE
//   );

//   useEffect(() => {
//     setCurrentPage(0);
//   }, [searchTerm, regionFilter, cropFilter]);

//   if (loading) return <div className="p-6 pt-35">Loading farmer data…</div>;

//   return (
//     <div className="p-6 max-w-7xl mx-auto pt-35">
//       <h2 className="text-2xl font-bold mb-6 text-green-700">
//         Farmer Records ({filteredData.length})
//       </h2>

//       {/* 🔍 Filters */}
//       <div className="bg-white p-4 rounded-lg shadow mb-6 grid gap-4 md:grid-cols-3">
//         <input
//           type="text"
//           placeholder="Search name, email or phone…"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="border rounded px-3 py-2 w-full focus:ring-2 focus:ring-green-500"
//         />

//         <select
//           value={regionFilter}
//           onChange={(e) => setRegionFilter(e.target.value)}
//           className="border rounded px-3 py-2"
//         >
//           <option value="">All Regions</option>
//           {regions.map((region) => (
//             <option key={region} value={region}>
//               {region}
//             </option>
//           ))}
//         </select>

//         <select
//           value={cropFilter}
//           onChange={(e) => setCropFilter(e.target.value)}
//           className="border rounded px-3 py-2"
//         >
//           <option value="">All Crops</option>
//           {crops.map((crop) => (
//             <option key={crop} value={crop}>
//               {crop}
//             </option>
//           ))}
//           {/* {allieds.map((crop) => (
//             <option key={crop} value={crop}>
//               {crop}
//             </option>
//           ))} */}
//         </select>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {paginatedData.map((farmer, idx) => (
//           <div
//             key={farmer.id || idx}
//             className="bg-white border rounded-xl p-5 shadow hover:shadow-lg transition"
//           >
//             {/* Header */}
//             <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center gap-2">
//               👨‍🌾 {farmer.name}
//             </h3>

//             {/* Info Grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm text-gray-700">
//               <p className="flex items-center gap-2">
//                 ✉️ <span className="font-medium">Email:</span>
//                 <span className="truncate">{farmer.email}</span>
//               </p>

//               <p className="flex items-center gap-2">
//                 📞 <span className="font-medium">Phone:</span>
//                 {farmer.phone}
//               </p>

//               <p className="flex items-center gap-2">
//                 🌍 <span className="font-medium">Region:</span>
//                 {farmer.region}
//               </p>

//               <p className="flex items-center gap-2">
//                 🌱 <span className="font-medium">Commodity:</span>
//                 {farmer.crop}
//               </p>

//               <p className="flex items-center gap-2">
//                 📐 <span className="font-medium">Farm Size:</span>
//                 {farmer.farmSize} ha
//               </p>

//               <p className="flex items-center gap-2">
//                 🌾 <span className="font-medium">Planting:</span>
//                 {farmer.plantingDate}
//               </p>

//               <p className="flex items-center gap-2 sm:col-span-2">
//                 🧺 <span className="font-medium">Harvest:</span>
//                 {farmer.harvestDate}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* 📄 Pagination */}
//       <div className="mt-8 flex justify-between items-center">
//         <button
//           onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
//           disabled={currentPage === 0}
//           className="px-4 py-2 bg-green-600 text-white rounded disabled:bg-gray-300"
//         >
//           Previous
//         </button>

//         <span className="text-sm">
//           Page {currentPage + 1} of {totalPages || 1}
//         </span>

//         <button
//           onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
//           disabled={currentPage >= totalPages - 1}
//           className="px-4 py-2 bg-green-600 text-white rounded disabled:bg-gray-300"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

// CSVViewer.jsx
import React, { useState, useEffect, useMemo } from "react";
import Papa from "papaparse";

const ROWS_PER_PAGE = 6;
const ENTERPRISE_TYPES = ["AGRO_ALLIED", "CROP", "LIVESTOCK"];

export default function CSVViewer() {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  // 🔍 Search & Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const [commodityFilter, setCommodityFilter] = useState("");
  const [enterpriseFilter, setEnterpriseFilter] = useState("");

  useEffect(() => {
    const loadCSV = async () => {
      try {
        const response = await fetch("/report.csv");
        const text = await response.text();

        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const cleanData = results.data.map((row, idx) => ({
              id: row.farmid || row.farmerid || idx,

              name: row.farmer_full_name || "N/A",
              email: row.farmer_email || "N/A",
              phone: row.farmer_phone || "N/A",

              region: row.regionname || "N/A",

              // 🏷️ Enterprise category
              enterprise: row.enterprise_type || "N/A",

              // 🌱 Commodity (crop OR allied)
              commodity:
                row.enterprise_type === "AGRO_ALLIED"
                  ? row.business_type_name || "N/A"
                  : row.item_type_name || "N/A",

              farmSize: row.farmsize || "0",
              plantingDate: row.plantingdate || "N/A",
              harvestDate: row.harvestdate || "N/A",
            }));

            setAllData(cleanData);
            setLoading(false);
          },
        });
      } catch (err) {
        console.error("CSV load error:", err);
        setLoading(false);
      }
    };

    loadCSV();
  }, []);

  // 🎯 Unique values for filters
  const regions = useMemo(
    () => [...new Set(allData.map((d) => d.region))],
    [allData]
  );

  const commodities = useMemo(
    () => [...new Set(allData.map((d) => d.commodity))],
    [allData]
  );

  // 🔎 Filtered data
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

      const matchesEnterprise =
        enterpriseFilter === "" || farmer.enterprise === enterpriseFilter;

      return (
        matchesSearch && matchesRegion && matchesCommodity && matchesEnterprise
      );
    });
  }, [allData, searchTerm, regionFilter, commodityFilter, enterpriseFilter]);

  const totalPages = Math.ceil(filteredData.length / ROWS_PER_PAGE);

  const paginatedData = filteredData.slice(
    currentPage * ROWS_PER_PAGE,
    (currentPage + 1) * ROWS_PER_PAGE
  );

  // Reset page on filter change
  useEffect(() => {
    setCurrentPage(0);
  }, [searchTerm, regionFilter, commodityFilter, enterpriseFilter]);

  if (loading) return <div className="p-6 pt-35">Loading farmer data…</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto pt-35">
      <h2 className="text-2xl font-bold mb-6 text-green-700">
        Farmer Records ({filteredData.length})
      </h2>

      {/* 🔍 Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6 grid gap-4 md:grid-cols-4">
        <input
          type="text"
          placeholder="Search name, email or phone…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-3 py-2 w-full focus:ring-2 focus:ring-green-500"
        />

        <select
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">All Regions</option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
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

        <select
          value={enterpriseFilter}
          onChange={(e) => setEnterpriseFilter(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">All Enterprise Types</option>
          {ENTERPRISE_TYPES.map((type) => (
            <option key={type} value={type}>
              {type.replace("_", " ")}
            </option>
          ))}
        </select>
      </div>

      {/* 📋 Cards */}
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
              <p>
                ✉️ <strong>Email:</strong> {farmer.email}
              </p>
              <p>
                📞 <strong>Phone:</strong> {farmer.phone}
              </p>
              <p>
                🌍 <strong>Region:</strong> {farmer.region}
              </p>
              <p>
                🏷️ <strong>Enterprise:</strong> {farmer.enterprise}
              </p>
              <p>
                🌱 <strong>Commodity:</strong> {farmer.commodity}
              </p>
              <p>
                📐 <strong>Farm Size:</strong> {farmer.farmSize} ha
              </p>
              <p>
                🌾 <strong>Planting:</strong> {farmer.plantingDate}
              </p>
              <p>
                🧺 <strong>Harvest:</strong> {farmer.harvestDate}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 📄 Pagination */}
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
