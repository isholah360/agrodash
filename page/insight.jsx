// AgricultureInsights.jsx

import React from "react";
import image1 from "/farm1.jpeg";
import image2 from "/farm3.jpeg";
import image3 from "/farm4.jpeg";

const articles = [
  {
    date: "12 February 2025",
    title: "Organic Growth Tips",
    description: "Discover expert tips for growing healthy, chemical-free crops.",
    image: image1,
  },
  {
    date: "29 January 2025",
    title: "Sustainable Farming Guide",
    description: "Discover expert tips for growing healthy, chemical-free crops.",
    image: image2,
  },
  {
    date: "2 January 2025",
    title: "Crop Yield Strategies",
    description: "Discover expert tips for growing healthy, chemical-free crops.",
    image: image3,
  },
];

const Insights = () => {
  return (
    <section className="bg-white py-12 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-8 items-start">
        
        <div className="md:col-span-2">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Agriculture <br /> Insights & Tips
          </h2>
          <p className="text-gray-600 mb-6 lg:max-w-[80%] ">
            Stay ahead with the latest agricultural insights and expert tips from OyoAims.
            Learn sustainable practices, boost yields, and grow smarter every season.
          </p>
          <button className="bg-green-600  hover:bg-green-500 text-white font-semibold px-6 py-2 rounded-full transition">
            View all
          </button>
        </div>

     
        <div className="md:col-span-3 grid md:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <div key={index} className="space-y-3">
              <img
                src={article.image}
                alt={article.title}
                className="rounded-xl w-full object-cover h-48"
              />
              <p className="text-sm text-gray-500">{article.date}</p>
              <h3 className="text-lg font-semibold text-gray-900">
                {article.title}
              </h3>
              <p className="text-sm text-gray-600">{article.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Insights;
