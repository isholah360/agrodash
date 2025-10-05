// components/Header.jsx
import { FaSearch, FaBell, FaSun, FaUser } from 'react-icons/fa';
import React, { useState, useRef, useEffect } from 'react';

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef(null);
 const user = "" // Simulating user authentication

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };

    if (showSearch) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSearch]);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      {/* Left: Weather or logo or other */}
      <div className="text-sm text-gray-600 flex items-center ml-8">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        26°C
      </div>

      {/* Right: Icons + search */}
      <div className="flex items-center space-x-4" ref={searchRef}>
        {/* Toggleable Search Input */}
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

        { user ? <>
         { <img
          src="https://randomuser.me/api/portraits/women/45.jpg"
          alt="User"
          className="w-8 h-8 rounded-full"
        />} 
        </> : <FaUser/>}

      
      </div>
    </header>
  );
};

export default Header;
