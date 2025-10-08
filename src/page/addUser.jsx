import React, { useEffect, useState } from "react";

const AddUser = () => {
  const [regions, setRegions] = useState([]);
  const [lga, setLga] = useState([]);
    const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    phonenumber: "",
    firstname: "",
    lastname: "",
    middlename: "",
    gender: "",
    emailAddress: "",
    userName: "",
    lgaid: "",
    regionid: "",
    streetaddress: "",
    town: "",
    postalcode: "",
    latitude: "",
    longitude: "",
  });

  console.log(formData.regionid);

  useEffect(() => {
      const fetchRegions = async () => {
        try {
          const token = localStorage.getItem("authToken");
          const response = await fetch(`/api/v1/Region/GetRegions`, {
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
          setRegions(data.data.data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchRegions();
    }, []);

    useEffect(() => {
      const fetchLga = async () => {
        try {
          const token = localStorage.getItem("authToken");
          const response = await fetch(`api/v1/Lga/getLgasByRegionId/${formData.regionid}`, {
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
          setLga(data.data.data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchLga();
    }, [formData.regionid]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errorMsg) setErrorMsg("");
  };

  const validateForm = () => {
    if (!formData.firstname.trim())
      return setErrorMsg("First name is required");
    if (!formData.lastname.trim()) return setErrorMsg("Last name is required");
    if (!formData.emailAddress.trim())
      return setErrorMsg("Email address is required");
    if (!/\S+@\S+\.\S+/.test(formData.emailAddress))
      return setErrorMsg("Invalid email format");
    if (!formData.userName.trim()) return setErrorMsg("Username is required");
    if (!formData.gender.trim()) return setErrorMsg("Gender is required");
    if (!formData.phonenumber.trim())
      return setErrorMsg("Phone number is required");
    if (!formData.lgaid || parseInt(formData.lgaid) <= 0)
      return setErrorMsg("Invalid LGA ID");
    if (!formData.regionid || parseInt(formData.regionid) <= 0)
      return setErrorMsg("Invalid Region ID");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");
    if (!validateForm()) return;

    setLoading(true);

    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No auth token found. Please log in again.");

      const payload = {
        phonenumber: formData.phonenumber.trim(),
        firstname: formData.firstname.trim(),
        lastname: formData.lastname.trim(),
        middlename: formData.middlename.trim(),
        gender: formData.gender.trim(),
        emailAddress: formData.emailAddress.trim(),
        userName: formData.userName.trim(),
        lgaid: parseInt(formData.lgaid),
        regionid: parseInt(formData.regionid),
        streetaddress: formData.streetaddress.trim() || "",
        town: formData.town.trim() || "",
        postalcode: formData.postalcode.trim() || "",
        latitude: formData.latitude ? parseFloat(formData.latitude) : 0,
        longitude: formData.longitude ? parseFloat(formData.longitude) : 0,
      };

      console.log(payload);

      const response = await fetch("/api/v1/User/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const raw = await response.text(); 
      
      let result;

      console.log(formData)

      try {
        result = JSON.parse(raw); 
      } catch {
        result = raw; 
      }
      console.log("User Creation Result:", result);

      if (result.success === false) {
        setMessage(result.data.message);
        console.log(result.data.message);
      }

      if (!response.ok) {
        throw new Error(result.message || `Server Error: ${response.status}`);
      }

      setSuccessMsg("🎉 User created successfully!");
      setFormData({
        phonenumber: "",
        firstname: "",
        lastname: "",
        middlename: "",
        gender: "",
        emailAddress: "",
        userName: "",
        salt: "",
        lgaid: "",
        regionid: "",
        streetaddress: "",
        town: "",
        postalcode: "",
        latitude: "",
        longitude: "",
      });

      setTimeout(() => setSuccessMsg(""), 5000);
    } catch (err) {
      console.error("Error creating user:", err);
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-4">
          Create New User
        </h2>

        {successMsg && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            {message ? (
              <p className="text-green-700 font-medium">{message}</p>
            ) : (
              <p className="text-green-700 font-medium">{successMsg}</p>
            )}
          </div>
        )}
        {errorMsg && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 font-medium">{errorMsg}</p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            placeholder="First Name"
            className="border p-3 rounded-lg"
            required
          />
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            placeholder="Last Name"
            className="border p-3 rounded-lg"
            required
          />
            <input
            type="email"
            name="emailAddress"
            value={formData.emailAddress}
            onChange={handleChange}
            placeholder="Email Address"
            className="border p-3 rounded-lg"
            required
          />
          <input
            type="text"
            name="middlename"
            value={formData.middlename}
            onChange={handleChange}
            placeholder="Middle Name"
            className="border p-3 rounded-lg"
          />
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            placeholder="Username"
            className="border p-3 rounded-lg"
            required
          />
          <input
            type="text"
            name="phonenumber"
            value={formData.phonenumber}
            onChange={handleChange}
            placeholder="Phone Number"
            className="border p-3 rounded-lg"
            required
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

        

          <input
            type="text"
            name="streetaddress"
            value={formData.streetaddress}
            onChange={handleChange}
            placeholder="Street Address"
            className="border p-3 rounded-lg"
          />
          <input
            type="text"
            name="town"
            value={formData.town}
            onChange={handleChange}
            placeholder="Town"
            className="border p-3 rounded-lg"
          />
          <input
            type="text"
            name="postalcode"
            value={formData.postalcode}
            onChange={handleChange}
            placeholder="Postal Code"
            className="border p-3 rounded-lg"
          />
            <select
            name="lgaid"
            value={formData.lgaid}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          >
           <option value="">Select LGA</option>
           {lga.map((lgArea) => (
              <option key={lgArea.lgaid} value={lgArea.lgaid}>
                {lgArea.lganame}
              </option>
            ))}
          </select>

           <select
            name="regionid"
            value={formData.regionid}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          >
           <option value="">Select Region</option>
           {regions.map((region) => (
              <option key={region.regionid} value={region.regionid}>
                {region.regionname}
              </option>
            ))}
          </select>
        
          <input
            type="number"
            step="any"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
            placeholder="Latitude"
            className="border p-3 rounded-lg"
          />
          <input
            type="number"
            step="any"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            placeholder="Longitude"
            className="border p-3 rounded-lg"
          />

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 active:scale-98"
              }`}
            >
              {loading ? "Creating User..." : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
