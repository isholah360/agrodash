// components/Officer.jsx
import React from "react";
import DashboardCard from "./DashboardCard";
import Officercard from "./Officercard";
import { Link } from "react-router-dom"; // Displays name, email, phone

const officers = [
  {
    id: 1,
    name: "Adebola Johnson",
    email: "adebola.johnson@example.com",
    phone: "08012345678",
    lga: "Igbeti",
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
    lga: "Iseyin",
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
    lga: "Saki",
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
    lga: "Ogbomoso",
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
    lga: "Ojoo",
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

const Officer = () => {
  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Officers</h2>

      {officers.map((officer, index) => {
        // Count farms and livestock for this officer
        const farmerCount = officer.farmers.length;

        const totalFarms = officer.farmers.reduce(
          (acc, farmer) => acc + farmer.farms.length,
          0
        );

        const totalLivestock = officer.farmers.reduce(
          (acc, farmer) => acc + farmer.livestock.length,
          0
        );

        return (
          <>
            <Link
              to={`/officer/${officer.id}`}
              key={index}
              className="no-underline"
            >
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-8 bg-gray-100 rounded-2xl p-5"
              >
                <Officercard
                  title={officer.name}
                  value={officer.email}
                  phone={officer.phone}
                  lga={`LGA: ${officer.lga}`}
                  color="blue"
                />

                <DashboardCard
                  title="Number of Farmers"
                  value={farmerCount}
                  color="indigo"
                />

                <DashboardCard
                  title="Number of Farms"
                  value={totalFarms}
                  color="green"
                />

                <DashboardCard
                  title="Number of Livestock"
                  value={totalLivestock}
                  color="purple"
                />
              </div>
            </Link>
          </>
        );
      })}
    </div>
  );
};

export default Officer;
