import React, { useEffect, useState } from "react";

const Farms = () => {
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

        if (!res.ok) {
          throw new Error("Failed to fetch farms");
        }

        const result = await res.json();
        console.log(result.data.data);

        setFarms(result.data.data);
        setError("");
      } catch (err) {
        console.error("Error fetching farms:", err);
        setError(err.message || "An error occurred");
        setFarms([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFarms();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">Loading farms...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Farms List ({farms.length})
        </h2>

        {error ? (
          <div className="text-red-600 bg-red-100 p-4 rounded-md">{error}</div>
        ) : farms.length === 0 ? (
          <p className="text-gray-500">No farms found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {farms?.map((farm, index) => (
              <div
                key={farm.id || index}
                className="border rounded-lg p-4 shadow-sm bg-white"
              >
                <h3 className="font-semibold text-lg text-gray-900 mb-1">
                  {farm.name || `Farm ${index + 1}`}
                </h3>
                {farm.location && (
                  <p className="text-sm text-gray-600">📍 {farm.location}</p>
                )}
                {farm.farmsize && (
                  <p className="text-sm text-gray-600">📏 {farm.farmsize}</p>
                )}
                {farm.cropType && (
                  <p className="text-sm text-gray-600">🌾 {farm.cropType}</p>
                )}
                
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Farms;