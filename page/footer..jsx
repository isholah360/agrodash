import React, { useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      alert("Please enter a valid email");
      return;
    }
    alert(`Subscribed with: ${email}`);
    setEmail("");
  };

  return (
    <footer className="mt-[-2rem] bg-black text-white pt-12 pb-8 px-6 md:px-12">
 
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start gap-8">

        <div className="md:w-2/5">
          <h2 className="text-sm md:text-sm  mb-4">
            Growing the Future of Farming with Innovation, Sustainability, and
            Smart Technology – Connecting Farmers to a Smarter Tomorrow.
          </h2>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full flex items-center space-x-2 transition-colors">
            <span>Contact Us</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>

        <div>
          <div className="md:w-3/5 lg:w-full">
            <h3 className="text-sm font-semibold mb-4 ml-3">Our Social Media</h3>
            <div className="flex w-full flex-wrap gap-3">
              {["Twitter", "Facebook", "Instagram", "Youtube"].map(
                (platform) => (
                  <button
                    key={platform}
                    className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full text-sm transition-colors"
                  >
                    {platform}
                  </button>
                )
              )}
            </div>
          </div>
          <ul className="flex w-full space-x-5 mt-5 ml-3">
            <li>
              <Link href="#about" className="hover:text-green-400">
                Home
              </Link>
            </li>
            <li>
              <Link href="#mission" className="hover:text-green-400">
                About
              </Link>
            </li>
            <li>
              <Link href="#stories" className="hover:text-green-400">
                What we do
              </Link>
            </li>
            <li>
              <Link href="#careers" className="hover:text-green-400">
                Sustainabilty
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
        <p>Isholah © 2025. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#privacy" className="hover:text-white">
            Privacy & Policy
          </a>
          <a href="#terms" className="hover:text-white">
            Terms & Conditions
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
