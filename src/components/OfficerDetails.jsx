import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaArrowLeft, FaUser } from "react-icons/fa";
import ChartComponent from "./ChartComponent";

const officerData = [
  {
    id: 1,
    name: "Adebola Johnson",
    email: "adebola.johnson@example.com",
    phone: "08012345678",
    farmers: [
      {
        id: 101,
        name: "Farmer A",
        farms: [
          { id: "farm1", name: "Maize Field", location: "Oyo" },
          { id: "farm2", name: "Cassava Farm", location: "Ibadan" },
        ],
        livestock: [
          { id: "livestock1", type: "Cattle", count: 10 },
          { id: "livestock2", type: "Goat", count: 15 },
        ],
      },
      {
        id: 102,
        name: "Farmer B",
        farms: [
          { id: "farm3", name: "Yam Farm", location: "Ogbomosho" },
          { id: "farm4", name: "Rice Paddy", location: "Iseyin" },
        ],
        livestock: [
          { id: "livestock3", type: "Chicken", count: 30 },
          { id: "livestock4", type: "Sheep", count: 12 },
        ],
      },
      {
        id: 103,
        name: "Farmer C",
        farms: [
          { id: "farm5", name: "Tomato Field", location: "Saki" },
          { id: "farm6", name: "Okra Garden", location: "Igboho" },
        ],
        livestock: [
          { id: "livestock5", type: "Duck", count: 20 },
          { id: "livestock6", type: "Pig", count: 8 },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Tope Alabi",
    email: "tope.alabi@example.com",
    phone: "08023456789",
    farmers: [
      {
        id: 201,
        name: "Farmer D",
        farms: [
          { id: "farm7", name: "Cocoa Farm", location: "Ilesa" },
          { id: "farm8", name: "Oil Palm Estate", location: "Ondo" },
        ],
        livestock: [
          { id: "livestock7", type: "Turkey", count: 14 },
          { id: "livestock8", type: "Rabbit", count: 18 },
        ],
      },
      {
        id: 202,
        name: "Farmer E",
        farms: [
          { id: "farm9", name: "Banana Plantation", location: "Ijebu" },
          { id: "farm10", name: "Sweet Potato Field", location: "Abeokuta" },
        ],
        livestock: [
          { id: "livestock9", type: "Quail", count: 25 },
          { id: "livestock10", type: "Goat", count: 9 },
        ],
      },
      {
        id: 203,
        name: "Farmer F",
        farms: [
          { id: "farm11", name: "Pepper Farm", location: "Akure" },
          { id: "farm12", name: "Ginger Field", location: "Ekiti" },
        ],
        livestock: [
          { id: "livestock11", type: "Snail", count: 50 },
          { id: "livestock12", type: "Cattle", count: 7 },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Mike Okon",
    email: "mike.okon@example.com",
    phone: "08034567890",
    farmers: [
      {
        id: 301,
        name: "Farmer G",
        farms: [
          { id: "farm13", name: "Soybean Farm", location: "Calabar" },
          { id: "farm14", name: "Groundnut Field", location: "Uyo" },
        ],
        livestock: [
          { id: "livestock13", type: "Pig", count: 13 },
          { id: "livestock14", type: "Chicken", count: 40 },
        ],
      },
      {
        id: 302,
        name: "Farmer H",
        farms: [
          { id: "farm15", name: "Melon Patch", location: "Aba" },
          { id: "farm16", name: "Carrot Field", location: "Nsukka" },
        ],
        livestock: [
          { id: "livestock15", type: "Sheep", count: 20 },
          { id: "livestock16", type: "Duck", count: 18 },
        ],
      },
      {
        id: 303,
        name: "Farmer I",
        farms: [
          { id: "farm17", name: "Lettuce Garden", location: "Umuahia" },
          { id: "farm18", name: "Spinach Field", location: "Owerri" },
        ],
        livestock: [
          { id: "livestock17", type: "Rabbit", count: 22 },
          { id: "livestock18", type: "Cattle", count: 6 },
        ],
      },
    ],
  },
  {
    id: 4,
    name: "Bola Akin",
    email: "bola.akin@example.com",
    phone: "08045678901",
    farmers: [
      {
        id: 401,
        name: "Farmer J",
        farms: [
          { id: "farm19", name: "Tomato Farm", location: "Lagos" },
          { id: "farm20", name: "Cucumber Field", location: "Badagry" },
        ],
        livestock: [
          { id: "livestock19", type: "Fish", count: 200 },
          { id: "livestock20", type: "Snail", count: 30 },
        ],
      },
      {
        id: 402,
        name: "Farmer K",
        farms: [
          { id: "farm21", name: "Carrot Garden", location: "Ikorodu" },
          { id: "farm22", name: "Pumpkin Patch", location: "Lekki" },
        ],
        livestock: [
          { id: "livestock21", type: "Turkey", count: 12 },
          { id: "livestock22", type: "Goat", count: 10 },
        ],
      },
      {
        id: 403,
        name: "Farmer L",
        farms: [
          { id: "farm23", name: "Onion Farm", location: "Epe" },
          { id: "farm24", name: "Corn Field", location: "Ikoyi" },
        ],
        livestock: [
          { id: "livestock23", type: "Chicken", count: 60 },
          { id: "livestock24", type: "Pig", count: 16 },
        ],
      },
    ],
  },
  {
    id: 5,
    name: "Grace Eze",
    email: "grace.eze@example.com",
    phone: "08056789012",
    farmers: [
      {
        id: 501,
        name: "Farmer M",
        farms: [
          { id: "farm25", name: "Beans Field", location: "Enugu" },
          { id: "farm26", name: "Millet Farm", location: "Abakaliki" },
        ],
        livestock: [
          { id: "livestock25", type: "Goat", count: 9 },
          { id: "livestock26", type: "Chicken", count: 35 },
        ],
      },
      {
        id: 502,
        name: "Farmer N",
        farms: [
          { id: "farm27", name: "Rice Field", location: "Nsukka" },
          { id: "farm28", name: "Garden Egg Farm", location: "Ngwo" },
        ],
        livestock: [
          { id: "livestock27", type: "Duck", count: 14 },
          { id: "livestock28", type: "Cattle", count: 11 },
        ],
      },
      {
        id: 503,
        name: "Farmer O",
        farms: [
          { id: "farm29", name: "Plantain Farm", location: "Awka" },
          { id: "farm30", name: "Ginger Farm", location: "Onitsha" },
        ],
        livestock: [
          { id: "livestock29", type: "Rabbit", count: 20 },
          { id: "livestock30", type: "Goat", count: 10 },
        ],
      },
    ],
  },
];

const OfficerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const officer = officerData.find((officer) => officer.id === parseInt(id));

  if (!officer) {
    return <div className="p-6 text-red-500">Officer not found</div>;
  }

  const totalFarms = officer.farmers.flatMap((f) => f.farms).length;
  const totalLivestock = officer.farmers
    .flatMap((f) => f.livestock)
    .reduce((acc, item) => acc + item.count, 0);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <button
        className="mb-6 text-blue-600 flex items-center hover:underline"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft className="mr-2" /> Back
      </button>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{officer.name}</h1>
            <p className="text-gray-600">📧 {officer.email}</p>
            <p className="text-gray-600">📞 {officer.phone}</p>
          </div>
          <div className="float-right text-gray-300 text-9xl">
            <FaUser />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-100 text-blue-800 p-4 rounded-xl">
            <h4 className="font-medium text-sm">Total Farmers</h4>
            <p className="text-xl font-bold">{officer.farmers.length}</p>
          </div>
          <div className="bg-green-100 text-green-800 p-4 rounded-xl">
            <h4 className="font-medium text-sm">Total Farms</h4>
            <p className="text-xl font-bold">{totalFarms}</p>
          </div>
          <div className="bg-purple-100 text-purple-800 p-4 rounded-xl">
            <h4 className="font-medium text-sm">Total Livestock</h4>
            <p className="text-xl font-bold">{totalLivestock}</p>
          </div>
        </div>

        <div className="space-y-6 ">
          {officer.farmers.map((farmer) => (
            <>
            <Link to={`/farmers/${farmer.id}`} className="mt-2">
            <div key={farmer.id} className="bg-gray-100 p-4 rounded-lg mt-2">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {farmer.name}
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-1">
                    Farms
                  </h4>
              
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {farmer.farms.map((farm) => (
                        <li key={farm.id}>
                          {farm.name} - {farm.location}
                        </li>
                      ))}
                    </ul>
                 
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-1">
                    Livestock
                  </h4>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {farmer.livestock.map((item) => (
                      <li key={item.id}>
                        {item.type} — {item.count}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            </Link>
            </>
          ))}
        </div>
      </div>
      <div className="mt-6 bg-gray-100 p-6 rounded-xl shadow-sm border border-gray-200">
        <ChartComponent />
      </div>
    </div>
  );
};

export default OfficerDetails;
