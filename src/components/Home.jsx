
import React, { useState } from "react";

import DashboardCard from "./DashboardCard";

import ProjectTable from "./ProjectTable";


import Officer from "./Officer";

function Home() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
        <main className="flex-1 p-6">
          {activeTab === "Dashboard" && (
            <>
              <div className="pb-0 h-[30%]">
                <img
                  className="rounded-2xl h-[80%] w-full"
                  src="https://wallpapers.com/images/hd/agriculture-background-oiknoaw5ndsbb98o.jpg"
                  alt=""
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
                <DashboardCard
                  title="Number of Officers"
                  subtitle="..."
                  value="18"
                  emoji="👮‍♂️"
                  color="blue"
                />
                <DashboardCard
                  title="Number of Farmers"
                  subtitle="..."
                  value="18"
                  emoji="👨‍🌾"
                  color="indigo"
                />
                <DashboardCard
                  title="Number of Farms"
                  subtitle="..."
                  value="18"
                  emoji="🚜"
                  color="green"
                />
                <DashboardCard
                  title="Number of Livestock"
                  subtitle="..."
                  value="18"
                  emoji="🐄"
                  color="purple"
                />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Officers 
                </h3>
                <ProjectTable />
              </div>
              
            </>
          )}

          
        </main>
    </div>
  );
}

export default Home;

//  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

//             {/* <ChartCard />

//             <Tracker /> */}

//             {/* Today Tasks */}
//             {/* <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">
//                 Today Tasks
//               </h3>
//               <TaskCard
//                 title="Finance Project..."
//                 progress={68}
//                 color="pink"
//                 users={3}
//               />
//               <TaskCard title="Meeting" progress={80} color="green" users={2} />
//               <TaskCard
//                 title="Design Homepage..."
//                 progress={35}
//                 color="yellow"
//                 users={3}
//               />
//             </div> */}
//           </div>
