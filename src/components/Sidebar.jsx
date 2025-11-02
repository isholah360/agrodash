import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";

const Sidebar = ({ closeSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const userRole = localStorage.getItem("role");
  const userId = parseInt(localStorage.getItem("userId"));

  const [openMenus, setOpenMenus] = useState({});

  const toggleSubmenu = (label) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const handleNavigateHome = () => {
    navigate("/");
  };

  const menuItems = [
    { label: "Dashboard", icon: "🏠", page: "/dashboard" },
    {
      label: "Officer",
      icon: "👮‍♂️",
      page: "/officer",
      submenu: [
        { label: "ViewOfficers", page: "/officer" },
        { label: "CreateOfficer", page: "/addofficer" },
      ],
    },
    {
      label: "Farmers",
      icon: "👨‍🌾",
      page: "/farmers",
      submenu: [
        { label: "AllFarmers", page: "/farmers" },
        { label: "Add Farmer", page: "/createfarmer" },
      ],
    },
    {
      label: "Farms",
      icon: "🚜",
      page: "/#farms",
      submenu: [
        { label: "Livestocks", icon: "🐄", page: "/livestocks" },
        { label: "Crop", icon: "🌾", page: "/crops" },
        { label: "Feed", icon: "🥜", page: "/feeds" },
        { label: "Processor", icon: "🏭", page: "/processor" },
      ],
    },

    { label: "Notification", icon: "📝",  page: "#/notification",
      submenu: [
        { label: "Notifications", icon: "📝", page: "/notification" },
        { label: "Create Notification", icon: "", page: "/notification" },
        
      ], },
    { label: "Associations", icon: "🤝", page: "#/association",
      submenu: [
        { label: "Associations", icon: "🤝", page: "/association" },
        { label: "CreateAssociation", icon: "🤝", page: "/association" },
        
      ],  },
  ];

  if (userRole === "admin" || userId === 4) {
    menuItems.push({
      label: "Admin Tools",
      icon: "🧑‍💼",
      page: "#",
      submenu: [
        { label: "Add User", page: "/adduser" },
        { label: "Create Farm", page: "/createfarm" },
        { label: "Create Farmer", page: "/createfarmer" },
      ],
    });
  }

  return (
    <aside className="w-64 bg-white shadow-md min-h-screen p-4 border-r border-gray-200">
      {/* Logo */}
      <div className="flex items-center mb-8">
        <div
          className="text-2xl font-bold text-green-600 my-5 pt-3 ml-2.5 cursor-pointer"
          onClick={handleNavigateHome}
        >
          OyoAims
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-1">
        {menuItems.map((item, index) => (
          <div key={index}>
            {/* Main Menu */}
            <button
              onClick={() =>
                item.submenu ? toggleSubmenu(item.label) : navigate(item.page)
              }
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all ${
                location.pathname === item.page
                  ? "bg-green-100 text-green-600"
                  : "text-gray-700 hover:bg-green-50"
              }`}
            >
              <div className="flex items-center">
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </div>
              {item.submenu && (
                <option
                  className={`transition-transform ${
                    openMenus[item.label] ? "rotate-90" : ""
                  }`}
                >
                  ▶
                </option>
              )}
            </button>

            {/* Submenu */}
            {item.submenu && openMenus[item.label] && (
              <div className="ml-6 mt-1 space-y-1 border-l border-gray-200 pl-3">
                {item.submenu.map((sub, subIndex) => (
                  <Link
                    key={subIndex}
                    to={sub.page}
                    onClick={closeSidebar}
                    className={`block px-3 py-2 rounded-lg text-sm transition-all ${
                      location.pathname === sub.page
                        ? "bg-green-100 text-green-600 font-semibold"
                        : "text-gray-600 hover:bg-green-50"
                    }`}
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
