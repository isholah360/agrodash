import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function GetFarmer() {
  const [farmers, setFarmers] = useState([]);
  const [theiD, setTheiD] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const Id = localStorage.getItem("userId");
        setTheiD(Id);

        const response = await fetch(`/api/v1/Farmer/GetFarmers`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch farmers: ${response.status}`);
        }

        const data = await response.json();
        setFarmers(data.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFarmers();
  }, []);

  // --- Filter Farmers by Search ---
  const filteredFarmers = farmers.filter((farmer) => {
    const search = searchTerm.toLowerCase();
    return (
      farmer.firstname?.toLowerCase().includes(search) ||
      farmer.lastname?.toLowerCase().includes(search) ||
      farmer.phonenumber?.toLowerCase().includes(search) ||
      farmer.email?.toLowerCase().includes(search) ||
      farmer.lga?.toLowerCase().includes(search)
    );
  });

  // --- Pagination Logic ---
  const totalPages = Math.ceil(filteredFarmers.length / itemsPerPage);
  const paginatedFarmers = filteredFarmers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-green-700 text-lg font-semibold">
        Loading farmers...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 font-semibold mt-10">
        Error: {error}
      </div>
    );
  }

  const handleDownloadExcel = () => {
    if (farmers.length === 0) {
      alert("No farmers available to download.");
      return;
    }

    const exportData = farmers.map((farmer) => ({
      FarmerID: farmer.farmerid,
      FirstName: farmer.firstname,
      LastName: farmer.lastname,
      Email: farmer.email,
      PhoneNumber: farmer.phonenumber,
      LGA: farmer.lga || "",
      Town: farmer.town || "",
      Association: farmer.associationname || "",
      Farms: farmer.farms?.length || 0,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Farmers");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, `Farmers_${new Date().toISOString().split("T")[0]}.xlsx`);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-4 md:mb-0">
          👨‍🌾 Registered Farmers
        </h1>

        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search by name, phone, email, or LGA..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <button
            onClick={handleDownloadExcel}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg transition"
          >
            📊 Download Excel
          </button>
        </div>
      </div>

      {paginatedFarmers.length === 0 ? (
        <p className="text-center text-gray-500">No farmers found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {paginatedFarmers.map((farmer) => (
            <div
              key={farmer.farmerid}
              className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Optional: Display role info */}
              {/* <div className="px-4 py-2 bg-gray-50 text-sm text-gray-600 text-center border-b">
                {farmer.userId === 4 ? "Admin" : "Officer"}
              </div> */}

              <div className="w-full h-48 overflow-hidden">
                <img
                  src={farmer.photourl || "https://via.placeholder.com/200"}
                  alt={farmer.firstname}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4 text-center">
                <h2 className="text-lg font-semibold text-gray-800 mb-1">
                  {farmer.firstname} {farmer.lastname}
                </h2>
                <p className="text-sm text-gray-600 mb-1">{farmer.email}</p>
                <p className="text-sm text-gray-600 mb-2">
                  📞 {farmer.phonenumber}
                </p>
                <p className="text-green-700 font-medium">
                  Farms: {farmer.farms?.length || 0}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 📄 Pagination Controls */}
      {filteredFarmers.length > itemsPerPage && (
        <div className="flex justify-center items-center space-x-4 mt-8">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700"
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
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
