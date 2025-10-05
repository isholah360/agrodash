import React, { useState, useEffect } from "react";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const CreateFarmForm = () => {
  const [farmerId, setFarmerId] = useState("");
  const [formData, setFormData] = useState({
    farmName: "",
    farmType: "",
    farmsize: "",
    location: "",
    town: "",
    postalcode: "",
    lgaid: "",
    latitude: "",
    longitude: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const storedFarmerId = localStorage.getItem("farmerId");
    if (storedFarmerId) {
      setFarmerId(storedFarmerId);
      console.log("Loaded Farmer ID:", storedFarmerId);
    } else {
      setErrorMsg("No farmer ID found. Please create a farmer first.");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error message when user starts typing
    if (errorMsg) setErrorMsg("");
  };

  const validateForm = () => {
    if (!farmerId) {
      setErrorMsg("Farmer ID is missing. Please create a farmer first.");
      return false;
    }

    if (!formData.farmName.trim()) {
      setErrorMsg("Farm name is required");
      return false;
    }

    if (!formData.farmType.trim()) {
      setErrorMsg("Farm type is required");
      return false;
    }

    if (!formData.farmsize || parseFloat(formData.farmsize) <= 0) {
      setErrorMsg("Please enter a valid farm size");
      return false;
    }

    if (!formData.lgaid || parseInt(formData.lgaid) <= 0) {
      setErrorMsg("Please enter a valid LGA ID");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous messages
    setSuccessMsg("");
    setErrorMsg("");

    // Validate form
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        throw new Error("Authentication token not found. Please login again.");
      }

    
      const payload = {
        farmerId: parseInt(farmerId),
        farmName: formData.farmName.trim(),
        farmType: formData.farmType.trim(),
        farmsize: parseFloat(formData.farmsize),
        location: formData.location.trim() || "",
        town: formData.town.trim() || "",
        postalcode: formData.postalcode.trim() || "",
        lgaid: parseInt(formData.lgaid),
        latitude: formData.latitude ? parseFloat(formData.latitude) : 0,
        longitude: formData.longitude ? parseFloat(formData.longitude) : 0,
      };

      console.log("Submitting payload:", payload);

      const response = await fetch(`/api/farms/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log("API Response:", result);

      if (!response.ok) {
        throw new Error(result.message || `Server error: ${response.status}`);
      }

      setSuccessMsg("🎉 Farm created successfully!");


      setFormData({
        farmName: "",
        farmType: "",
        farmsize: "",
        location: "",
        town: "",
        postalcode: "",
        lgaid: "",
        latitude: "",
        longitude: "",
      });

   
      setTimeout(() => setSuccessMsg(""), 5000);
    } catch (err) {
      console.error("Farm creation error:", err);
      setErrorMsg(err.message || "Failed to create farm. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-4">
          Create New Farm
        </h2>

        {/* {farmerId && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <span className="font-semibold">Farmer ID:</span> {farmerId}
            </p>
          </div>
        )} */}

        {successMsg && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
            <p className="text-green-700 font-medium">{successMsg}</p>
          </div>
        )}

        {errorMsg && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <p className="text-red-700 font-medium">{errorMsg}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Farm Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="farmName"
              placeholder="Enter farm name"
              value={formData.farmName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Farm Type <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="farmType"
              placeholder="e.g., Crop, Livestock, Mixed"
              value={formData.farmType}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Farm Size (hectares) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="farmsize"
              step="0.01"
              placeholder="e.g., 2.5"
              value={formData.farmsize}
              onChange={handleChange}
              required
              min="0"
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location/Street Address
            </label>
            <input
              type="text"
              name="location"
              placeholder="Enter street address"
              value={formData.location}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            />
          </div>

          {/* Town and Postal Code in Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Town
              </label>
              <input
                type="text"
                name="town"
                placeholder="Enter town"
                value={formData.town}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Postal Code
              </label>
              <input
                type="text"
                name="postalcode"
                placeholder="Enter postal code"
                value={formData.postalcode}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* LGA ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              LGA ID <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="lgaid"
              placeholder="Enter LGA ID"
              value={formData.lgaid}
              onChange={handleChange}
              required
              min="1"
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            />
          </div>

          {/* Latitude and Longitude in Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Latitude
              </label>
              <input
                type="number"
                name="latitude"
                step="0.000001"
                placeholder="e.g., 7.3775"
                value={formData.latitude}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Longitude
              </label>
              <input
                type="number"
                name="longitude"
                step="0.000001"
                placeholder="e.g., 3.9470"
                value={formData.longitude}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !farmerId}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2 ${
              loading || !farmerId
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 active:scale-98"
            }`}
          >
            {loading ? <>Creating Farm...</> : "Create Farm"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateFarmForm;
