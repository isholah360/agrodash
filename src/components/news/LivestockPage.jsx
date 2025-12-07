import React, { useEffect, useState, useMemo } from "react";

const LivestockPage = () => {
  const [livestock, setLivestock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const token = localStorage.getItem("token");

  const emojiMap = {
    Cow: "🐄",
    Goat: "🐐",
    Sheep: "🐏",
    Pig: "🐖",
    Chicken: "🐔",
    Camel: "🐪",
    default: "🐾",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/get/livestocks/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch livestock");

        const data = await res.json();
        setLivestock(data);
      } catch (err) {
        setError("Failed to fetch livestock.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  // SEARCH
  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return livestock.filter(
      (i) =>
        i.type?.toLowerCase().includes(term) ||
        i.breed?.toLowerCase().includes(term) ||
        i.farmerId?.toLowerCase().includes(term) ||
        i.farmId?.toLowerCase().includes(term)
    );
  }, [search, livestock]);

  // PAGINATION
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6 px-[5%]">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">🐄 Livestock</h1>

      <input
        type="text"
        placeholder="🔍 Search livestock by type, breed, farmer..."
        className="w-full p-3 mb-6 border rounded-lg shadow-sm bg-white"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
      />

      {loading ? (
        <p>Loading livestock...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {paginated.map((item) => (
              <div
                key={item._id}
                className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-1">
                  {emojiMap[item.type] || emojiMap.default} {item.type}
                </h2>
                <p className="text-gray-600 mb-1">Breed: {item.breed}</p>
                <p className="text-gray-600 mb-1">Count: {item.count}</p>
                <p className="text-gray-600 mb-1">
                  Farmer: {item.farmerId?.slice(0, 8)}...
                </p>
                <p className="text-gray-500 text-xs mt-3">
                  Added: {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>

          {/* PAGINATION */}
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

export default LivestockPage;

// Reusable pagination component
const Pagination = ({ totalPages, currentPage, setCurrentPage, count, total }) => (
  <div className="flex justify-between items-center mt-10">
    <p className="text-gray-600">
      Showing {count} of {total}
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
            currentPage === n + 1 ? "bg-purple-600 text-white" : "border"
          }`}
        >
          {n + 1}
        </button>
      ))}

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
