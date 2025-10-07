import { useEffect, useState } from "react";
import React from "react";
import { jwtDecode } from "jwt-decode";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export default function PublicOfficer() {
  const [farmers, setFarmers] = useState([]);
  const [theId, setTheId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const decode = jwtDecode(token);
        const Id = localStorage.getItem("userId");
        setTheId(parseInt(Id));
        setUser(decode);
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
  const filteredFarmers = farmers.filter((farmer) => farmer.userId === theId);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 pt-[10rem]">
      <div className="mt-[2rem] mb-10 p-6 bg-gray-100 rounded-lg shadow-md flex flex-col items-center md:flex-row justify-between md:items-start gap-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold mb-5">
            Hello {user.fullname}
          </h1>
          <h1 className="text-sm md:text-xl mb-2">
            <span className="text-green-700"> email</span>: {user.UserName}
          </h1>
          <h1 className="text-sm md:text-xl ">
            <span className="text-green-700">Phone</span>:{" "}
            {user.phoneNumber ? user.phoneNumber : "0806......."}
          </h1>
        </div>
        <div>
          {user.profilePicUrl ? (
            <div>
              {user.profilePicUrl && (
                <img
                  src={user.profilePicUrl}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover"
                />
              )}
            </div>
          ) : (
            <div className="float-right text-gray-300 text-9xl">
              <FaUser />
            </div>
          )}
        </div>
      </div>

      <h2 className="text-2xl md:text-4xl font-bold text-green-700 mb-10 text-center">
        Here are your Farmers
      </h2>

      {filteredFarmers.length === 0 ? (
        <p className="text-center text-gray-500">
          No farmers found <br />
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredFarmers && filteredFarmers.length > 0 ? (
            filteredFarmers.map((farmer) => (
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
                    {farmer.farmerid}
                  </h2>
                  <p className="text-sm text-gray-600 mb-1">{farmer.email}</p>
                  <p className="text-sm text-gray-600 mb-2">
                    📞 {farmer.phonenumber}
                  </p>
                  <p className="text-green-700 font-medium">
                    Farms: {farmer.farms?.length || 0}
                  </p>
                </div>

                {farmer.userId === theId ? (
                  <div className="p-4 text-center bg-blue-100 text-blue-800 font-semibold">
                    <Link
                      to="/createfarm"
                      onClick={() => {
                        localStorage.setItem(
                          "farmerId",
                          farmer.farmerid
                        );
                      }}
                    >
                      Add farm
                    </Link>
                  </div>
                ) : (
                  <div className="p-4 text-center bg-green-100 text-green-800 font-semibold">
                    Officer
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="col-span-full text-center">
              <p>No farmers available.</p>
              <Link to="/createfarmer">
                <button className="mt-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                  Add Farmer
                </button>
              </Link>
            </div>
          )}
        </div>
      )}

      <div className="col-span-full text-center mt-10">
        <Link to="/createfarmer">
          <button className="mt-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            Add Farmer
          </button>
        </Link>
      </div>
    </div>
  );
}
