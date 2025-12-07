import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";

const OfficersPage = () => {
  const [officers, setOfficers] = useState([]);
  const [farmers, setFarmers] = useState([]);
  const [crops, setCrops] = useState([]);
  const [farms, setFarms] = useState([]);
  const [allied, setAllied] = useState([]);
  const [livestock, setLivestock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // NEW SEARCH + PAGINATION STATES
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);

        const [offRes, farmerRes, farmRes, cropRes, liveRes, agroRes] =
          await Promise.all([
            fetch("/api/get/officers", { headers: { Authorization: `Bearer ${token}` } }),
            fetch("/api/get/farmers", { headers: { Authorization: `Bearer ${token}` } }),
            fetch("/api/get/farms/all", { headers: { Authorization: `Bearer ${token}` } }),
            fetch("/api/get/crops/all", { headers: { Authorization: `Bearer ${token}` } }),
            fetch("/api/get/livestocks/all", { headers: { Authorization: `Bearer ${token}` } }),
            fetch("/api/Agroallied/pro/getall", { headers: { Authorization: `Bearer ${token}` } }),
          ]);

        const [
          officersData,
          farmersData,
          farmsData,
          cropsData,
          livestockData,
          alliedData
        ] = await Promise.all([
          offRes.json(),
          farmerRes.json(),
          farmRes.json(),
          cropRes.json(),
          liveRes.json(),
          agroRes.json(),
        ]);

        setOfficers(officersData);
        setFarmers(farmersData);
        setFarms(farmsData);
        setCrops(cropsData);
        setLivestock(livestockData);
        setAllied(alliedData);
        console.log("✅ farmer data loaded:", farmers);
      } catch (err) {
        console.error(err);
        setError("Failed to load officers data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [token]);

  const livestockEmoji = {
    Cow: "🐄",
    Goat: "🐐",
    Sheep: "🐏",
    Pig: "🐖",
    Chicken: "🐔",
    default: "🐾",
  };

  // ====================================================================
  // SEARCH LOGIC
  // ====================================================================
  const filteredOfficers = useMemo(() => {
    const term = search.toLowerCase();

    return officers.filter((officer) => {
      const officerFarmers = farmers.filter((f) => f.officerId === officer._id);
      const officerCrops = crops.filter((c) => officerFarmers.some((f) => f._id === c.farmerId));
      const officerLivestock = livestock.filter((l) => officerFarmers.some((f) => f._id === l.farmerId));

      return (
        officer.name?.toLowerCase().includes(term) ||
        officer.email?.toLowerCase().includes(term) ||
        officer.phone?.toLowerCase().includes(term) ||
        officer.address?.toLowerCase().includes(term) ||
        officerFarmers.some((f) => f.name.toLowerCase().includes(term)) ||
        officerCrops.some((c) => c.cropType.toLowerCase().includes(term)) ||
        officerLivestock.some((l) => l.type.toLowerCase().includes(term))
      );
    });
  }, [search, officers, farmers, crops, livestock]);
   
  console.log("🔍 Filtered farmer:",farmers);
  // ====================================================================
  // PAGINATION
  // ====================================================================
  const totalPages = Math.ceil(filteredOfficers.length / pageSize);
  const paginatedOfficers = filteredOfficers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6 px-[5%]">

      <h1 className="text-3xl font-bold mb-6 text-gray-800">👮‍♂️ Officers Dashboard</h1>

      {/* SEARCH BAR */}
      <input
        type="text"
        placeholder="🔍 Search officer by name, email, phone, farmer, crop, livestock..."
        className="w-full p-3 mb-6 border rounded-lg shadow-sm bg-white"
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
          {/* OFFICER CARDS DISPLAY */}
          <div className="space-y-8">
            {paginatedOfficers.map((officer) => {
              const officerFarmers = farmers.filter((f) => f.officerId === officer._id);
              const farmersWithFarmCount = officerFarmers.map((farmer) => {
                const farmerFarms = farms.filter((farm) => farm.farmerId === farmer._id);
                return { ...farmer, farmCount: farmerFarms.length };
              });

              const officerCrops = crops.filter((c) => officerFarmers.some((f) => f._id === c.farmerId));
              const officerLivestock = livestock.filter((l) => officerFarmers.some((f) => f._id === l.farmerId));

              const aggregatedLivestock = officerLivestock.reduce((acc, l) => {
                const key = `${l.type} (${l.breed})`;
                if (!acc[key]) acc[key] = { ...l, count: 0 };
                acc[key].count += l.count || 0;
                return acc;
              }, {});

              const totalLivestock = Object.values(aggregatedLivestock).reduce((sum, l) => sum + l.count, 0);

              const cropTypes = [...new Set(officerCrops.map((c) => c.cropType))];

              return (
                <div
                  key={officer._id}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition"
                >
                  <Link to={`/officers/${officer._id}`}>
                    <div className="flex justify-between items-center mb-5">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800">👮 {officer.name}</h2>
                        <p className="text-gray-500">{officer.email}</p>
                      </div>
                      <span className="text-gray-600">🐾 Total Livestock: {totalLivestock}</span>
                    </div>

                    {/* Farmers */}
                    <h3 className="font-semibold mb-2">👩‍🌾 Farmers</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {farmersWithFarmCount.length === 0 ? (
                        <p className="text-gray-400">No farmers</p>
                      ) : (
                        farmersWithFarmCount.map((f) => (
                          <div key={f._id} className="bg-green-50 px-3 py-1 rounded-full shadow text-sm">
                            👩‍🌾 {f.name} – 🏡 {f.farmCount} farms
                          </div>
                        ))
                      )}
                    </div>

                    {/* Crops */}
                    <h3 className="font-semibold mb-2">🌾 Crops</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {cropTypes.length === 0 ? (
                        <p className="text-gray-400">No crops</p>
                      ) : (
                        cropTypes.map((c, i) => (
                          <span key={i} className="bg-yellow-100 px-3 py-1 rounded-full shadow text-sm">
                            🌾 {c}
                          </span>
                        ))
                      )}
                    </div>

                    {/* Livestock */}
                    <h3 className="font-semibold mb-2">🐄 Livestock</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {Object.entries(aggregatedLivestock).map(([key, l]) => (
                        <div key={key} className="bg-rose-50 px-4 py-2 rounded-xl shadow text-sm flex justify-between">
                          <span>{livestockEmoji[l.type] || livestockEmoji.default} {key}</span>
                          <span className="bg-rose-100 px-2 py-1 rounded-full text-xs">🔢 {l.count}</span>
                        </div>
                      ))}
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* PAGINATION */}
          <div className="flex justify-between items-center mt-8">
            <p className="text-gray-600">Showing {paginatedOfficers.length} of {filteredOfficers.length} officers</p>

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
        </>
      )}
    </div>
  );
};

export default OfficersPage;
