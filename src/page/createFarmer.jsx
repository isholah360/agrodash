import React, { useState } from "react";

const CreateFarmer = () => {
  const [formData, setFormData] = useState({
    officerId:"",
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

    // Convert certain fields to integers
    const numericFields = [
      "farmerid",
      "associationid",
      "householdsize",
      "availablelabor",
      "lgaid",
      "version",
      "userId",
      "latitude",
      "longitude",
    ];

    setFormData((prev) => ({
      ...prev,
      [name]: numericFields.includes(name) ? Number(value) : value,
    }));
  };
  
  console.log(formData)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const token = localStorage.getItem("authToken");

      

  

      const response = await fetch(
        "/api/farmers/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      console.log(result.data.farmerId)

       localStorage.setItem("farmerId", result.data.farmerId);
    

      if (!response.ok) {
        throw new Error(result.message || "Failed to create farmer");
      }

      setSuccessMsg("Farmer created successfully!");
      setFormData({
        farmerid: 5,
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
        userId: 1,
      });
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Create New Farmer
      </h2>

      {successMsg && <p className="text-green-600 mb-4">{successMsg}</p>}
      {errorMsg && <p className="text-red-600 mb-4">{errorMsg}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="firstname"
          placeholder="First Name"
          value={formData.firstname}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="middlename"
          placeholder="Middle Name"
          value={formData.middlename}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="lastname"
          placeholder="Last Name"
          value={formData.lastname}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          name="gender"
          placeholder="Gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="date"
          name="dateofbirth"
          value={formData.dateofbirth}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          name="email"
          placeholder="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="phonenumber"
          placeholder="Phone Number"
          value={formData.phonenumber}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="number"
          name="associationid"
          placeholder="Association ID"
          value={formData.associationid}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="householdsize"
          placeholder="Household Size"
          value={formData.householdsize}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="availablelabor"
          placeholder="Available Labor"
          value={formData.availablelabor}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          name="photourl"
          placeholder="Photo URL"
          value={formData.photourl}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          name="streetaddress"
          placeholder="Street Address"
          value={formData.streetaddress}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="town"
          placeholder="Town"
          value={formData.town}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="postalcode"
          placeholder="Postal Code"
          value={formData.postalcode}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="number"
          name="lgaid"
          placeholder="LGA ID"
          value={formData.lgaid}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          step="0.000001"
          name="latitude"
          placeholder="Latitude"
          value={formData.latitude}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          step="0.000001"
          name="longitude"
          placeholder="Longitude"
          value={formData.longitude}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="number"
          name="version"
          placeholder="Version"
          value={formData.version}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        {/* <input
          type="number"
          name="userId"
          placeholder="User ID"
          value={formData.userId}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        /> */}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
        >
          {loading ? "Creating..." : "Create Farmer"}
        </button>
      </form>
    </div>
  );
};

export default CreateFarmer;
