import { useEffect, useState } from "react";
import React from "react";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export default function PublicOfficer() {
  const [farmers, setFarmers] = useState([]);
  const [theId, setTheId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const Id = localStorage.getItem("userId");
        setTheId(parseInt(Id)); 

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
        console.log("All farmers:", data.data.data);

        setFarmers(data.data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFarmers();
  }, []);

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

  // ✅ Filter by logged-in user
  const filteredFarmers = farmers.filter(
    (farmer) => farmer.userId === theId
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 pt-[10rem]">
      <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-10 text-center">
        Registered Farmers
      </h1>

      {filteredFarmers.length === 0 ? (
        <p className="text-center text-gray-500">
          No farmers found for this user.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredFarmers.map((farmer) => (
            <div
              key={farmer.farmerid}
              className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
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

              {/* ✅ Highlight who owns it */}
              {farmer.userId === theId ? (
                <div className="p-4 text-center bg-blue-100 text-blue-800 font-semibold">
                  Admin (You)
                </div>
              ) : (
                <div className="p-4 text-center bg-green-100 text-green-800 font-semibold">
                  Officer
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}