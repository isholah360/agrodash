import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Officer from "./components/Officer";
import Home from "./components/Home";
import OfficerDetails from "./components/OfficerDetails";
import Farmers from "./components/Farmers";
import Livestock from "./components/Livestock";
import Reports from "./components/Reports";

export default function App() {
  return (
    <Router>
      <Routes>
       
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/officer" element={<Officer />} />
          <Route path="/officer/:id" element={<OfficerDetails />} />
          <Route path="/farmers" element={<Farmers />} />
          <Route path="/livestock" element={<Livestock />} />
          <Route path="/reports" element={<Reports />} />
        </Route>
      </Routes>
    </Router>
  );
}
