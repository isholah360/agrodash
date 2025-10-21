import React, { useEffect, useState } from "react";
import DashboardCard from "./DashboardCard";
import Officercard from "./Officercard";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const Officer = () => {
  const [officerData, setOfficerData] = useState([]);
  const [lgaData, setLgaData] = useState([]);
  const [farmers, setFarmers] = useState([]);
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  useEffect(() => {
    const fetchOfficers = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await fetch("/api/v1/User/GetOfficers", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch officers");

        const result = await res.json();
        setOfficerData(result.data.data);
        setError("");
      } catch (err) {
        setError(err.message || "An error occurred");
        setOfficerData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOfficers();
  }, []);

  useEffect(() => {
    const fetchLga = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await fetch("/api/v1/Lga/GetLgas", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch LGAs");

        const result = await res.json();
        setLgaData(result.data.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchLga();
  }, []);

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await fetch("/api/v1/Farmer/GetFarmers", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch farmers");
        const data = await res.json();
        setFarmers(data.data.data || []);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchFarmers();
  }, []);

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await fetch("/api/v1/Farm/GetFarms", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch farms");
        const result = await res.json();
        setFarms(result.data.data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchFarms();
  }, []);

  // --- 🔎 Filter Logic ---
  const filteredOfficers = officerData.filter((officer) => {
    const search = searchTerm.toLowerCase();
    return (
      officer.firstname?.toLowerCase().includes(search) ||
      officer.lastname?.toLowerCase().includes(search) ||
      officer.phone?.toLowerCase().includes(search) ||
      officer.lga?.toLowerCase().includes(search)
    );
  });

  const handleDownloadExcel = () => {
    if (officerData.length === 0) {
      alert("No officer data available to export.");
      return;
    }

    // Map the data you want to export
    const exportData = officerData.map((officer) => {
      const totalFarmers =
        farmers.filter((farmer) => officer.userid === farmer.userId).length ||
        0;

      const totalCropFarms = officer.farmers?.reduce(
        (acc, farmer) => acc + (farmer.farms?.length || 0),
        0
      );

      const totalLivestockFarms = officer.farmers?.reduce(
        (acc, farmer) => acc + (farmer.livestocks?.length || 0),
        0
      );

      return {
        OfficerID: officer.userid,
        FirstName: officer.firstname,
        LastName: officer.lastname,
        Email: officer.email,
        Phone: officer.phone,
        LGA: officer.lga,
        TotalFarmers: totalFarmers,
        CropFarms: totalCropFarms || 0,
        LivestockFarms: totalLivestockFarms || 0,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Officers");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, `Officers_${new Date().toISOString().split("T")[0]}.xlsx`);
  };

  const totalPages = Math.ceil(filteredOfficers.length / itemsPerPage);
  const paginatedOfficers = filteredOfficers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  if (loading) {
    return <p className="text-gray-600 text-center mt-10">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center mt-10">Error: {error}</p>;
  }

  return (
    <div className="p-5">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-3">
        <h2 className="text-2xl font-semibold text-gray-800">🧑‍🌾 Officers</h2>

        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search by name, phone, or LGA..."
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

      {paginatedOfficers.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No officers found.</p>
      ) : (
        paginatedOfficers.map((officer, index) => (
          <Link
            to={`/officer/${officer.userid}`}
            key={index}
            className="no-underline"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-8 bg-gray-100 rounded-2xl p-5">
              <Officercard
                title={`${officer.firstname} ${officer.lastname}`}
                value={officer.email}
                phone={officer.phone}
                lga={`LGA: ${officer.lga}`}
                color="blue"
              />

              <DashboardCard
                title="Number of Farmers"
                value={
                  farmers.filter((farmer) => officer.userid === farmer.userId)
                    .length
                }
                color="indigo"
              />

              <DashboardCard
                title="Number of Crop Farms"
                value={officer.farmers?.reduce(
                  (acc, farmer) => acc + (farmer.farms?.length || 0),
                  0
                )}
                color="green"
              />

              <DashboardCard
                title="Number of Livestock Farms"
                value={officer.farmers?.reduce(
                  (acc, farmer) => acc + (farmer.livestocks?.length || 0),
                  0
                )}
                color="purple"
              />
            </div>
          </Link>
        ))
      )}

      {filteredOfficers.length > itemsPerPage && (
        <div className="flex justify-center items-center space-x-4 mt-6">
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

          <span className="text-gray-700">
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
  );
};

export default Officer;
