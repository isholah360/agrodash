import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AssoList = () => {
  const [associations, setAssociations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchAssociations = async () => {
      try {
     
        const token = localStorage.getItem("authToken");
        console.log("Token:", token);

        const res = await fetch("/api/v1/Association/GetAssociations", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Response status:", res); 

        if (!res.ok) {
          throw new Error("Failed to fetch farms");
        }
        const result = await res.json();
        console.log("Fetched associations:", result);
        setAssociations(result.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAssociations();
  }, []);


  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this association?"))
      return;
    console.log("Deleting association with ID:", id); // Debugging line
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`/api/v1/Association/deleteAssociation/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete association");

      setAssociations((prev) => prev.filter((assoc) => assoc._id !== id));
      alert("✅ Association deleted successfully");
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  if (loading)
    return (
      <p className="text-center text-gray-500 mt-10">
        ⏳ Loading associations...
      </p>
    );

  if (error)
    return <p className="text-center text-red-500 mt-10">❌ Error: {error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">🏢 Associations</h1>
        <Link
          to="/association/create"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          ➕ Add Association
        </Link>
      </div>

      {associations.length === 0 ? (
        <p className="text-gray-500 text-center">No associations found.</p>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {associations.map((assoc) => (
                <tr key={assoc.associationid} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-800">{assoc.name}</td>
                  <td className="px-6 py-4 text-gray-600">{assoc.type}</td>
                  <td className="px-6 py-4 text-gray-600">{assoc.location}</td>
                  <td className="px-6 py-4 flex gap-3">
                    <Link
                      to={`/associations/edit/${assoc.associationid}`}
                      className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-400 transition"
                    >
                     Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(assoc.associationid)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                    >
                     Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AssoList;
