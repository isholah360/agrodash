import React from "react";
import { Link } from "react-router-dom";
import ImageCarousel from "../components/directors";

export default function About() {
  return (
    <div className="w-full">
      <div className="bg-blue-100 rounded-b-3xl p-8 md:p-12 ">
        <div className="flex flex-col mt-[8rem] md:flex-row items-bottom justify-between gap-8">
          <div className=" ml-10 md:w-1/2 flex text-5xl flex-col md:flex-row gap-4 lg:text-8xl font-bold">
            About Us
          </div>
          <div className="md:w-1/2 space-y-4 text-right ">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Our vision
            </h2>
            <p className="text-gray-700 leading-relaxed text-right">
              To sustain Oyo-State agriculture as the bedrock industry that
              positively drives the State’s economy through realization of
              integrated rural development as the veritable vehicle to achieve
              sustainable food security, job creation and sustainable platform
              for wealth creation.
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-center space-x-4 opacity-30">
          <div className="w-24 h-24 bg-white rounded-full"></div>
          <div className="w-32 h-24 bg-white rounded-t-full"></div>
          <div className="w-24 h-24 bg-white rounded-full"></div>
        </div>
      </div>
      <div className="bg-white py-12 px-6 md:px-16 lg:px-24">
        {/* Header with blue line */}
        <div className="flex items-center mb-8">
          <div className="w-1 h-8 bg-green-200 mr-4"></div>
          <h1 className="text-3xl md:text-4xl font-bold text-green-500 uppercase tracking-wider">
            Our Story
          </h1>
        </div>

        {/* Main content - two columns */}
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* Left Column: Text Content */}
          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-xl font-semibold text-blue-600">
              Lorem ipsum dolor
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis
              nisl est cursus fermentum sed non augue. Ut fringilla quam ut
              cursus hendrerit. Praesent lobortis consequat eros vitae
              hendrerit. Phasellus ut laoreet metus, pellentesque dapibus
              tortor.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Donec augue orci, consequat ac erat eu, lobortis sollicitudin
              massa. Praesent ac tincidunt ipsum, quis rhoncus massa.
              Suspendisse at augue nec porta. Etiam tempus ornare nulla,
              accumsan interdum libero tincidunt id.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis
              nisl est cursus fermentum sed non augue. Ut fringilla quam ut
              cursus hendrerit. Praesent lobortis consequat eros vitae
              hendrerit. Phasellus ut laoreet metus, pellentesque dapibus
              tortor.
            </p>
            <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg flex items-center gap-2 transition">
              Connect us
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="absolute top-0 right-0 w-48 h-32 md:w-64 md:h-40 bg-gray-200 rounded-lg overflow-hidden shadow-md">
              <img
                src="/farm3.jpeg"
                alt="Laptop and coffee"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="relative w-full h-64 md:h-80 bg-gray-200 rounded-lg overflow-hidden shadow-lg">
              <img
                src="/farm4.jpeg"
                alt="Team collaboration"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="absolute top-10 right-10 w-8 h-8 bg-gray-200 rounded opacity-50"></div>
        <div className="absolute bottom-10 left-10 w-10 h-10 bg-gray-200 rounded opacity-50"></div>
        <div className="absolute top-20 right-20 w-6 h-6 bg-gray-200 rounded opacity-50"></div>
      </div>

      <div className="bg-white py-16 px-6 md:px-12 lg:px-24">
        <div className="flex items-center mb-8">
          <div className="w-1 h-8 bg-green-200 mr-4"></div>
          <h1 className="text-3xl md:text-4xl font-bold text-green-500 uppercase tracking-wider">
            Meet Our Leaders
          </h1>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-16">
          <div className="md:w-1/3 space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-5xl md:text-6xl font-black text-gray-800">
                01
              </span>
              <h2 className="text-2xl md:text-2xl font-semibold text-gray-800">
                <span className="text-xl">Hon. Commissioner</span> <br />
                Barr. Olasunkanmi Olaleye
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              An accomplished lawyer driven by a vision to deliver exceptional
              legal solutions that address diverse client needs. Barr.
              Olasunkanmi’s expertise in corporate law and legal strategy
              ensures that every case is handled with the highest standards of
              integrity and excellence.
            </p>
          </div>

          {/* Right: Image */}
          <div className="md:w-1/3">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="/comm.jpg"
                alt="Viktor Sanjaya"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row-reverse justify-center items-center gap-8">
          <div className="md:w-1/3 space-y-4">
            <div className="flex items-center gap-8">
              <span className="text-5xl md:text-6xl font-black text-gray-800">
                02
              </span>
              <h2 className="text-2xl md:text-2xl font-semibold text-gray-800">
                <span className="text-xl">Hon. Permanent Secretary</span> <br />
                Mrs. Abosede Esther Owoeye
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              A seasoned marketing expert, is a driving force behind Artemis,
              co-founding the company to elevate customer experience and brand
              identity. Leveraging her expertise in storytelling and
              communication, Sophia ensures that we stand out as a trusted
              advisor for clients.
            </p>
          </div>

          <div className="md:w-1/3">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="/permsec.jpg"
                alt="Sophia Gusta"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 py-16 px-6 md:px-12 lg:px-24">
        <div className="flex items-center mb-8">
          <div className="w-1 h-8 bg-green-200 mr-4"></div>
          <h1 className="text-3xl md:text-4xl font-bold text-green-500 uppercase tracking-wider">
            Meet Our Dirrector of Departments
          </h1>
        </div>

        <ImageCarousel />
      </div>
    </div>
  );
}
