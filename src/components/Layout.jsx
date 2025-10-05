import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      <div className="absolute top-4 left-4 z-20 md:hidden">
        <FaBars
          className="text-gray-600 cursor-pointer"
          size={24}
          onClick={() => setSidebarOpen((prev) => !prev)}
        />
      </div>

      <div
        className={`w-64 bg-white shadow-md border-r border-gray-200 fixed top-0 bottom-0 left-0 z-25 transition-transform duration-300 md:translate-x-0 ${
          sidebarOpen
            ? "translate-x-0 top-13"
            : "-translate-x-full md:translate-x-0 top-0"
        }`}
      >
        <Sidebar />
      </div>

      {/* Overlay (mobile only) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-0 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

  
      <div className="flex-1 flex flex-col md:ml-64">
    
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
          <Header />
        </div>

        <main className="flex-1 p-6 overflow-y-auto overflow-x-hidden">
          <Outlet /> 
        </main>
        <footer className="py-3 px-6 text-center text-xs text-gray-500 bg-white border-t border-gray-200">
           hello
        </footer>
      </div>
    </div>
  );
};

export default Layout;
