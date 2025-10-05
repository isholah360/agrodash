import React from "react";
import { FiArrowUpRight } from "react-icons/fi";

const BenefitsSection = () => {
  return (
    <div className="bg-gray-50 px-6 py-12 md:py-16 lg:px-24">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div>
          <span className="inline-block text-sm font-semibold text-gray-600 bg-black py-1 px-4 mb-5 rounded-xl">
            Our Featured
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Benefits Gained From <br />
            Using Our <span className="text-green-600">OyoAims</span> Solution
          </h2>

          <div className="bg-black text-white rounded-lg p-6 mb-4 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-white text-black px-2 py-0.5 text-xs font-bold rounded">
                  24/7
                </span>
                <h4 className="text-lg font-semibold">Smart Irrigation</h4>
              </div>
              <p className="text-sm text-gray-300">
                Signs to look out for, such as unusually high water bills, water
                stains, or the sound of running water when no fixtures are in
                use.
              </p>
            </div>
          </div>

          {/* Features List */}
          <div className="space-y-3">
            {[
              "Crop Monitoring",
              "Predictive Analytics",
              "Mobile Accessibility",
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-md transition"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <span role="img" aria-label="icon">
                      🌿
                    </span>
                  </div>
                  <span className="font-medium text-gray-700">{feature}</span>
                </div>
                <span className="text-xl text-gray-400">→</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center md:text-left">
          <div className="text-right flex-col items-end justify-items-end ">
            <p className="text-gray-600 text-md mb-4 md:mb-6">
              Our planet’s population is growing rapidly & <br />
              so is the need for more food. million people go to bed.
            </p>
            <div className="flex">
              <button className="bg-green-600  hover:bg-green-500 text-white px-5 py-2 rounded-full font-semibold flex items-center space-x-2">
                <span>Get Started</span>
              </button>
              <span className="bg-black rounded-full p-2 text-2xl text-white">
                {" "}
                <FiArrowUpRight />
              </span>
            </div>
          </div>

          <div className="mt-8 w-[100%]">
            <img
              src="/farm2.jpeg"
              alt="Drone Monitoring"
              className="rounded-xl mx-auto md:mx-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;
