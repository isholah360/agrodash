import React from "react";
import bgImage from "/image6.jpeg"; // Replace with your image path
import { Link } from "react-router-dom";

const HeroCTA = () => {
  return (
    <section
      className="w-full h-[70vh] md:h-[80vh] bg-cover bg-center flex items-center justify-center rounded-xl overflow-hidden px-4"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="text-center text-white max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
          Ready to Transform Your <br /> Agricultural Practices?
        </h1>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-emerald-400 hover:bg-emerald-500 text-white px-6 py-3 rounded-full font-medium transition">
            <Link to="https://docs.google.com/forms/d/1Gfn1TYWR6Fm_RZExVCCW6wIOu4YGzlEzSnJ9308K61Q/viewform?edit_requested=true">
              Start Your Free Trial <span className="ml-2">↗</span>
            </Link>
          </button>
          <button className="bg-white text-black border-2 border-white px-6 py-3 rounded-full font-medium transition hover:bg-gray-100">
            <Link to="https://docs.google.com/forms/d/1Gfn1TYWR6Fm_RZExVCCW6wIOu4YGzlEzSnJ9308K61Q/viewform?edit_requested=true">
              Talk to an Expert <span className="ml-2">↗</span>
            </Link>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroCTA;
