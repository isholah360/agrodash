import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import Footer from "../../page/footer.";

export default function GLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState();
  useEffect(() => {
    try {
      const storedUser = jwtDecode(localStorage.getItem("authToken"));
      if (storedUser) {
        setUser(storedUser.UserId);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Failed to load user:", err);
      setUser(null);
    }
  }, []);
  console.log(user);
  return (
    <div className="relative ">
      <div className="absolute z-20 w-full">
        <div className="w-1/2">
          <header className="ml-[5%] md:ml-[6.5rem] pt-7 relative">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center">
                <span className="text-black text-2xl font-bold">Oyo</span>
                <span className="text-green-600 text-2xl font-bold">Aims</span>
              </div>

              {/* Desktop Nav */}
              <nav className="hidden lg:flex space-x-3 text-sm">
                <Link to="/" className="text-gray-700 hover:text-green-600">
                  Home
                </Link>
                <Link to="about" className="text-gray-700 hover:text-green-600">
                  About
                </Link>
                <Link
                  to="whatwedo"
                  className="text-gray-700 hover:text-green-600"
                >
                  What we do
                </Link>
                <Link
                  to="#sustainability"
                  className="text-gray-700 hover:text-green-600"
                >
                  Sustainability
                </Link>
              </nav>

              {/* Hamburger Icon (mobile only) */}
            </div>
          </header>
        </div>

        <div className="w-1/2">
          <div className="hidden lg:block bg-black absolute top-10 text-amber-100 right-10 px-4 py-2 rounded-full text-sm">
           {user ? (
                <Link
                  to="/"
                  onClick={() => {
                    localStorage.removeItem("authToken");
                    localStorage.removeItem("user");
                    setUser(null);
                    setMenuOpen(false);
                  }}
                  className="mt-2 text-white rounded-2xl bg-black  hover:text-green-600 text-center px-3 py-1"
                >
                  <span>Logout</span>
                </Link>
              ) : (
                <Link
                  to="login"
                  onClick={() => setMenuOpen(false)}
                  className="mt-2 text-white rounded-2xl bg-black  hover:text-green-600 text-center px-3 py-1"
                >
                  <span>Login</span>
                </Link>
              )}
          </div>
        </div>

        <button
          className="lg:hidden text-gray-700 focus:outline-none absolute right-10 top-10"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}

          {menuOpen && (
            <div className="lg:hidden absolute right-[-2.5rem] p-[5rem] pr-[1rem] bg-white shadow-md rounded-lg mx-4 mt-5 flex flex-col space-y-3 text-sm">
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 hover:text-green-600 text-right"
              >
                Home
              </Link>
              <Link
                to="about"
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 hover:text-green-600 text-right"
              >
                About
              </Link>
              <Link
                to="whatwedo"
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 hover:text-green-600 text-right"
              >
                What we do
              </Link>
              <Link
                to="#sustainability"
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 hover:text-green-600 text-right"
              >
                Sustainability
              </Link>
              {user ? (
                <Link
                  to="login"
                  onClick={() => {
                    localStorage.removeItem("authToken");
                    localStorage.removeItem("user");
                    setUser(null);
                    setMenuOpen(false);
                  }}
                  className="mt-2 text-white rounded-2xl bg-black  hover:text-green-600 text-center px-3 py-1"
                >
                  <span>Logout</span>
                </Link>
              ) : (
                <Link
                  to="login"
                  onClick={() => setMenuOpen(false)}
                  className="mt-2 text-white rounded-2xl bg-black  hover:text-green-600 text-center px-3 py-1"
                >
                  <span>Login</span>
                </Link>
              )}
            </div>
          )}
        </button>
      </div>

      <Outlet />
      <footer className=" pt-6">
        <Footer />
      </footer>
    </div>
  );
}
