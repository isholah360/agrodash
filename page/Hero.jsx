// src/components/HomePage.jsx
import React, { useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import StatsSection from "./StatsSection";
import { Link } from "react-router-dom";
import BenefitsSection from "./BenefitsSection";
import Insights from "./insight";
import HeroCTA from "./HeroCTA";
import Footer from "./footer.";

const Hero = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="bg-gray-50 font-sans relative h-[95lvh]">
        <div className="hidden md:block absolute w-1/2 h-[98%] top-0 right-0 pr-6 pt-6">
          <img
            src="/my.jpeg"
            alt="Drone spraying crops"
            className="w-full h-full rounded-xl shadow-lg right"
          />
         
        </div>

        {/* <header className="ml-[5%] md:ml-[6.5rem] md:w-1/3 pt-7 relative">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center ">
            <div className="flex items-center ">
              <span className="text-black text-2xl font-bold">Oyo</span>
              <span className=" text-green-600 text-2xl font-bold">Aims</span>
            </div>
            <nav className="hidden lg:flex space-x-3 absolute right-[-5rem] text-sm">
              <Link
                to="/"
                className="text-gray-700 hover:text-green-600"
              >
                Home
              </Link>
              <Link to="about" className="text-gray-700 hover:text-green-600">
               About
              </Link>
              <Link
                to="whoweare"
                className="text-gray-700 hover:text-green-600"
              >
                 Who we are
              </Link>
              <Link to="sustainability" className="text-gray-700 hover:text-green-600">
                Sustainability
              </Link>
            </nav>
          </div>
        </header> */}

     
        <section className="container mx-auto px-4 py-12 md:py-20 flex flex-col md:flex-row items-center gap-8 relative">
      
          <div className="md:w-1/2 space-y-6 mt-10">
            <h1 className="text-4xl mt-10 md:text-5xl font-bold text-gray-900 leading-tight">
             Powering Data-Driven{" "}
              <span className="text-green-600">Agriculture in OYO State</span>
            </h1>
            <p className="text-gray-600 text-lg">
              Managing farmers, farms, programmes, and services on one unified platform.
            </p>
            <div className="flex items-center mt-[4rem]">
              <button className="bg-green-600 hover:bg-green-500 text-white px-5 py-2 rounded-full font-semibold flex items-center space-x-2">
                <Link to="/whatwedo">
                <span>Learn More</span></Link> 
                
              </button>
              <span className="bg-black rounded-full p-2 text-2xl text-white">
                {" "}
                <FiArrowUpRight />
              </span>
            </div>
       
          </div>
          <div className="hidden lg:block absolute right-0 bottom-[8rem]">
            <button className="flex items-center space-x-2 text-green-400 font-semibold text-xl">
             
                   <Link to="/whatwedo">
                 <span className="text-white text-xl font-bold">Explore More</span></Link> 
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.207l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 12.586l2.293 2.293a1 1 0 001.414 0l3-3a1 1 0 000-1.414L13.707 11a1 1 0 00-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <div className="hidden lg:block w-1/2 relative">
            <div className="absolute w-full h-full top-0">
              <img
                src="/my.jpeg"
                alt="Drone spraying crops"
                className="w-full h-full rounded-xl shadow-lg right"
              />
            </div>

            <div className="absolute bottom-[-12rem] left-4 bg-white p-4 rounded-xl shadow-md max-w-xs">
              <div className="flex items-center space-x-3 mb-2">
                <img
                  src="/my.jpeg"
                  alt="Support Agent"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="text-sm font-semibold">24/7 Support For</p>
                  <p className="text-sm text-green-600 font-bold">
                    Technical Support
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="w-full bg-gray-200 justify-center items-center">
       <StatsSection />
       <BenefitsSection/>
       <Insights/>
       <HeroCTA/>
      </div>
    </>
  );
};

export default Hero;
