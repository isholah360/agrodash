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
            Benefits of 
             <span className="text-green-600"> OyoAims</span> Solution
          </h2>

          {/* <div className="bg-black text-white rounded-lg p-6 mb-4 flex items-start justify-between">
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
          </div> */}

          {/* Features List */}
          <div className="space-y-3 text-sm mt-5">
            <ul>
              <li>
                <strong>Farmer &amp; Farm Registry</strong>
                <br />A centralized digital register of farmers, farms, and
                agribusinesses across the state, capturing key details such as
                location, farm size, enterprise type, and seasonal activities.
              </li>
              <br />
              <li className="">
                <strong>Agricultural Programme Management</strong>
                <br />
                Create, configure, and manage multiple agricultural
                programmes—tractorization, soil testing, training, subsidies,
                and future initiatives—within a single unified system.
              </li>
              <br />
              <li>
                <strong>Model Farm Centre (MFC) Coordination</strong>
                <br />
                Register and manage Model Farm Centres, their catchment areas,
                staff, and operational activities, bringing agricultural
                services closer to farming communities.
              </li>
              <br />
              {/* <li>
                <strong>Service Booking &amp; Requests</strong>
                <br />
                Enable structured requests for services such as mechanized land
                preparation, soil testing, and extension support, with clear
                workflows from request to completion.
              </li>
              <br /> */}
              <li>
                <strong>Asset &amp; Equipment Tracking</strong>
                <br />
                Monitor tractors, implements, and other agricultural assets,
                track their deployment, utilization, and maintenance to ensure
                optimal use of public resources.
              </li>
              <br />
              <li>
                <strong>Soil Testing &amp; Advisory Records</strong>
                <br />
                Capture soil sample data, laboratory results, and basic
                recommendations, supporting precision agriculture and improved
                input application.
              </li>
              <br />
              <li>
                <strong>Subsidy &amp; Support Tracking</strong>
                <br />
                Digitally record subsidies, farmer co-payments, and service
                support, promoting transparency, accountability, and audit-ready
                records.
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center md:text-left">
          <div className="text-right flex-col items-end justify-items-end ">
            <p className="text-gray-600 text-md mb-4 md:mb-6">
              Our planet’s population is growing rapidly & <br />
              so is the need for more food.
            </p>
            {/* <div className="flex">
              <button className="bg-green-600  hover:bg-green-500 text-white px-5 py-2 rounded-full font-semibold flex items-center space-x-2">
                <span>Get Started</span>
              </button>
              <span className="bg-black rounded-full p-2 text-2xl text-white">
                {" "}
                <FiArrowUpRight />
              </span>
            </div> */}
          </div>

          <div className="mt-17 w-[100%] h-full">
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
