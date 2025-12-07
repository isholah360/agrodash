import { FaSearch, FaBell, FaSun, FaUser } from "react-icons/fa";
import React, { useState, useRef, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState(null);
  const [open, setOpen] = useState(false);
  const searchRef = useRef(null);
  const menuRef = useRef(null);
  const userDetail = "";

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("username");
    if (token) {
      const payload = jwtDecode(token);
      setUser(payload);
      setUserName(name);
    }
  }, []);
  console.log(user);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };

    if (showSearch) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSearch]);

  const handleLogout = (e) => {
    const value = e.target.value;
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      setUser(null);
      navigate("/");
    }
  
  

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
     
      <div className="text-sm text-gray-600 flex items-center ml-8">
        <svg
          className="w-4 h-4 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
        26°C
      </div>


      <div className="flex items-center space-x-4" ref={searchRef}>
       
        {showSearch && (
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        )}

        {/* Search Icon */}
        <FaSearch
          className="text-gray-600 cursor-pointer"
          size={18}
          onClick={() => setShowSearch((prev) => !prev)}
        />

        {/* Other icons */}
        <FaBell className="text-gray-600 cursor-pointer" size={18} />
        <FaSun className="text-gray-600 cursor-pointer" size={18} />

        {user ? (
          <>
            <div className="relative inline-block text-left">
              <button
                onClick={() => setOpen(!open)}
                className="bg-transparent text-gray-800 font-semibold focus:outline-none"
              >
                {userName || "User"}
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md">
                  <Link
                    to="/adminProfile"
                    className="block px-4 py-2 hover:bg-green-100 hover:text-green-600"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-red-100 hover:text-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <FaUser />
        )}
      </div>
    </header>
  );
};

export default Header;
