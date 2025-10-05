import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  if (!user || user.role !== "1") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;


// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Layout from "./components/Layout";
// import Officer from "./components/Officer";
// import Home from "./components/Home";
// import OfficerDetails from "./components/OfficerDetails";
// import Farmers from "./components/Farmers";
// import Livestock from "./components/Livestock";
// import Reports from "./components/Reports";
// import FarmerDetails from "./components/FarmerDetails";
// import Addtask from "./components/Addtask";
// import Login from "./components/Login";
// import Hero from "../page/Hero";
// import Farms from "../page/Farms";
// import CreateFarmForm from "./page/createFarm";
// import CreateFarmer from "./page/createFarmer";
// import ProtectedRoute from "./components/ProtectedRoute"; 

// export default function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Hero />} />
//         <Route path="/createfarm" element={<CreateFarmForm />} />
//         <Route path="/createfarmer" element={<CreateFarmer />} />
//         <Route path="/login" element={<Login />} />

//         {/* Protected Routes */}
//         <Route
//           element={
//             <ProtectedRoute>
//               <Layout />
//             </ProtectedRoute>
//           }
//         >
//           <Route path="/dashboard" element={<Home />} />
//           <Route path="/officer" element={<Officer />} />
//           <Route path="/officer/:id" element={<OfficerDetails />} />
//           <Route path="/farmers" element={<Farmers />} />
//           <Route path="/farms" element={<Farms />} />
//           <Route path="/farmers/:id" element={<FarmerDetails />} />
//           <Route path="/livestock" element={<Livestock />} />
//           <Route path="/reports" element={<Reports />} />
//           <Route path="/addtask" element={<Addtask />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }
