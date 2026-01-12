// src/components/StatsSection.jsx
import React from "react";

const StatsSection = () => {
  return (
    <>
      <div className="container mx-auto mb-12 pt-8 w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "50+", label: "Year of Experience" },
            { value: "100+", label: "Farms being monitored" },
            { value: "134 K", label: "Farmer Around the State" },
            { value: "2345677+", label: "hectares of land monitored" },
          ].map((stat, index) => (
            <div key={index} className="p-4">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
                {stat.value}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white py-12 px-4 md:px-8">
        {/* Stats Cards */}

        {/* Innovating Section */}
        <div className="container mx-auto mb-12 flex flex-col md:flex-row gap-8 items-start">
          {/* Left Column */}
          <div className="md:w-1/2">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Innovating the Future of Agriculture
            </h2>
          </div>

          {/* Right Column */}
          <div className="md:w-1/2">
            <p className="text-gray-700 leading-relaxed mb-6">
              Harvest, where tradition meets innovation. We are dedicated to
              revolutionizing the agricultural industry through sustainable
              practices and the latest technological advancements. Our
              commitment is to empower farmers with the tools and knowledge they
              need to cultivate a thriving future.
            </p>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  icon: "🌱",
                  title: "Soil Health Improvement",
                  desc: "for stronger plant.",
                },
                {
                  icon: "🌾",
                  title: "Innovative Seed Varieties",
                  desc: "in various conditions.",
                },
                {
                  icon: "🤖",
                  title: "Agricultural with Technology Integration",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-green-50 p-4 rounded-lg text-center"
                >
                  <div className="text-2xl mb-2">{feature.icon}</div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-1">
                    {feature.title}
                  </h4>
                  {feature.desc && (
                    <p className="text-xs text-gray-600">{feature.desc}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

    
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-500 leading-tight">
            Transforming Agriculture with{" "}
            <span className="text-green-700">Smart Solutions</span> For
            Sustainable Future
          </h1>
        </div>
      </div>
    </>
  );
};

export default StatsSection;
