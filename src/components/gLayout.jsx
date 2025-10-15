import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation , useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import Footer from "../../page/footer.";

export default function GLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation(); 
 const navigate = useNavigate();

  const checkAuth = () => {
    try {
      const token = localStorage.getItem("authToken");
      if (token) {
        const storedUser = jwtDecode(token);
        if (storedUser) {
          setUser(storedUser.UserId);
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Failed to load user:", err);
      setUser(null);
    }
  };

 
  useEffect(() => {
    checkAuth();
  }, [location]); 

  console.log("Current user:", user);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null);
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <div className="relative">
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
                <Link to="whatwedo" className="text-gray-700 hover:text-green-600">
                  What we do
                </Link>
                <Link to="departments" className="text-gray-700 hover:text-green-600">
                  Departments
                </Link>
              </nav>
            </div>
          </header>
        </div>

        <div className="w-1/2">
          <div className="hidden lg:block bg-black absolute top-10 text-amber-100 right-10 px-4 py-2 rounded-full text-sm">
            {user ? (
              <button
                onClick={handleLogout}
                className="text-white hover:text-green-600"
              >
                Logout
              </button>
            ) : (
              <Link
                to="login"
                className="text-white hover:text-green-600"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-gray-700 focus:outline-none absolute right-10 top-10"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden absolute right-[-1.2rem] p-[5rem] pr-[1rem] bg-white shadow-md rounded-lg mx-4 mt-5 flex flex-col space-y-3 text-sm">
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
              to="departments"
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 hover:text-green-600 text-right"
            >
              Departments
            </Link>
            {user ? (
              <Link to="/" onClick={handleLogout}>
              <button
                onClick={handleLogout}
                className="mt-2 text-white rounded-2xl bg-black hover:text-green-600 text-center px-3 py-1"
              >
                Logout
              </button>
              </Link>
            ) : (
              <Link
                to="login"
                onClick={() => setMenuOpen(false)}
                className="mt-2 text-white rounded-2xl bg-black hover:text-green-600 text-center px-3 py-1"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>

      <Outlet />
      <footer className="pt-6">
        <Footer />
      </footer>
    </div>
  );
}