// import React, { useEffect, useState } from "react";
// import { FaArrowLeft } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const Farmers = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [farmers, setFarmers] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchFarms = async () => {
//       try {
//         const token = localStorage.getItem("authToken");
//         const res = await fetch("/api/v1/Farm/GetFarmers", {
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

//         setFarmers(result.data.data);
//         setError("");
//       } catch (err) {
//         console.error("Error fetching farms:", err);
//         setError(err.message || "An error occurred");
//         setFarmers([]);
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
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <button
//         className="mb-6 text-blue-600 flex items-center hover:underline"
//         onClick={() => navigate(-1)}
//       >
//         <FaArrowLeft className="mr-2" /> Back
//       </button>

//       <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//         {/* <div className="mb-6 flex justify-between items-center">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800">{officer.name}</h1>
//             <p className="text-gray-600">📧 {officer.email}</p>
//             <p className="text-gray-600">📞 {officer.phone}</p>
//           </div>
//           <div className="float-right text-gray-300 text-9xl">
//             <FaUser />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
//           <div className="bg-blue-100 text-blue-800 p-4 rounded-xl">
//             <h4 className="font-medium text-sm">Total Farmers</h4>
//             <p className="text-xl font-bold">{officer.farmers.length}</p>
//           </div>
//           <div className="bg-green-100 text-green-800 p-4 rounded-xl">
//             <h4 className="font-medium text-sm">Total Farms</h4>
//             <p className="text-xl font-bold">{totalFarms}</p>
//           </div>
//           <div className="bg-purple-100 text-purple-800 p-4 rounded-xl">
//             <h4 className="font-medium text-sm">Total Livestock</h4>
//             <p className="text-xl font-bold">{totalLivestock}</p>
//           </div>
//         </div> */}

//         {/* <div className="space-y-6 ">
//           {officer.farmers.map((farmer) => (
//             <>
//               <Link to={`/farmers/${farmer.id}`} className="mt-2">
//                 <div
//                   key={farmer.id}
//                   className="bg-gray-100 p-4 rounded-lg mt-2"
//                 >
//                   <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                     {farmer.name}
//                   </h3>

//                   <div className="grid sm:grid-cols-2 gap-4">
//                     <div>
//                       <h4 className="text-sm font-semibold text-gray-700 mb-1">
//                         Farms
//                       </h4>

//                       <ul className="list-disc list-inside text-sm text-gray-600">
//                         {farmer.farms.map((farm) => (
//                           <li key={farm.id}>
//                             {farm.name} - {farm.location}
//                           </li>
//                         ))}
//                       </ul>
//                     </div>

//                     <div>
//                       <h4 className="text-sm font-semibold text-gray-700 mb-1">
//                         Livestock
//                       </h4>
//                       <ul className="list-disc list-inside text-sm text-gray-600">
//                         {farmer.livestock.map((item) => (
//                           <li key={item.id}>
//                             {item.type} — {item.count}
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             </>
//           ))}
//         </div> */}
//       </div>
//       <div className="mt-6 bg-gray-100 p-6 rounded-xl shadow-sm border border-gray-200">
//         <ChartComponent />
//       </div>
//     </div>
//   );
// };

// export default Farmers;

// import { useEffect, useState } from "react";
// import React from "react";

// export default function GetFarmer() {
//   const [farmers, setFarmers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchFarmers = async () => {
//       try {
//          const token = localStorage.getItem("authToken")
//          console.log(token)

//         const response = await fetch(
//           "/api/v1/Farmer/GetFarmers",
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//                Authorization: `Bearer ${token}`, 
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error(`Failed to fetch farmers: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log(data.data.data);
//         setFarmers(data.data.data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFarmers();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64 text-green-700 text-lg font-semibold">
//         Loading farmers...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center text-red-600 font-semibold mt-10">
//         Error: {error}
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-12">
//       <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-10 text-center">
//         Registered Farmers
//       </h1>

//       {farmers.length === 0 ? (
//         <p className="text-center text-gray-500">No farmers found.</p>
//       ) : (
//         <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {farmers.map((farmer) => (
//             <div
//               key={farmer.farmerid}
//               className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
//             >
//               <div className="w-full h-48 overflow-hidden">
//                 <img
//                   src={farmer.photourl || "https://via.placeholder.com/200"}
//                   alt={farmer.firstname}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <div className="p-4 text-center">
//                 <h2 className="text-lg font-semibold text-gray-800 mb-1">
//                   {farmer.firstname} {farmer.lastname}
//                 </h2>
//                 <p className="text-sm text-gray-600 mb-1">{farmer.email}</p>
//                 <p className="text-sm text-gray-600 mb-2">
//                   📞 {farmer.phonenumber}
//                 </p>
//                 <p className="text-green-700 font-medium">
//                   Farms: {farmer.farms?.length || 0}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import React from "react";


export default function GetFarmer() {
  const [farmers, setFarmers] = useState([]);
  const [theiD, setTheiD] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
         const token = localStorage.getItem("authToken")
         const Id = localStorage.getItem("userId")
         setTheiD(Id)

        const response = await fetch(
          `/api/v1/Farmer/GetFarmers`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
               Authorization: `Bearer ${token}`, 
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch farmers: ${response.status}`);
        }

        const data = await response.json();
        console.log(data.data.data);
        setFarmers(data.data.data);
     
      
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

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-10 text-center">
        Registered Farmers
      </h1>

      {farmers.length === 0 ? (
        <p className="text-center text-gray-500">No farmers found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {farmers.map((farmer) => (
            <div
              key={farmer.farmerid}
              className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
               {farmer.userId === 4 ? <p>Admin</p> : <p>Officer</p>}
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
                </h2>
               
                <p className="text-sm text-gray-600 mb-1">{farmer.email}</p>
                <p className="text-sm text-gray-600 mb-2">
                  📞 {farmer.phonenumber}
                </p>
                <p className="text-green-700 font-medium">
                  Farms: {farmer.farms?.length || 0}
                </p>
              </div>
             
            </div>
          ))}
        </div>
      )}
    </div>
  );
}



