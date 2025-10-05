import React, { useState } from "react";

import DashboardCard from "./DashboardCard";

import ProjectTable from "./ProjectTable";

import Officer from "./Officer";
import TaskCard from "./TaskCard";
import Tracker from "./Tracker";
import ChartCard from "./ChartCard";
 const colors = {
    pink: 'bg-pink-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
  };

function Home() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <main className="flex-1 p-6">
        {activeTab === "Dashboard" && (
          <>
            <div className="pb-0 h-[15rem] mb-10">
              <img
                className="rounded-2xl w-full h-[100%] object-cover"
                src="https://wallpapers.com/images/hd/agriculture-background-oiknoaw5ndsbb98o.jpg"
                alt=""
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-8 sm">
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
            <div className="bg-white rounded-xl flex shadow-sm border border-gray-200 p-5 mt-10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <ChartCard />

                <Tracker />

                <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Today Tasks
                  </h3>
                  <TaskCard
                    title="Farmers Meeting"
                    progress={58}
                    color="pink"
                    users={3}
                     bg="bg-brown-100"
                  />
                  <TaskCard
                    title="Meeting"
                    progress={80}
                    color="green"
                    users={2}
                    bg="bg-yellow-100"
                  />
                  <TaskCard
                    title="Farm Inspection"
                    progress={35}
                    color="yellow"
                    users={3}
                     bg="bg-gray-800"
                  />
                </div>
              </div>
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
