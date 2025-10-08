import { Link, useLocation, useNavigate } from "react-router-dom";
import React from "react";

const Sidebar = ({ closeSidebar }) => {
  const location = useLocation();

  const userRole = localStorage.getItem("role");
  const userId = parseInt(localStorage.getItem("userId"));
  const navigation = useNavigate();

  const handleNagivate = () => {
    navigation("/");
  }

  const menuItems = [
    { label: "Dashboard", icon: "🏠", page: "/dashboard" },
    { label: "Officer", icon: "👮‍♂️", page: "/officer" },
    { label: "Farmers", icon: "👨‍🌾", page: "/farmers" },
    { label: "Farms", icon: "🚜", page: "/farms" },
    { label: "LivesStocks", icon: "🐄", page: "/livestock" },
    { label: "AddTask", icon: "📝", page: "/addtask" },
  ];
  if (userRole === "admin" || userId === 4) {
    menuItems.push(
      { label: "AddUser", icon: "🧑‍💼", page: "/adduser" },
      { label: "CreateFarm", icon: "🧑‍💼", page: "/createfarm" },
      { label: "CreateFarmer", icon: "🧑‍💼", page: "/createfarmer" }
    );
  }
  return (
    <aside className="w-64 bg-white shadow-md min-h-screen p-4 border-r border-gray-200">
      <div className="flex items-center mb-8">
        <div className="text-2xl font-bold text-green-600 my-5 pt-3 ml-2.5" onClick={handleNagivate} style={{ cursor: 'pointer' }}>
          OyoAims
        </div>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item, index) => (
          <div key={index}>
            <Link
              to={item.page}
              onClick={closeSidebar}
              className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-all ${
                location.pathname === item.page
                  ? "bg-purple-100 text-green-600"
                  : "text-gray-700 hover:bg-green-400"
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
