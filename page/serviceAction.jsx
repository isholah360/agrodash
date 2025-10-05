import React from "react";
import bgImage from "/my.jpeg"; // Replace with your image path

const ServiceAction = () => {
  return (
    <section
      className="w-full h-[50vh] md:h-[60vh] bg-cover bg-center flex items-center justify-center rounded-xl overflow-hidden px-4"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="text-center text-white max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-4xl md:text-4xl font-bold leading-tight">
          Providing high-quality agricultural solutions built on extensive
          experience. Empowering Oyo State farmers through modern farming
          technology..
        </h1>
      </div>
    </section>
  );
};

export default ServiceAction;
