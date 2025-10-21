import React, { useState } from "react";

const Association = () => {
  const [formData, setFormData] = useState({
    name: "",
    registrationno: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("authToken"); // assuming you're using token auth
      const res = await fetch("/api/v1/Association/Create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to create association");
      }

      const result = await res.json();
      setMessage("✅ Association created successfully!");
      setFormData({ name: "", registrationno: "" });
      console.log("Response:", result);
    } catch (err) {
      console.error("Error:", err);
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-8 mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Create Association
      </h2>

      {message && (
        <div
          className={`mb-4 p-3 rounded-lg ${
            message.startsWith("✅")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Association Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Association Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter association name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

     
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Registration Number
          </label>
          <input
            type="text"
            name="registrationno"
            placeholder="Enter registration number"
            value={formData.registrationno}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white font-medium py-3 rounded-lg hover:bg-green-700 transition disabled:bg-gray-400"
        >
          {loading ? "Creating..." : "Create Association"}
        </button>
      </form>
    </div>
  );
};

export default Association;
