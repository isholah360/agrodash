import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditAsso = () => {
  const  id  = useParams();
  const navigate = useNavigate();
  console.log("Association ID from params:", id.id);

  const [formData, setFormData] = useState({
    associationid: id.id,
    name: "",
    registrationno: "",
  });
 console.log("Form Data State:", formData);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  
  useEffect(() => {
    const fetchAssociation = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(
          `/api/v1/Association/GetAssociation/${id.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch association details");
        const data = await response.json();

        setFormData({
          associationid: data.associationid || id.id,
          name: data.name || "",
          registrationno: data.registrationno || "",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAssociation();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        "/api/v1/Association/updateEntity",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            associationid: Number(formData.associationid),
            name: formData.name,
            registrationno: formData.registrationno,
          }),
        }
      );
      console.log(response)

      if (!response.ok) throw new Error("Failed to update association");

      const result = await response.json();
      console.log("Update response:", result);
      setSuccess("✅ Association updated successfully!");
      setTimeout(() => navigate("/association/list"), 1500);
    } catch (err) {
      setError("❌ " + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return <p className="text-center text-gray-500 mt-10">⏳ Loading association details...</p>;
  if (error)
    return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-xl p-8 border border-gray-200">
      <h1 className="text-2xl font-bold mb-6 text-center">✏️ Edit Association</h1>

      {success && <p className="text-green-600 text-center mb-4">{success}</p>}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Association Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            placeholder="Enter association name"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Registration No</label>
          <input
            type="text"
            name="registrationno"
            value={formData.registrationno}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            placeholder="Enter registration number"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className={`w-full py-2 font-semibold rounded-md text-white ${
            saving ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 transition"
          }`}
        >
          {saving ? "Saving..." : "Update Association"}
        </button>
      </form>
    </div>
  );
};

export default EditAsso;
