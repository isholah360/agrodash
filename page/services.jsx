// src/components/AgricultureServiceSection.jsx
import React from "react";
import ServiceAction from "./serviceAction";

const Service = () => {
  return (
    <>
    <div className="pt-[6rem]"></div>
    <div className="bg-white py-12 px-6 md:px-12">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-8 mb-12">
        <div className="md:w-full">
          <div className="flex mb-4 items-center text-3xl font-bold mb-2 lg:text-6xl ">
            <span>Who we are</span>
          </div>
          <div className="sm: md:flex justify-between space-y-6 ">
            <h1 className="flex text-3xl mt-4 md:text-4xl font-bold mb-4">
             <span className="w-full lg:w-full">
                  Empowering Farmers Through Sustainable Agricultural Solutions
             </span>
             <span className="w-1/2 lg:">
                  
             </span>
            </h1>
            <div className="sm: mt-5 md:w-1/2">
              <p className="text-s mb-6">
                We deliver integrated, farmer-centered services that strengthen
                food systems, improve livelihoods, and build climate resilience
                across rural communities.
              </p>
              <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Right: Stats + Image */}
      <div className="flex flex-col px-[5%] md:flex-row items-center gap-8 mb-16 ">
        <div className="relative h-64 bg-gray-200 rounded-xl overflow-hidden">
          <img
            src="/oyoa.jpeg"
            alt="Farmers working together"
            className="w-full h-full object-cover"
          />
        </div>
        <div className=" bg-green-50 w-full md:bg-green-50 p-6 py-[4.2rem] rounded-xl lg:w-1/4">
          <h3 className="text-xl font-semibold mb-2">Satisfied Farmers</h3>
          <div className="text-3xl font-bold mb-4">200K+</div>
          <div className="flex space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-8 h-8 bg-gray-300 rounded-full"></div>
            ))}
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <span className="text-white text-xs">+</span>
            </div>
          </div>
        </div>

        {/* Team/Farmer Image */}
        <div className="relative h-64 bg-gray-200 rounded-xl overflow-hidden">
          <img
            src="/oyob.jpeg"
            alt="Farmers working together"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-12"></div>

      {/* Services Section */}
      <div className="container mx-auto">
        <div className=" md:flex-row items-start gap-8">
          <div className="md:w-1/3">
            <div className="text-sm text-gray-500 mb-2">Our Core Value</div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Comprehensive Agricultural Support, All in One Place
            </h2>
          </div>

          {/* Right: Services Grid */}
          <div className="mt-5 md:w-full grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Policy Implementation",
                description:
                  "Supporting governments and institutions to design, adopt, and monitor inclusive agricultural policies that benefit smallholder farmers.",
                icon: "📜",
              },
              {
                title: "Agricultural Services Delivery",
                description:
                  "Providing extension services, inputs, advisory support, and digital tools directly to farmers to boost productivity and sustainability.",
                icon: "🚜",
              },
              {
                title: "Food Security Programs",
                description:
                  "Strengthening local food systems through improved storage, nutrition-sensitive agriculture, and emergency response to hunger crises.",
                icon: "🌾",
              },
              {
                title: "Training & Sensitisation",
                description:
                  "Conducting farmer field schools, workshops, and awareness campaigns on best practices, gender inclusion, and climate adaptation.",
                icon: "👨‍🌾",
              },
              {
                title: "Climate-Smart Farming",
                description:
                  "Promoting drought-resistant crops, water harvesting, agroforestry, and soil conservation to build resilience against climate change.",
                icon: "🌦️",
              },
              {
                title: "Market Access & Value Chains",
                description:
                  "Connecting farmers to buyers, improving post-harvest handling, and supporting cooperatives to increase income and reduce waste.",
                icon: "📈",
              },
            ].map((service, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl border ${
                  index === 1
                    ? "bg-green-50 border-green-200"
                    : "bg-white border-gray-200"
                } hover:shadow-md transition-shadow`}
              >
                <div className="text-2xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <button className="flex items-center space-x-1 text-green-600 font-medium">
                  <span>Learn More</span>
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
            ))}
          </div>
        </div>
      </div>
      
    </div>
    <ServiceAction/>
    </>
  );
};

export default Service;
