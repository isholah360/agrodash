// import React, { useState, useEffect } from 'react';

// const ProjectTable = () => {
//   const [isMobile, setIsMobile] = useState(false);

//   const projects = [
//     { name: 'Mike', status: 'In Progress', lead: '👤', priority: 'High', location: 'Oyo' },
//     { name: 'Adebola', status: 'Not Started', lead: '👤', priority: 'Low', location: 'Ido' },
//     { name: 'Bola', status: 'In Progress', lead: '👤', priority: 'High', location: 'Ojo' },
//     { name: 'Tope', status: 'Completed', lead: '👤', priority: 'Low', location: 'Ibadan East' },
//     { name: 'Bosun', status: 'In Progress', lead: '👤', priority: 'Medium', location: 'Eruwa' },
//     { name: 'Lawal', status: 'Scheduled', lead: '👤', priority: 'Low', location: 'Ogbomoso' },
//     { name: 'Bosun', status: 'Scheduled', lead: '👤', priority: 'Low', location: 'Ogbomoso' },
//     { name: 'Kola', status: 'Scheduled', lead: '👤', priority: 'Low', location: 'Ogbomoso' },
//   ];

//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     checkScreenSize();
//     window.addEventListener('resize', checkScreenSize);
//     return () => window.removeEventListener('resize', checkScreenSize);
//   }, []);

//   const getStatusStyles = (status) => {
//     switch (status) {
//       case 'In Progress':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'Completed':
//         return 'bg-green-100 text-green-800';
//       case 'Scheduled':
//         return 'bg-blue-100 text-blue-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getPriorityStyles = (priority) => {
//     switch (priority) {
//       case 'High':
//         return 'text-red-600';
//       case 'Medium':
//         return 'text-yellow-600';
//       default:
//         return 'text-gray-600';
//     }
//   };


//   if (isMobile) {
//     return (
//       <div className="space-y-4">
//         {projects.map((project, i) => (
//           <div key={i} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
//             <div className="flex justify-between items-start mb-3">
//               <h4 className="font-semibold text-gray-900">{project.name}</h4>
//               <span className={`px-2 py-1 text-xs rounded-full ${getStatusStyles(project.status)}`}>
//                 {project.status}
//               </span>
//             </div>
            
//             <div className="grid grid-cols-2 gap-2 text-sm">
//               <div>
//                 <span className="text-gray-500">Team Lead:</span>
//                 <span className="ml-2">{project.lead}</span>
//               </div>
//               <div>
//                 <span className="text-gray-500">Priority:</span>
//                 <span className={`ml-2 font-medium ${getPriorityStyles(project.priority)}`}>
//                   {project.priority}
//                 </span>
//               </div>
//               <div className="col-span-2">
//                 <span className="text-gray-500">Location:</span>
//                 <span className="ml-2">{project.location}</span>
//               </div>
//             </div>
//           </div>
//         ))}
    
//         <div className="flex flex-col items-center space-y-3 mt-6">
//           <span className="text-sm text-gray-500">Showing 7 to 20 of 20 entries</span>
//           <div className="flex space-x-1">
//             <button className="px-2 py-1 text-sm border border-gray-300 rounded">Prev</button>
//             <button className="px-3 py-1 text-sm bg-purple-500 text-white rounded">1</button>
//             <button className="px-3 py-1 text-sm bg-purple-600 text-white rounded">2</button>
//             <button className="px-3 py-1 text-sm border border-gray-300 rounded">3</button>
//             <button className="px-2 py-1 text-sm border border-gray-300 rounded">Next</button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full">
     
//       <div className="overflow-x-auto -mx-5 px-5">
//         <div className="min-w-full inline-block align-middle">
//           <table className="min-w-full text-sm">
//             <thead>
//               <tr className="border-b border-gray-200">
//                 <th className="text-left py-3 px-4 font-medium text-gray-700 whitespace-nowrap">Officer</th>
//                 <th className="text-left py-3 px-4 font-medium text-gray-700 whitespace-nowrap">Status</th>
//                 <th className="text-left py-3 px-4 font-medium text-gray-700 whitespace-nowrap">Team Lead</th>
//                 <th className="text-left py-3 px-4 font-medium text-gray-700 whitespace-nowrap">Priority</th>
//                 <th className="text-left py-3 px-4 font-medium text-gray-700 whitespace-nowrap">Location</th>
//               </tr>
//             </thead>
//             <tbody>
//               {projects.map((project, i) => (
//                 <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
//                   <td className="py-3 px-4 font-medium whitespace-nowrap">{project.name}</td>
//                   <td className="py-3 px-4">
//                     <span className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${getStatusStyles(project.status)}`}>
//                       {project.status}
//                     </span>
//                   </td>
//                   <td className="py-3 px-4 text-center">{project.lead}</td>
//                   <td className="py-3 px-4">
//                     <span className={`text-xs font-medium whitespace-nowrap ${getPriorityStyles(project.priority)}`}>
//                       {project.priority}
//                     </span>
//                   </td>
//                   <td className="py-3 px-4">
//                     <span className="text-gray-600 whitespace-nowrap">{project.location}</span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Desktop Pagination */}
//       <div className="flex flex-col sm:flex-row items-center justify-between mt-6 space-y-3 sm:space-y-0">
//         <span className="text-sm text-gray-500">Showing 7 to 20 of 20 entries</span>
//         <div className="flex space-x-1">
//           <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">Previous</button>
//           <button className="px-3 py-1 text-sm bg-purple-500 text-white rounded hover:bg-purple-600">1</button>
//           <button className="px-3 py-1 text-sm bg-purple-600 text-white rounded hover:bg-purple-700">2</button>
//           <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">3</button>
//           <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">Next</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectTable;


// // import React, { useState, useEffect, useMemo } from "react";

// // const ProjectTable = ({ officers = [] }) => {
// //   const [isMobile, setIsMobile] = useState(false);
// //   const [search, setSearch] = useState("");
// //   const [currentPage, setCurrentPage] = useState(1);

// //   const pageSize = 6; // number per page

// //   // --- Map officers to project rows ---
// //   const projects = officers.map((off) => ({
// //     name: `${off.firstname} ${off.lastname}`,
// //     status: "Active",
// //     lead: off.adminId?.email || "👤 admin",
// //     phone: off.phone || "",
// //     email: off.email || "",
// //     location: off.address || "Unknown",
// //     lga: off.lga || off.address || "",
// //   }));

// //   // --- Search Filter ---
// //   const filteredProjects = useMemo(() => {
// //     return projects.filter((p) => {
// //       const term = search.toLowerCase();
// //       return (
// //         p.name.toLowerCase().includes(term) ||
// //         p.phone.toLowerCase().includes(term) ||
// //         p.email.toLowerCase().includes(term) ||
// //         p.location.toLowerCase().includes(term) ||
// //         p.lga.toLowerCase().includes(term)
// //       );
// //     });
// //   }, [search, projects]);

// //   // --- Pagination Logic ---
// //   const totalPages = Math.ceil(filteredProjects.length / pageSize);
// //   const paginatedData = filteredProjects.slice(
// //     (currentPage - 1) * pageSize,
// //     currentPage * pageSize
// //   );

// //   useEffect(() => {
// //     const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
// //     checkScreenSize();
// //     window.addEventListener("resize", checkScreenSize);
// //     return () => window.removeEventListener("resize", checkScreenSize);
// //   }, []);

// //   const getStatusStyles = (status) => {
// //     switch (status) {
// //       case "Active":
// //         return "bg-green-100 text-green-800";
// //       case "Inactive":
// //         return "bg-gray-100 text-gray-800";
// //       default:
// //         return "bg-gray-100 text-gray-800";
// //     }
// //   };

// //   // ====================================================================================
// //   // MOBILE VIEW
// //   // ====================================================================================
// //   if (isMobile) {
// //     return (
// //       <div className="space-y-4 mt-10">

// //         {/* Search Bar */}
// //         <input
// //           type="text"
// //           placeholder="🔍 Search officer by name, email, phone..."
// //           className="w-full p-3 border rounded-lg mb-4 bg-white shadow-sm"
// //           value={search}
// //           onChange={(e) => {
// //             setSearch(e.target.value);
// //             setCurrentPage(1);
// //           }}
// //         />

// //         {paginatedData.map((project, i) => (
// //           <div
// //             key={i}
// //             className="bg-gray-50 rounded-lg p-4 border border-gray-200 shadow-sm"
// //           >
// //             <div className="flex justify-between items-start mb-3">
// //               <h4 className="font-semibold text-gray-900 flex items-center">
// //                 👮 {project.name}
// //               </h4>
// //               <span
// //                 className={`px-2 py-1 text-xs rounded-full ${getStatusStyles(
// //                   project.status
// //                 )}`}
// //               >
// //                 {project.status}
// //               </span>
// //             </div>

// //             <div className="text-sm space-y-1">
// //               <p><span className="text-gray-500">📧 Email:</span> {project.email}</p>
// //               <p><span className="text-gray-500">📞 Phone:</span> {project.phone}</p>
// //               <p><span className="text-gray-500">📍 Location:</span> {project.location}</p>
// //             </div>
// //           </div>
// //         ))}

// //         {/* SIMPLE MOBILE PAGINATION */}
// //         <div className="flex justify-center mt-4 space-x-2">
// //           <button
// //             disabled={currentPage === 1}
// //             onClick={() => setCurrentPage((p) => p - 1)}
// //             className="px-3 py-1 bg-gray-200 rounded disabled:opacity-40"
// //           >
// //             Prev
// //           </button>
// //           <button
// //             disabled={currentPage === totalPages}
// //             onClick={() => setCurrentPage((p) => p + 1)}
// //             className="px-3 py-1 bg-gray-200 rounded disabled:opacity-40"
// //           >
// //             Next
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // ====================================================================================
// //   // DESKTOP TABLE VIEW
// //   // ====================================================================================
// //   return (
// //     <div className="w-full mt-15 bg-white p-6 rounded-xl shadow-sm border border-gray-200">

// //       {/* Search Bar */}
// //       <div className="mb-4 flex justify-between items-center">
// //        <div className="flex-1/4"><h2 className="text-lg font-bold text-gray-800">Officers
// //         </h2></div>
// //        <div className="flex-2/4">
// //          <input
// //           type="text"
// //           placeholder="🔍 Search officer by name, phone, email, LGA..."
// //           className="w-full p-3 border rounded-lg bg-white shadow-sm"
// //           value={search}
// //           onChange={(e) => {
// //             setSearch(e.target.value);
// //             setCurrentPage(1);
// //           }}
// //         />
// //        </div>
// //       </div>

// //       <div className="overflow-x-auto bg-white shadow rounded-xl p-4">
// //         <table className="min-w-full text-sm">
// //           <thead>
// //             <tr className="border-b">
// //               <th className="text-left py-3 px-4">Officer 👮</th>
// //               <th className="text-left py-3 px-4">Status</th>
// //               <th className="text-left py-3 px-4">Email 📧</th>
// //               <th className="text-left py-3 px-4">Phone 📞</th>
// //               <th className="text-left py-3 px-4">Address📍</th>
// //             </tr>
// //           </thead>

// //           <tbody>
// //             {paginatedData.map((project, i) => (
// //               <tr
// //                 key={i}
// //                 className="border-b hover:bg-gray-50 transition"
// //               >
// //                 <td className="py-3 px-4 font-medium">{project.name}</td>

// //                 <td className="py-3 px-4">
// //                   <span
// //                     className={`px-2 py-1 text-xs rounded-full ${getStatusStyles(
// //                       project.status
// //                     )}`}
// //                   >
// //                     {project.status}
// //                   </span>
// //                 </td>

// //                 <td className="py-3 px-4">{project.email}</td>
// //                 <td className="py-3 px-4">{project.phone}</td>
// //                 <td className="py-3 px-4">{project.location}</td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>

// //       {/* DESKTOP PAGINATION */}
// //       <div className="flex justify-between items-center mt-4">
// //         <p className="text-sm text-gray-600">
// //           Showing {paginatedData.length} of {filteredProjects.length} officers
// //         </p>

// //         <div className="flex space-x-1">
// //           <button
// //             onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
// //             disabled={currentPage === 1}
// //             className="px-3 py-1 border rounded disabled:opacity-40"
// //           >
// //             Prev
// //           </button>

// //           {[...Array(totalPages).keys()].map((n) => (
// //             <button
// //               key={n}
// //               onClick={() => setCurrentPage(n + 1)}
// //               className={`px-3 py-1 rounded ${
// //                 currentPage === n + 1
// //                   ? "bg-purple-600 text-white"
// //                   : "border"
// //               }`}
// //             >
// //               {n + 1}
// //             </button>
// //           ))}

// //           <button
// //             onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
// //             disabled={currentPage === totalPages}
// //             className="px-3 py-1 border rounded disabled:opacity-40"
// //           >
// //             Next
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProjectTable;

import React, { useState, useEffect, useMemo } from "react";

const ProjectTable = () => {
  const [officers, setOfficers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 6; // rows per page

  // Fetch officers from API
  useEffect(() => {
    const fetchOfficers = async () => {
      try {
        const token = localStorage.getItem("authToken");

        const res = await fetch(`api/v1/User/GetOfficers`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch officers");

        const result = await res.json();
        ;
        setOfficers(result.data.data || []);
        setError("");
      } catch (err) {
        console.error("Error fetching officers:", err);
        setError(err.message || "An error occurred");
        setOfficers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOfficers();
  }, []);
  
  officers.map((off) => console.log(off.address));
  // Responsive check
  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Map API data to table rows
  const projects = useMemo(() => {
    return officers.map((off) => ({
      name: `${off.firstname} ${off.lastname}`,
      status: off.status || "Active",
      lead: off.adminId?.email || "👤 Admin",
      phonenumber: off.phonenumber || "N/A",
      email: off.email || "N/A",
      address: off.address?.streetaddress || "Unknown",
      lga: off.lga || "",
    }));
  }, [officers]);

  // Filter based on search
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const term = search.toLowerCase();
      return (
        p.name.toLowerCase().includes(term) ||
        p.phonenumber.toLowerCase().includes(term) ||
        p.email.toLowerCase().includes(term) ||
        p.address?.streetaddress.toLowerCase().includes(term) ||
        p.lga.toLowerCase().includes(term)
      );
    });
  }, [search, projects]);

  // Pagination
  const totalPages = Math.ceil(filteredProjects.length / pageSize);
  const paginatedData = filteredProjects.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const getStatusStyles = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) return <div className="p-6 pt-10">Loading officers…</div>;
  if (error) return <div className="p-6 pt-10 text-red-600">❌ {error}</div>;

  // ------------------------ MOBILE VIEW ------------------------
  if (isMobile) {
    return (
      <div className="space-y-4 mt-6">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="🔍 Search officer by name, email, phone..."
          className="w-full p-3 border rounded-lg mb-4 bg-white shadow-sm"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />

        {paginatedData.map((project, i) => (
          <div
            key={i}
            className="bg-gray-50 rounded-lg p-4 border border-gray-200 shadow-sm"
          >
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-semibold text-gray-900 flex items-center">
                👮 {project.name}
              </h4>
              <span
                className={`px-2 py-1 text-xs rounded-full ${getStatusStyles(
                  project.status
                )}`}
              >
                {project.status}
              </span>
            </div>
            <div className="text-sm space-y-1">
              <p>
                <span className="text-gray-500">📧 Email:</span> {project.email}
              </p>
              <p>
                <span className="text-gray-500">📞 Phone:</span> {project.phonenumber}
              </p>
              <p>
                <span className="text-gray-500">📍 LGA:</span>{" "}
                {project.lga}
              </p>
            </div>
          </div>
        ))}

        {/* Pagination */}
        <div className="flex justify-center mt-4 space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-40"
          >
            Prev
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    );
  }

  // ------------------------ DESKTOP VIEW ------------------------
  return (
    <div className="w-full relative ">
      <div className="flex items-end  mb-10">
        
        <input
          type="text"
          placeholder="🔍 Search officer by name, phone, email, LGA..."
          className="w-full max-w-sm p-3 border rounded-lg bg-white shadow-sm absolute right-5"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-xl p-4 mt-5">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4">Officer 👮</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-left py-3 px-4">Email 📧</th>
              <th className="text-left py-3 px-4">Phone 📞</th>
              <th className="text-left py-3 px-4">LGA 📍</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((project, i) => (
              <tr
                key={i}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="py-3 px-4 font-medium">{project.name}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${getStatusStyles(
                      project.status
                    )}`}
                  >
                    {project.status}
                  </span>
                </td>
                <td className="py-3 px-4">{project.email}</td>
                <td className="py-3 px-4">{project.phonenumber}</td>
                <td className="py-3 px-4">{project.lga}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-600">
          Showing {paginatedData.length} of {filteredProjects.length} officers
        </p>
        <div className="flex space-x-1">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Prev
          </button>
          {[...Array(totalPages).keys()].map((n) => (
            <button
              key={n}
              onClick={() => setCurrentPage(n + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === n + 1
                  ? "bg-purple-600 text-white"
                  : "border"
              }`}
            >
              {n + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectTable;
