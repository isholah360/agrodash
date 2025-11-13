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
import Crops from "./page/crops";
import Livestocks from "./page/livestock";
import Feeds from "./page/feeds";
import Processor from "./page/processor";
import Admin from "./page/admin";
import AssoList from "./page/assoList";
import EditAsso from "./page/editAsso";
import UserProfile from "./page/userProfile";
import ForgotPassword from "./page/resetPw";
import ResetPassword from "./page/ResetPassword";

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
          <Route path="/userProfile/:id" element={<UserProfile />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/reset-pw" element={<ResetPassword />} />
        </Route>

        <Route element={<Layout />}>
          {/* <Route path="/" element={<Hero />} /> */}
          <Route path="/dashboard" element={<Home />} />
          <Route path="/officer" element={<Officer />} />
          <Route path="/officer/:id" element={<OfficerDetails />} />
          <Route path="/farmers" element={<Farmers />} />
          <Route path="/farms" element={<Farms />} />
          <Route path="/addofficer" element={<AddUser />} />
          <Route path="/createfarm" element={<CreateFarmForm />} />
          <Route path="/createfarmer" element={<CreateFarmer />} />
          <Route path="/farmers/:id" element={<FarmerDetails />} />
          <Route path="/livestock" element={<Livestock />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/notification" element={<Addtask />} />
          <Route path="/login" element={<Login />} />
          <Route path="/crops" element={<Crops />} />
          <Route path="/livestocks" element={<Livestocks />} />
          <Route path="/feeds" element={<Feeds />} />
          <Route path="/processors" element={<Processor />} />
          <Route path="/adminProfile" element={<Admin />} />
          <Route path="/association/create" element={<Association />} />
          <Route path="/association/list" element={<AssoList/>} />
          <Route path="/associations/edit/:id" element={<EditAsso/>} />
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
