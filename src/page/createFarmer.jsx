import React, { useState } from "react";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const CreateFarmer = () => {
  const [formData, setFormData] = useState({
    officerId: 0,
    firstname: "",
    middlename: "",
    lastname: "",
    gender: "",
    dateofbirth: "",
    email: "",
    phonenumber: "",
    associationid: 0,
    householdsize: 0,
    availablelabor: 0,
    photourl: "",
    streetaddress: "",
    town: "",
    postalcode: "",
    lgaid: 0,
    latitude: 0,
    longitude: 0,
    version: 0,
    userId: 0,
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericFields = [
      "associationid",
      "householdsize",
      "availablelabor",
      "lgaid",
      "latitude",
      "longitude",
      "version",
      "userId",
    ];

    setFormData((prev) => ({
      ...prev,
      [name]: numericFields.includes(name) ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const token = localStorage.getItem("authToken");
      const userId= localStorage.getItem("userId");
      formData.userId = Number(userId);
      console.log("Submitting form data:", formData);

      const response = await fetch(`/api/v1/Farmer/Create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log(result);

      if (!response.ok) {
        throw new Error(result.message || "Failed to create farmer");
      }

      localStorage.setItem("farmerId", result.data.farmerId);

      setSuccessMsg("🎉 Farmer created successfully!");
      setFormData({
        officerId: 0,
        firstname: "",
        middlename: "",
        lastname: "",
        gender: "",
        dateofbirth: "",
        email: "",
        phonenumber: "",
        associationid: 0,
        householdsize: 0,
        availablelabor: 0,
        photourl: "",
        streetaddress: "",
        town: "",
        postalcode: "",
        lgaid: 0,
        latitude: 0,
        longitude: 0,
        version: 0,
        userId: 0,
      });

      setTimeout(() => setSuccessMsg(""), 5000);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="pt-[5rem]"></div>
    <div className="max-w-2xl mx-auto mt-8 p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-4">
          Create New Farmer
        </h2>

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
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                placeholder="Enter first name"
                required
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Middle Name
              </label>
              <input
                name="middlename"
                value={formData.middlename}
                onChange={handleChange}
                placeholder="Enter middle name"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                placeholder="Enter last name"
                required
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Gender & DOB */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender <span className="text-red-500">*</span>
              </label>
              <input
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                placeholder="Male or Female"
                required
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="dateofbirth"
                value={formData.dateofbirth}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                name="phonenumber"
                placeholder="Enter phone number"
                value={formData.phonenumber}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Association & Household */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Association ID
              </label>
              <input
                type="number"
                name="associationid"
                placeholder="Enter association ID"
                value={formData.associationid}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Household Size
              </label>
              <input
                type="number"
                name="householdsize"
                placeholder="Enter household size"
                value={formData.householdsize}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Available Labor
              </label>
              <input
                type="number"
                name="availablelabor"
                placeholder="Enter available labor"
                value={formData.availablelabor}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Street Address
            </label>
            <input
              name="streetaddress"
              placeholder="Enter street address"
              value={formData.streetaddress}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              name="town"
              placeholder="Town"
              value={formData.town}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500"
            />
            <input
              name="postalcode"
              placeholder="Postal Code"
              value={formData.postalcode}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500"
            />
            <input
              type="number"
              name="lgaid"
              placeholder="LGA ID"
              value={formData.lgaid}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Geo Coordinates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="number"
              step="0.000001"
              name="latitude"
              placeholder="Latitude"
              value={formData.latitude}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500"
            />
            <input
              type="number"
              step="0.000001"
              name="longitude"
              placeholder="Longitude"
              value={formData.longitude}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Photo URL
            </label>
            <input
              name="photourl"
              placeholder="Enter photo URL"
              value={formData.photourl}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Creating Farmer..." : "Create Farmer"}
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default CreateFarmer;
