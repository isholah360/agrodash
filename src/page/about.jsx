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
            {/* <h2 className="text-xl font-semibold text-blue-600">
              Lorem ipsum dolor
            </h2> */}
            <p className="text-gray-700 leading-relaxed">
              At the heart of Oyo State lies vast, fertile land and generations
              of hardworking farmers — yet for decades agriculture remained
              largely subsistence: small farms, hard labor, little access to
              mechanization, limited infrastructure and inconsistent support.
              Recognizing the enormous untapped potential, the Oyo State
              Government committed to transform agriculture from subsistence
              farming into a vibrant, commercial and modern industry.
            </p>
            <p className="text-gray-700 leading-relaxed">
              The Oyo State Ministry of Agriculture & Rural Development exists
              to turn that vision into reality. Our mandate is to shape
              policies, provide support, and deliver programs that uplift the
              agricultural sector — transforming lives, communities, and the
              economy.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Over the years, the Ministry has evolved. From the earlier days of
              the rural-extension driven Oyo State Agricultural Development
              Programme (OYSADEP), which provided vital extension services to
              smallholder farmers, to the present — under a renewed strategic
              focus on agribusiness, technology, value-chain development and
              infrastructure.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our transformation drive deepened when the state doubled down on
              agriculture as a cornerstone of economic diversification. Backed
              by visionary leadership, our policies have placed the agricultural
              sector at the center of Oyo’s growth agenda.
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
            <div className="relative w-full h-[60-vh] bg-gray-200 rounded-lg overflow-hidden shadow-lg">
              <img
                src="/oyoc.jpeg"
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
          <div className="md:w-1/2 space-y-4">
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
              Olasunkanmi Aremu Olaleye, Esq. is a Nigerian lawyer and public
              administrator with over three decades of professional and
              political experience. He earned his LL.B from the University of
              Lagos in 1992 and an LL.M in 2017, and was called to the Nigerian
              Bar in 1993. A prince of Iresa-Adu in Surulere Local Government
              Area of Oyo State, he began his legal career in 1995, working at
              Popoola and Olajumoke & Co. before establishing his own law firm,
              Kanmi Olaleye Chambers, which he led during various periods
              between 2001 and 2019.
              <p className="mt-4">
                His political career began in 2006 as a member of the Oyo State
                Land Use and Allocation Committee. He later served as Chairman
                of the Oyo State Independent Electoral Commission (2007–2011).
                Between 2019 and 2023, he served as Commissioner in four
                ministries under Governor Seyi Makinde, and he currently serves
                as the Commissioner for Agriculture and Rural Development in Oyo
                State.
              </p>
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
          <div className="md:w-1/2 space-y-4">
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
              Mrs. Abosede Esther Owoeye is a seasoned public servant with over
              30 years of experience in the Oyo State Civil Service. She holds
              Bachelor’s and Master’s degrees in Economics, as well as
              Postgraduate Diplomas in Education and Statistics from the
              University of Ibadan. She has held key leadership roles at the Oyo
              State Universal Basic Education Board (SUBEB), including Director
              of Planning, Research, and Statistics, and Director of Standards
              and Quality Assurance, where she led strategic planning, managed
              education intervention funds, coordinated teacher development
              programmes, and supervised quality assurance across all local
              government areas. 
              <p className="mt-4">
                Renowned for her expertise in strategic
              planning, policy implementation, education management, and public
              administration, Mrs. Owoeye has participated in numerous local and
              international capacity-building programmes. She is widely regarded
              as a dedicated and professional administrator and currently serves
              as the Permanent Secretary, Ministry of Agriculture and Rural
              Development, providing strategic leadership in advancing
              agricultural development and food security in Oyo State.
              </p>
              
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
