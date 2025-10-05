import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';


export const officers = [
  {
    id: 1,
    name: "Adebola Johnson",
    email: "adebola.johnson@example.com",
    phone: "08012345678",
    image: "https://randomuser.me/api/portraits/men/1.jpg", 
    farmers: [
      {
        FarmId: 101,
        farmName: "Farmer A",
        phone: "09099990001",
        address: "123 Farm Road, Oyo",
        image: "https://randomuser.me/api/portraits/men/11.jpg",
        farms: [
          { id: "farm1", name: "Maize Field", location: "Oyo" },
          { id: "farm2", name: "Cassava Farm", location: "Ibadan" }
        ],
        livestock: [
          { id: "livestock1", type: "Cattle", count: 10 },
          { id: "livestock2", type: "Goat", count: 15 }
        ]
      },
      {
        FarmId: 102,
        farmName: "Farmer B",
        phone: "08099990002",
        address: "456 Green Lane, Ibadan",
        image: "https://randomuser.me/api/portraits/women/12.jpg",
        farms: [
          { id: "farm3", name: "Yam Farm", location: "Ogbomosho" },
          { id: "farm4", name: "Rice Paddy", location: "Iseyin" }
        ],
        livestock: [
          { id: "livestock3", type: "Chicken", count: 30 },
          { id: "livestock4", type: "Sheep", count: 12 }
        ]
      },
      {
        FarmId: 103,
        farmName: "Farmer C",
        phone: "08099290003",
        address: "789 Crop Street, Saki",
        image: "https://randomuser.me/api/portraits/men/13.jpg",
        farms: [
          { id: "farm5", name: "Tomato Field", location: "Saki" },
          { id: "farm6", name: "Okra Garden", location: "Igboho" }
        ],
        livestock: [
          { id: "livestock5", type: "Duck", count: 20 },
          { id: "livestock6", type: "Pig", count: 8 }
        ]
      }
    ],
     id: 2.0,
    name: "taye adeola",
    email: "adekola.johnson@example.com",
    phone: "08012345571",
    image: "https://randomuser.me/api/portraits/men/1.jpg",  // optional image field
    farmers: [
      {
        FarmId: 101,
        farmName: "Farmer A",
        phone: "08099220007",
        address: "123 Farm Road, Oyo",
        image: "https://randomuser.me/api/portraits/men/11.jpg",
        farms: [
          { id: "farm1", name: "Maize Field", location: "Oyo" },
          { id: "farm2", name: "Cassava Farm", location: "Ibadan" }
        ],
        livestock: [
          { id: "livestock1", type: "Cattle", count: 10 },
          { id: "livestock2", type: "Goat", count: 15 }
        ]
      },
      {
        FarmId: 102,
        farmName: "Farmer B",
        phone: "08099190000",
        address: "456 Green Lane, Ibadan",
        image: "https://randomuser.me/api/portraits/women/12.jpg",
        farms: [
          { id: "farm3", name: "Yam Farm", location: "Ogbomosho" },
          { id: "farm4", name: "Rice Paddy", location: "Iseyin" }
        ],
        livestock: [
          { id: "livestock3", type: "Chicken", count: 30 },
          { id: "livestock4", type: "Sheep", count: 12 }
        ]
      },
      {
        FarmId: 103,
        farmName: "Farmer C",
        phone: "08097990009",
        address: "789 Crop Street, Saki",
        image: "https://randomuser.me/api/portraits/men/13.jpg",
        farms: [
          { id: "farm5", name: "Tomato Field", location: "Saki" },
          { id: "farm6", name: "Okra Garden", location: "Igboho" }
        ],
        livestock: [
          { id: "livestock5", type: "Duck", count: 20 },
          { id: "livestock6", type: "Pig", count: 8 }
        ]
      }
    ],
     id: 3,
    name: "Kola Smith",
    email: "johnson@gmail.com",
    phone: "08013545670",
    image: "https://randomuser.me/api/portraits/men/1.jpg",  // optional image field
    farmers: [
      {
        FarmId: 101,
        farmName: "Farmer A",
        phone: "08096990001",
        address: "123 Farm Road, Oyo",
        image: "https://randomuser.me/api/portraits/men/11.jpg",
        farms: [
          { id: "farm1", name: "Maize Field", location: "Oyo" },
          { id: "farm2", name: "Cassava Farm", location: "Ibadan" }
        ],
        livestock: [
          { id: "livestock1", type: "Cattle", count: 10 },
          { id: "livestock2", type: "Goat", count: 15 }
        ]
      },
      {
       FarmId: 102,
        farmName: "Farmer B",
        phone: "08099890002",
        address: "456 Green Lane, Ibadan",
        image: "https://randomuser.me/api/portraits/women/12.jpg",
        farms: [
          { id: "farm3", name: "Yam Farm", location: "Ogbomosho" },
          { id: "farm4", name: "Rice Paddy", location: "Iseyin" }
        ],
        livestock: [
          { id: "livestock3", type: "Chicken", count: 30 },
          { id: "livestock4", type: "Sheep", count: 12 }
        ]
      },
      {
        FarmId: 103,
        farmName: "Farmer C",
        phone: "08099991003",
        address: "789 Crop Street, Saki",
        image: "https://randomuser.me/api/portraits/men/13.jpg",
        farms: [
          { id: "farm5", name: "Tomato Field", location: "Saki" },
          { id: "farm6", name: "Okra Garden", location: "Igboho" }
        ],
        livestock: [
          { id: "livestock5", type: "Duck", count: 20 },
          { id: "livestock6", type: "Pig", count: 8 }
        ]
      }
    ]
  },
  // ... more officers with farmers
];


const FarmerDetails = () => {
  const { farmerId } = useParams();
  const navigate = useNavigate();

  let farmer = null;
  let officer = null;

  for (const off of officers) {
    const found = off.farmers.find(f => f.id === parseInt(farmerId));
    if (found) {
      farmer = found;
      officer = off;
      break;
    }
  }

  if (!farmer) {
    return <div className="p-6 text-red-600 font-semibold">Farmer not found</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <button
        className="mb-4 text-blue-600 hover:underline"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {/* Farmer main info */}
        <div className="flex items-center space-x-4 mb-6">
          {farmer.image && (
            <img
              src={farmer.image}
              alt={farmer.name}
              className="w-20 h-20 rounded-full object-cover"
            />
          )}
          <div>
            <h2 className="text-2xl font-bold">{farmer.name}</h2>
            <p className="text-gray-600">📞 {farmer.phone}</p>
            <p className="text-gray-600">🏠 {farmer.address}</p>
            <p className="text-gray-600">Officer: {officer.name}</p>
          </div>
        </div>

        {/* Counts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-indigo-100 text-indigo-800 p-4 rounded-xl">
            <h4 className="font-medium text-sm">Number of Farms</h4>
            <p className="text-xl font-bold">{farmer.farms.length}</p>
          </div>
          <div className="bg-green-100 text-green-800 p-4 rounded-xl">
            <h4 className="font-medium text-sm">Number of Livestocks</h4>
            <p className="text-xl font-bold">{farmer.livestock.length}</p>
          </div>
          <div className="bg-gray-100 text-gray-800 p-4 rounded-xl">
            <h4 className="font-medium text-sm">Farms Locations</h4>
            <p className="text-sm">
              {farmer.farms.map(f => `${f.name} (${f.location})`).join(', ')}
            </p>
          </div>
        </div>

        {/* Details of farms and livestock */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Farms Details</h3>
            <ul className="list-disc list-inside text-gray-600">
              {farmer.farms.map(farm => (
                <li key={farm.id}>
                  {farm.name} — {farm.location}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Livestock Details</h3>
            <ul className="list-disc list-inside text-gray-600">
              {farmer.livestock.map(item => (
                <li key={item.id}>
                  {item.type} — {item.count}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDetails;
