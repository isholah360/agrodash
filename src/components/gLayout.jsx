import React from "react";
import { Link, Outlet } from "react-router-dom";
import Footer from "../../page/footer.";

export default function GLayout() {
  return (
    <div className="relative ">
     <div className="absolute z-20 w-full ">
        <div className="w-1/2">
         <header className=" ml-[5%] md:ml-[6.5rem] pt-7 relative">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center ">
            <span className="text-black text-2xl font-bold">Oyo</span>
            <span className=" text-green-600 text-2xl font-bold">Aims</span>
          </div>
          <nav className="hidden lg:flex space-x-3 text-sm">
            <Link to="/" className="text-gray-700 hover:text-green-600">
              Home
            </Link>
            <Link to="about" className="text-gray-700 hover:text-green-600">
              About
            </Link>
            <Link to="whoweare" className="text-gray-700 hover:text-green-600">
              What we do
            </Link>
            <Link
              to="sustainability"
              className="text-gray-700 hover:text-green-600"
            >
              Sustainability
            </Link>
          </nav>
        </div>
        <div></div>
      </header></div>
        <div className="w-1/2">
          <div className="bg-black absolute top-10 text-amber-100 right-10 px-4 py-2 rounded-full text-sm">
              <Link to="login" className="text-white hover:text-green-600">
              <span>Login</span>
            </Link>
           
          </div>
        </div>
       

     </div>

        
      <Outlet />
       <footer className=" pt-6">
      <Footer/>
      </footer>
    </div>
  );
}
