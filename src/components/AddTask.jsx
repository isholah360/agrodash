import React, { useState } from 'react';
// import { Plus, Save, X } from 'lucide-react';
import { FaPlus, FaSave } from 'react-icons/fa';

function Addtask() {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.subtitle.trim()) {
      newErrors.subtitle = 'Subtitle is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log('Form submitted:', formData);

      // Reset form
      setFormData({
        title: '',
        subtitle: '',
        message: ''
      });

        setErrors({});
      alert('Task added successfully!');

    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error adding task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      title: '',
      subtitle: '',
      message: ''
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-4 sm:py-8">
      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
            <FaPlus className="w-6 h-6 text-purple-600" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Add New Task
          </h1>
          <p className="text-gray-600">
            Create a new task by filling out the form below
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 sm:p-8">

            <div className="mb-6">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Task Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                  errors.title
                    ? 'border-red-300 bg-red-50'
                    : 'border-gray-300 hover:border-gray-400 focus:border-purple-500'
                }`}
                placeholder="Enter task title"
                disabled={loading}
              />
              {errors.title && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  {/* <FaX className="w-4 h-4 mr-1" /> */}
                  {errors.title}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="subtitle"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Task Subtitle *
              </label>
              <input
                type="text"
                id="subtitle"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                  errors.subtitle
                    ? 'border-red-300 bg-red-50'
                    : 'border-gray-300 hover:border-gray-400 focus:border-purple-500'
                }`}
                placeholder="Enter task subtitle"
                disabled={loading}
              />
              {errors.subtitle && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  {/* <FaX className="w-4 h-4 mr-1" /> */}
                  {errors.subtitle}
                </p>
              )}
            </div>

            {/* Message Field */}
            <div className="mb-8">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Task Description *
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none ${
                  errors.message
                    ? 'border-red-300 bg-red-50'
                    : 'border-gray-300 hover:border-gray-400 focus:border-purple-500'
                }`}
                placeholder="Enter detailed task description..."
                disabled={loading}
              />
              <div className="mt-2 flex justify-between items-center">
                {errors.message ? (
                  <p className="text-sm text-red-600 flex items-center">
                    {/* <FaX className="w-4 h-4 mr-1" /> */}
                    {errors.message}
                  </p>
                ) : (
                  <p className="text-sm text-gray-500">
                    Minimum 10 characters required
                  </p>
                )}
                <span className="text-sm text-gray-400">
                  {formData.message.length} characters
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Adding Task...
                  </>
                ) : (
                  <>
                    <FaSave className="w-4 h-4 mr-2" />
                    Add Task
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleReset}
                disabled={loading}
                className="flex-1 sm:flex-none bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 text-gray-700 py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                {/* <FaX className="w-4 h-4 mr-2" /> */}
                Reset
              </button>
            </div>
          </form>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>All fields marked with * are required</p>
        </div>
      </div>
    </div>
  );
}

export default Addtask;

// import React, { useEffect, useState } from "react";

// const Addtask = () => {
//   const [farms, setFarms] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchFarms = async () => {
//       try {
//         const token = localStorage.getItem("authToken");
//         const res = await fetch("/api/v1/Farm/GetFarms", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!res.ok) {
//           throw new Error("Failed to fetch farms");
//         }

//         const result = await res.json();
//         console.log(result.data.data);

//         setFarms(result.data.data);
//         setError("");
//       } catch (err) {
//         console.error("Error fetching farms:", err);
//         setError(err.message || "An error occurred");
//         setFarms([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFarms();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <p className="text-gray-600 text-lg">Loading farms...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4">
//       <div className="max-w-4xl mx-auto">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">
//           Farms List ({farms.length})
//         </h2>

//         {error ? (
//           <div className="text-red-600 bg-red-100 p-4 rounded-md">{error}</div>
//         ) : farms.length === 0 ? (
//           <p className="text-gray-500">No farms found.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {farms?.map((farm, index) => (
//               <div
//                 key={farm.id || index}
//                 className="border rounded-lg p-4 shadow-sm bg-white"
//               >
//                 <h3 className="font-semibold text-lg text-gray-900 mb-1">
//                   {farm.name || `Farm ${index + 1}`}
//                 </h3>
//                 {farm.location && (
//                   <p className="text-sm text-gray-600">📍 {farm.location}</p>
//                 )}
//                 {farm.farmsize && (
//                   <p className="text-sm text-gray-600">📏 {farm.farmsize}</p>
//                 )}
//                 {farm.cropType && (
//                   <p className="text-sm text-gray-600">🌾 {farm.cropType}</p>
//                 )}

//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Addtask;
