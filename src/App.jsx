import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Officer from "./components/Officer";
import Home from "./components/Home";
import OfficerDetails from "./components/OfficerDetails";
import Farmers from "./components/Farmers";
import Livestock from "./components/Livestock";
import Reports from "./components/Reports";
import FarmerDetails from "./components/FarmerDetails";
import Addtask from "./page/addTask";
import Login from "./components/Login";
import Hero from "../page/Hero";
import Farms from "../page/Farms";
import CreateFarmForm from "./page/createFarm";
import CreateFarmer from "./page/createFarmer";
import About from "./page/about";
import GLayout from "./components/gLayout";
import Service from "../page/services";
import AddUser from "./page/addUser";
import PublicOfficer from "./page/publicOfficer";
import Department from "./page/department";
import Association from "./page/association";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<GLayout />}>
          <Route path="/" element={<Hero />} />
          <Route path="/about" element={<About />} />
          <Route path="/whatwedo" element={<Service />} />
          <Route path="/user" element={<PublicOfficer />} />
          <Route path="/createfarm" element={<CreateFarmForm />} />
          <Route path="/createfarmer" element={<CreateFarmer />} />
          <Route path="/login" element={<Login />} />
          <Route path="/departments" element={<Department />} />
        </Route>

        <Route element={<Layout />}>
          {/* <Route path="/" element={<Hero />} /> */}
          <Route path="/dashboard" element={<Home />} />
          <Route path="/officer" element={<Officer />} />
          <Route path="/officer/:id" element={<OfficerDetails />} />
          <Route path="/farmers" element={<Farmers />} />
          <Route path="/farms" element={<Farms />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/createfarm" element={<CreateFarmForm />} />
          <Route path="/createfarmer" element={<CreateFarmer />} />
          <Route path="/farmers/:id" element={<FarmerDetails />} />
          <Route path="/livestock" element={<Livestock />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/notification" element={<Addtask />} />
          <Route path="/login" element={<Login />} />
          <Route path="/association" element={<Association />} />
        </Route>
      </Routes>
    </Router>
  );
}

{/* <Route
  element={
    <ProtectedRoute>
      <Layout />
    </ProtectedRoute>
  }
>
  <Route path="/dashboard" element={<Home />} />
  <Route path="/officer" element={<Officer />} />
  <Route path="/officer/:id" element={<OfficerDetails />} />
  <Route path="/farmers" element={<Farmers />} />
  <Route path="/farms" element={<Farms />} />
  <Route path="/adduser" element={<AddUser />} />
  <Route path="/createfarm" element={<CreateFarmForm />} />
  <Route path="/createfarmer" element={<CreateFarmer />} />
  <Route path="/farmers/:id" element={<FarmerDetails />} />
  <Route path="/livestock" element={<Livestock />} />
  <Route path="/reports" element={<Reports />} />
  <Route path="/notification" element={<Addtask />} />
  <Route path="/login" element={<Login />} />
</Route>; */}
