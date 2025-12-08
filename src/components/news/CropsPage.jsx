import React, { useEffect, useState, useMemo } from "react";

const CropsPage = () => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const token = localStorage.getItem("token");

  const cropEmoji = {
    Maize: "🌽",
    Rice: "🍚",
    Cassava: "🌱",
    Yam: "🥔",
    Cocoa: "🍫",
    default: "🌾",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${import.meta.env.VITE_API_URL}/get/crops/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch crops");

        const data = await res.json();
        setCrops(data);
      } catch (err) {
        setError("Failed to fetch crop data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const filtered = useMemo(() => {
    const t = search.toLowerCase();
    return crops.filter(
      (c) =>
        c.cropType?.toLowerCase().includes(t) ||
        c.variety?.toLowerCase().includes(t) ||
        c.farmerId?.toLowerCase().includes(t)
    );
  }, [search, crops]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6 px-[5%]">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">🌾 Crops</h1>

      <input
        type="text"
        placeholder="🔍 Search crop by type, variety, farmer..."
        className="w-full p-3 mb-6 border rounded-lg shadow-md bg-white"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
      />

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {paginated.map((crop) => (
              <div
                key={crop._id}
                className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-1">
                  {cropEmoji[crop.cropType] || cropEmoji.default}{" "}
                  {crop.cropType}
                </h2>
                <p className="text-gray-600 mb-1">Variety: {crop.variety}</p>
                <p className="text-gray-600 mb-1">
                  Planted: {new Date(crop.plantingDate).toLocaleDateString()}
                </p>
                <p className="text-gray-500 text-xs mt-3">
                  Farmer: {crop.farmerId?.slice(0, 8)}...
                </p>
              </div>
            ))}
          </div>

          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            count={paginated.length}
            total={filtered.length}
          />
        </>
      )}
    </div>
  );
};

export default CropsPage;

// Reusable Pagination Component
const Pagination = ({
  totalPages,
  currentPage,
  setCurrentPage,
  count,
  total,
}) => (
  <div className="flex justify-between items-center mt-10">
    <p className="text-gray-600">
      Showing {count} of {total}
    </p>

    <div className="flex space-x-2">
      {/* PREV */}
      <button
        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded disabled:opacity-40"
      >
        Prev
      </button>

      {/* PAGE NUMBERS */}
      {[...Array(totalPages).keys()].map((n) => (
        <button
          key={n}
          onClick={() => setCurrentPage(n + 1)}
          className={`px-3 py-1 rounded ${
            currentPage === n + 1 ? "bg-purple-600 text-white" : "border"
          }`}
        >
          {n + 1}
        </button>
      ))}

      {/* NEXT */}
      <button
        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded disabled:opacity-40"
      >
        Next
      </button>
    </div>
  </div>
);
