import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const Livestocks = () => {
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await fetch("api/v1/LiveStockRegistry/GetLiveStockRegistries", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch farms");
        }

        const result = await res.json();
        console.log("Raw data:", result.data.data);
        setFarms(result.data.data || []);
        setError("");
      } catch (err) {
        console.error("Error fetching farms:", err);
        setError(err.message || "An error occurred");
        setFarms([]);
      } finally {
        setLoading(false);``
      }
    };

    fetchFarms();
  }, []);

  // 🧠 Group farms by farmid
  const groupedFarms = farms.reduce((acc, item) => {
    const id = item.farmid;
    if (!id) return acc;

    if (!acc[id]) {
      acc[id] = {
        farmid: id,
        name: item.name,
        farmerName: item.farmerName,
        phone: item.phone,
        lga: item.lga,
        farmsize: item.farmsize,
        location: item.location,
        livestocks: [],
      };
    }

    acc[id].livestocks.push({
      type: item.livestocktype,
      quantity: item.quantity,
    });

    return acc;
  }, {});

  const groupedFarmsArray = Object.values(groupedFarms);

  // 🔍 Filtering
  const filteredFarms = groupedFarmsArray.filter((farm) => {
    const search = searchTerm.toLowerCase();
    return (
      farm.name?.toLowerCase().includes(search) ||
      farm.farmerName?.toLowerCase().includes(search) ||
      farm.phone?.toLowerCase().includes(search) ||
      farm.lga?.toLowerCase().includes(search) ||
      farm.farmsize?.toString().toLowerCase().includes(search) ||
      farm.farmid?.toString().toLowerCase().includes(search)
    );
  });

  // 📄 Pagination
  const totalPages = Math.ceil(filteredFarms.length / itemsPerPage);
  const paginatedFarms = filteredFarms.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  // 📥 Excel Export (grouped)
  const handleDownloadExcel = () => {
    const excelData = groupedFarmsArray.map((farm) => ({
      FarmID: farm.farmid,
      Name: farm.name,
      Farmer: farm.farmerName,
      Phone: farm.phone,
      LGA: farm.lga,
      FarmSize: farm.farmsize,
      Location: farm.location,
      LivestockSummary: farm.livestocks
        .map((l) => `${l.type}: ${l.quantity}`)
        .join(", "),
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Farms");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "Grouped_Farms_List.xlsx");
  };

  // 🌀 Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">Loading farms...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header + Search + Download */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-gray-800">
            🌾 Livestock Farms List ({filteredFarms.length})
          </h2>

          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search by name, farmer, phone, or LGA..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <button
              onClick={handleDownloadExcel}
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg shadow-md transition"
            >
              📊 Download Excel
            </button>
          </div>
        </div>

        {/* Error or Results */}
        {error ? (
          <div className="text-red-600 bg-red-100 p-4 rounded-md">{error}</div>
        ) : filteredFarms.length === 0 ? (
          <p className="text-gray-500">No farms found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paginatedFarms.map((farm, index) => (
              <div
                key={farm.farmid || index}
                className="border rounded-lg p-4 shadow-sm bg-white"
              >
                <h3 className="font-semibold text-lg text-gray-900 mb-1">
                  {farm.name || `Farm ${index + 1}`}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  👨‍🌾 {farm.farmerName} | 📞 {farm.phone}
                </p>

                {farm.location && (
                  <p className="text-sm text-gray-600 mb-2">📍 {farm.location}</p>
                )}
                {farm.lga && <p className="text-sm text-gray-600 mb-2">🏙️ {farm.lga}</p>}
                {farm.farmsize && (
                  <p className="text-sm text-gray-600 mb-2">📏 {farm.farmsize}</p>
                )}

                {/* Livestock list */}
                <div className="mt-2">
                  <h4 className="font-semibold text-gray-800 mb-1">Livestock:</h4>
                  {farm.livestocks.map((ls, i) => (
                    <p key={i} className="text-sm text-gray-600 ml-2">
                      • {ls.type}: {ls.quantity}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {filteredFarms.length > itemsPerPage && (
          <div className="flex justify-center items-center space-x-4 mt-8">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-green-500 text-white hover:bg-green-600"
              }`}
            >
              Previous
            </button>

            <span className="text-gray-700 font-medium">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-green-500 text-white hover:bg-green-600"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Livestocks;
