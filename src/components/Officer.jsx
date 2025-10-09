import React, { useEffect, useState } from "react";
import DashboardCard from "./DashboardCard";
import Officercard from "./Officercard";
import { Link } from "react-router-dom";
// api/v1/Lga/getLga/1
const Officer = () => {
  const [officerData, setOfficerData] = useState([]);
  const [lgaData, setLgaData] = useState([]);
  const [farmers, setFarmers] = useState([]);
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const token = localStorage.getItem("authToken");

        const res = await fetch("api/v1/User/GetOfficers", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch farms");
        }

        const result = await res.json();
     

        setOfficerData(result.data.data);
        console.log(result.data.data);
       
        setError("");
      } catch (err) {
        console.error("Error fetching farms:", err);
        setError(err.message || "An error occurred");
        setOfficerData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFarms();
  }, []);

  useEffect(() => {
    const fetchLgaById = async () => {
      try {
        const token = localStorage.getItem("authToken");

        const res = await fetch("/api/v1/Lga/GetLgas", {
          method: "GET",
          headers: {  
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch farms");
        }

        const result = await res.json();
     

        setLgaData(result.data.data);

        setError("");
      } catch (err) {
        console.error("Error fetching farms:", err);
        setError(err.message || "An error occurred");
        setLgaData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLgaById();
  }, []);
  
  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(`/api/v1/Farmer/GetFarmers`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch farmers: ${response.status}`);
        }
     
        const data = await response.json();
        setFarmers(data.data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFarmers();
  }, []);

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await fetch("/api/v1/Farm/GetFarms", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch farms");
        }

        const result = await res.json();
        setFarms(result.data.data);
        setError("");
      } catch (err) {
        console.error("Error fetching farms:", err);
        setError(err.message || "An error occurred");
        setFarms([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFarms();
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Officers</h2>

      {officerData.map((officer, index) => {
        // const farmerCount = officer.farmers.length;

        // const totalFarms = officer.farmers.reduce(
        //   (acc, farmer) => acc + farmer.farms.length,
        //   0
        // );

        // const totalLivestock = officer.farmers.reduce(
        //   (acc, farmer) => acc + farmer.livestock.length,
        //   0
        // );

        return (
          <>
            <Link
              to={`/officer/${officer.userid}`}
              key={index}
              className="no-underline"
            >
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-8 bg-gray-100 rounded-2xl p-5"
              >
                <Officercard
                  title={officer.firstname + " " + officer.lastname}
                  value={officer.email}
                  phone={officer.phone}
                  lga={`LGA: ${officer.lga}`}
                  color="blue"
                />
              
                <DashboardCard
                  title="Number of Farmers"
                  value={
                    farmers.filter((farmer) => officer.userid === farmer.userId)
                      .length
                  }
                  color="indigo"
                />

                <DashboardCard
                  title="Number of Crop Farms"
                  value={officer.farmers.reduce(
                    (acc, farmer) => acc + (farmer.farms?.length || 0),
                    0
                  )}
                  color="green"
                />

                <DashboardCard
                  title="Number of Livestock Farms"
                   value={officer.farmers.reduce(
                    (acc, farmer) => acc + (farmer.livestocks?.length || 0),
                    0
                  )}
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
