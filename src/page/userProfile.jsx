import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const userProfile = () => {
  const { id } = useParams();
  console.log(id);
  const [officerData, setOfficerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [totalFarmers, setTotalFarmers] = useState(0);
  const [totalFarms, setTotalFarms] = useState(0);

  useEffect(() => {
    const fetchOfficerData = async () => {
      const token = localStorage.getItem("authToken");
      try {
        const res = await fetch(`/api/v1/User/GetOfficer/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error(`Failed to fetch officer (${res.status})`);

        const result = await res.json();
        const officer = result.data?.data?.[0] || result.data?.data;
        setOfficerData(officer);
      } catch (err) {
        console.error(err);
        setError(
          err.message || "An error occurred while fetching officer data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOfficerData();
  }, [id]);

  useEffect(() => {
    // Simulated fetch from backend or local storage
    setTotalFarmers(25);
    setTotalFarms(12);
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-green-600 font-semibold text-lg animate-pulse">
          ⏳ Loading officer data...
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 font-semibold">{error}</p>
      </div>
    );

  if (!officerData)
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Officer not found.
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto bg-white min-h-screen pt-10 p-6">
      {/* Header */}
      <div className="bg-green-600 text-white px-6 py-4 rounded-t-lg flex items-center justify-between mt-[8rem]">
        <h1 className="text-xl font-bold">👮 {officerData?.lastname}'s Profile</h1>
      </div>

      {/* Profile Section */}
      <div className="text-center mt-8">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 text-4xl">
          👤
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">
          {officerData?.firstname} {officerData?.lastname}
        </h2>
        <p className="text-gray-500 text-sm flex justify-center items-center gap-1 mt-1">
          Officer ID:
          <span className="text-black font-medium">{officerData?.userid}</span>
          <span className="text-white bg-green-500 rounded-full w-5 h-5 flex items-center justify-center text-xs ml-1">
            ✓
          </span>
        </p>
      </div>

      {/* Personal Info */}
      <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-5">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          📋 Personal Information
        </h3>
        <div className="space-y-3 text-gray-600">
          <div className="flex justify-between border-b pb-1">
            <span>🚻 Gender</span>
            <span className="font-medium">{officerData?.gender || "N/A"}</span>
          </div>
          <div className="flex justify-between border-b pb-1">
            <span>📞 Contact</span>
            <span className="font-medium">
              {officerData?.phonenumber || "N/A"}
            </span>
          </div>
          <div className="flex justify-between border-b pb-1">
            <span>✉️ Email</span>
            <span className="font-medium">{officerData?.email || "N/A"}</span>
          </div>
          <div className="flex justify-between border-b pb-1">
            <span>🏠 Address</span>
            <span className="font-medium">{officerData?.address || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span>📍 LGA</span>
            <span className="font-medium">{officerData?.lga || "N/A"}</span>
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-5">
        <h3 className="text-lg font-semibold mb-4 text-gray-700 text-center">
          📊 Summary
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-green-100 rounded-lg py-4 shadow-sm">
            <p className="text-2xl">👨‍🌾</p>
            <p className="text-gray-600 font-medium">No. of Farmers</p>
            <p className="text-xl font-bold text-green-600 mt-1">
              {totalFarmers}
            </p>
          </div>

          <div className="bg-yellow-100 rounded-lg py-4 shadow-sm">
            <p className="text-2xl">🌾</p>
            <p className="text-gray-600 font-medium">No. of Crop Farms</p>
            <p className="text-xl font-bold text-green-600 mt-1">
              {totalFarms}
            </p>
          </div>

          <div className="bg-blue-100 rounded-lg py-4 shadow-sm">
            <p className="text-2xl">🐄</p>
            <p className="text-gray-600 font-medium">No. of Livestock Farms</p>
            <p className="text-xl font-bold text-green-600 mt-1">
              {totalFarms}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default userProfile;
