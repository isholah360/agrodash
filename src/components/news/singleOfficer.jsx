import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const SingleOfficer = () => {
  const { id: officerId } = useParams();
  const [data, setData] = useState(null);
  const [farmerFarms, setFarmerFarms] = useState({}); // ✅ store farms grouped by farmerId
  const [loading, setLoading] = useState(true);
  const [farmsLoading, setFarmsLoading] = useState(false);
  const [error, setError] = useState(null);

  const baseUrl = import.meta.env.VITE_API_URL || ""
  // ✅ Fetch officer + farmers
  useEffect(() => {
    const fetchOfficerData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/officers/${officerId}`);
        if (!response.ok) throw new Error("Failed to fetch officer data");
        const result = await response.json();

     

        setData(result);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOfficerData();
  }, [officerId]);
  console.log(data);

  useEffect(() => {
    const fetchAllFarms = async () => {
      if (!data?.farmers?.length) return;

      setFarmsLoading(true);
      const farmsByFarmer = {};

      try {
        await Promise.all(
          data.farmers.map(async (farmer) => {
            const res = await fetch(`/api/farms/farmer/${farmer._id}`);
            if (res.ok) {
              const farms = await res.json();
              farmsByFarmer[farmer._id] = farms;
            } else {
              farmsByFarmer[farmer._id] = [];
            }
          })
        );

        setFarmerFarms(farmsByFarmer);
      } catch (err) {
        console.error("Error fetching farms:", err);
        setError("Unable to load farms for farmers.");
      } finally {
        setFarmsLoading(false);
      }
    };

    fetchAllFarms();
  }, [data]);

  if (loading)
    return (
      <p className="text-center text-gray-500 mt-10">
        ⏳ Loading officer data...
      </p>
    );
  if (error)
    return <p className="text-center text-red-500 mt-10">❌ Error: {error}</p>;
  if (!data)
    return <p className="text-center text-gray-500 mt-10">No data found.</p>;

  const { officer, farmers, crops, livestock = [] } = data;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 pt-30">
      {/* Officer Info */}
      {/* Officer Info */}
      <div className="bg-blue-100 p-6 rounded-xl shadow-lg border border-blue-200">
        <h1 className="text-3xl font-bold mb-3">👮 {officer?.name}</h1>
        <p className="text-gray-700">
          <span className="font-semibold">📧 Email:</span> {officer?.email}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">📞 Phone:</span> {officer?.phone}
        </p>

        {/* Summary Section */}
        <div className="mt-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
            {/* Total Farmers */}
            <div className="text-center p-2 bg-green-50 rounded">
              <p className="text-lg font-bold">{farmers.length}</p>
              <p className="text-gray-600 text-sm">Farmers</p>
            </div>

            {/* Total Farms */}
            <div className="text-center p-2 bg-yellow-50 rounded">
              <p className="text-lg font-bold">
                {Object.values(farmerFarms).reduce(
                  (acc, farms) => acc + farms.length,
                  0
                )}
              </p>
              <p className="text-gray-600 text-sm">Farms</p>
            </div>
          </div>

          {/* Livestock Summary */}
          <div className="p-2 bg-red-50 rounded">
            <p className="font-semibold mb-1">🪴 Livestock Summary:</p>
            {livestock.length > 0 ? (
              <ul className="list-disc list-inside text-gray-700 text-sm flex gap-4 flex-wrap ml-2">
                {Object.entries(
                  livestock.reduce((acc, l) => {
                    acc[l.type] = (acc[l.type] || 0) + Number(l.count);
                    return acc;
                  }, {})
                ).map(([type, count]) => (
                  <li key={type}>
                    {type}: {count}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 text-sm">No livestock added</p>
            )}
          </div>

          {/* Crop Summary */}
          <div className="p-2 bg-blue-50 rounded">
            <p className="font-semibold mb-1">🌾 Crops Planted:</p>
            {crops.length > 0 ? (
              <p className="text-gray-700 text-sm gap-2 flex flex-wrap ml-2">
                {[...new Set(crops.map((c) => c.cropType))].join(", ")}
              </p>
            ) : (
              <p className="text-gray-400 text-sm">No crops added</p>
            )}
          </div>
        </div>
      </div>

      {/* Farmers & Farms */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold mb-2">
          👩‍🌾 Farmers & Their Farms
        </h2>

        {farmers.length === 0 ? (
          <div className="text-center bg-gray-50 p-10 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-gray-600 mb-4">
              🚫 You don’t have any registered farmers yet.
            </p>
            <Link
              to={`/farmer/${officerId}/register-farmer`}
              className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              ➕ Register a Farmer
            </Link>
          </div>
        ) : (
          farmers.map((farmer) => (
            <div
              key={farmer._id}
              className="bg-gray-50 p-5 rounded-xl shadow-md border border-gray-200"
            >
              <h3 className="text-lg font-bold mb-1">🧑‍🌾 {farmer.name}</h3>
              <p className="text-gray-700">
                <span className="font-semibold">📞 Phone:</span> {farmer.phone}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">🏠 Address:</span>{" "}
                {farmer.address}
              </p>

              {(() => {
                const farms = farmerFarms[farmer._id] || [];
                const farmIds = farms.map((f) => f._id);


                const farmerCrops = crops.filter((crop) =>
                  farmIds.includes(crop.farmId)
                );
                const farmerLivestock = data.livestock
                  ? data.livestock.filter((animal) =>
                      farmIds.includes(animal.farmId)
                    )
                  : [];

                const cropTypes = [
                  ...new Set(farmerCrops.map((c) => c.cropType)),
                ];

                const livestockByType = farmerLivestock.reduce((acc, curr) => {
                  const qty = curr.count || 1; // default 1 if no quantity field
                  acc[curr.type] = (acc[curr.type] || 0) + qty;
                  return acc;
                }, {});

                return (
                  <div className="mt-3 p-3 bg-gray-100 rounded-md border border-gray-200 space-y-1">
                    <p className="text-sm text-gray-700">
                      🪴 <strong>Total Farms:</strong> {farms.length}
                    </p>
                    <p className="text-sm text-gray-700">
                      🐄 <strong>Livestock Summary:</strong>{" "}
                      {Object.keys(livestockByType).length > 0
                        ? Object.entries(livestockByType)
                            .map(([type, count]) => `${type}: ${count}`)
                            .join(", ")
                        : "No livestock yet"}
                    </p>
                    <p className="text-sm text-gray-700">
                      🌾 <strong>Crops Grown:</strong>{" "}
                      {cropTypes.length > 0 ? cropTypes.join(", ") : "None yet"}
                    </p>
                  </div>
                );
              })()}

              <div className="mt-4">
                <Link
                  to={`/farmer/register-farm/${farmer._id}/${officerId}/${farmer.name}`}
                  className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  ➕ Add Farm
                </Link>
              </div>

              {/* Farms Section */}
              <div className="mt-4 ml-4 space-y-3">
                {farmsLoading ? (
                  <p className="text-gray-500 text-sm">Loading farms...</p>
                ) : farmerFarms[farmer._id]?.length > 0 ? (
                  farmerFarms[farmer._id].map((farm) => (
                    <div
                      key={farm._id}
                      className="bg-cyan-50 p-4 rounded-lg shadow-sm border border-cyan-200"
                    >
                      <div className="flex justify-between w-full">
                        <div>
                          <h4 className="font-semibold mb-1">
                            🌱{" "}
                            {farm.name
                              ? `${farm.name.slice(0, 4)}${Math.floor(
                                  100 + Math.random() * 900
                                )}`
                              : "Farm"}
                          </h4>
                          <p className="text-gray-600">
                            <strong>📍 Location:</strong> {farm.location}
                          </p>
                          <p className="text-gray-600">
                            <strong>📏 Size:</strong> {farm.size} ha
                          </p>
                          <p className="text-gray-600">
                            <strong>🪴 Soil Type:</strong> {farm.soilType}
                          </p>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                          <Link
                            to={`/farmer/register-crop/${farmer._id}/${officerId}/${farm._id}/${farmer.name}`}
                            className="px-3 py-1 bg-gray-200 rounded-2xl mb-4"
                          >
                            addCrop
                          </Link>

                          <Link
                            to={`/farmer/register-livestock/${farmer._id}/${officerId}/${farm._id}/${farmer.name}`}
                            className="px-3 py-1 bg-gray-200 rounded-2xl mt-5"
                          >
                            addLiveStocks
                          </Link>
                        </div>
                      </div>
                      <div className="mt-3 ml-4">
                        {(() => {
                          const farmCrops = crops.filter(
                            (crop) => crop.farmId === farm._id
                          );
                          return farmCrops.length > 0 ? (
                            farmCrops.map((crop) => (
                              <div
                                key={crop._id}
                                className="p-2 bg-green-50 border border-green-200 rounded-md mb-2"
                              >
                                <p>
                                  🌾 <strong>Crop Type:</strong> {crop.cropType}
                                </p>
                                <p>
                                  🌱 <strong>Variety:</strong> {crop.variety}
                                </p>
                                <p>
                                  🌍 <strong>Area Planted:</strong>{" "}
                                  {crop.areaPlanted} ha
                                </p>
                                <p className="text-xs text-gray-500">
                                  Added on{" "}
                                  {new Date(
                                    crop.createdAt
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                            ))
                          ) : (
                            <p className="text-gray-400 text-sm">
                              No crops added yet 🌾
                            </p>
                          );
                        })()}
                      </div>
                      <div className="mt-3 ml-4">
                        {(() => {
                          const stocks = livestock.filter(
                            (crop) => crop.farmId === farm._id
                          );
                          return stocks.length > 0 ? (
                            stocks.map((crop) => (
                              <div
                                key={crop._id}
                                className="p-2 bg-green-50 border border-green-200 rounded-md mb-2"
                              >
                                <div className="flex justify-between">
                                  <div>
                                    <p>
                                      🌾 <strong>Livestock:</strong> {crop.type}
                                    </p>
                                    <p>
                                      🌱 <strong>Specie:</strong> {crop.breed}
                                    </p>
                                    <p>
                                      🌍 <strong>Quantity:</strong> {crop.count}
                                    </p>
                                  </div>
                                  <div className="flex flex-col gap-2">
                                     <button className="bg-green-500 hover:bg-green-600 text-sm text-white font-semibold px-3 py-1 rounded shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-red-300">
                                      <Link
                                      to="#"
                                      className="text-white-600 "
                                    >
                                      Edit stock
                                    </Link>
                                    </button>
                                   
                                    <button className="bg-red-500 hover:bg-red-600 text-sm text-white font-semibold px-3 py-1 rounded shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-red-300">
                                      Delete stock
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-gray-400 text-sm">
                              No Livestock added yet 🐄
                            </p>
                          );
                        })()}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">
                    No Livestock found for this farmer.
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SingleOfficer;
