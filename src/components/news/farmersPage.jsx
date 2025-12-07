import React, { useEffect, useState, useMemo } from "react";

const FarmersPage = () => {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search + Pagination
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${import.meta.env.VITE_API_URL}/get/farmers`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch farmers");

        const data = await res.json();
        setFarmers(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load farmers data.");
      } finally {
        setLoading(false);
      }
    };

    fetchFarmers();
  }, [token]);

  // ====================================================================
  // SEARCH LOGIC
  // ====================================================================
  const filteredFarmers = useMemo(() => {
    const term = search.toLowerCase();

    return farmers.filter(
      (f) =>
        f.name?.toLowerCase().includes(term) ||
        f.email?.toLowerCase().includes(term) ||
        f.phone?.toLowerCase().includes(term) ||
        f.address?.toLowerCase().includes(term) ||
        f.lga?.toLowerCase().includes(term) ||
        f.nationalId?.toLowerCase().includes(term) ||
        f.officerId?.toLowerCase().includes(term)
    );
  }, [search, farmers]);

  // ====================================================================
  // PAGINATION
  // ====================================================================
  const totalPages = Math.ceil(filteredFarmers.length / pageSize);
  const paginatedFarmers = filteredFarmers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6 px-[5%]">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">👩‍🌾 Farmers</h1>

      {/* SEARCH BAR */}
      <input
        type="text"
        placeholder="🔍 Search farmers by name, email, phone, LGA, address..."
        className="w-full p-3 mb-6 border rounded-lg shadow-sm bg-white"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
      />

      {loading ? (
        <p className="text-center text-gray-600">Loading farmers...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          {/* FARMERS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {paginatedFarmers.map((farmer) => (
              <div
                key={farmer._id}
                className="bg-white p-5 shadow-md rounded-xl hover:shadow-xl transition"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-1">
                  👨‍🌾 {farmer.name}
                </h2>
                <p className="text-gray-600 text-sm mb-1">📞 {farmer.phone}</p>
                <p className="text-gray-600 text-sm mb-1">✉️ {farmer.email}</p>
                <p className="text-gray-600 text-sm mb-1">
                  📍 {farmer.address}
                </p>
                <p className="text-gray-600 text-sm mb-1">
                  🗺️ LGA: {farmer.lga}
                </p>
                <p className="text-gray-600 text-sm mb-1">
                  🧑‍👧‍👦 Household Size: {farmer.houseHold}
                </p>
                <p className="text-gray-600 text-sm mb-1">
                  🎂 Age: {farmer.age}
                </p>
                <p className="text-gray-600 text-sm mb-1">
                  🆔 National ID: {farmer.nationalId}
                </p>
                <p className="text-gray-500 text-xs mt-3">
                  Registered: {new Date(farmer.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>

          {/* PAGINATION */}
          <div className="flex justify-between items-center mt-10">
            <p className="text-gray-600">
              Showing {paginatedFarmers.length} of {filteredFarmers.length}{" "}
              farmers
            </p>

            <div className="flex space-x-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded disabled:opacity-40"
              >
                Prev
              </button>

              {[...Array(totalPages).keys()].map((n) => (
                <button
                  key={n}
                  onClick={() => setCurrentPage(n + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === n + 1 ? "bg-green-700 text-white" : "border"
                  }`}
                >
                  {n + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FarmersPage;
