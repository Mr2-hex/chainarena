import React, { useEffect, useState } from "react";
import Sidebar from "./Dashboard/Sidebar.jsx";
import Header from "./Dashboard/Header.jsx";
import { motion } from "framer-motion";
import axios from "axios";
import Thumbnail from "../assets/Images/thumbnail.jpg";

const User = () => {
  const [user, setUser] = useState(null);
  const [activeTournaments, setActiveTournaments] = useState([]);
  const [pastTournaments, setPastTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser?.username) {
          setUser(parsedUser);
        }
      } catch (err) {
        console.error("Failed to parse user from localStorage:", err);
      }
    }

    const fetchUserTournaments = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/userTournaments`);
        setActiveTournaments(res.data.active || []);
        setPastTournaments(res.data.past || []);
      } catch (error) {
        console.error("Failed to fetch user tournaments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserTournaments();
  }, []);

  return (
    <div className="flex p-6 gap-6 bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <Sidebar visible={sidebarOpen} />

      {/* Main container */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* User Profile Section */}
        <div className="bg-[#0f172a] rounded-xl shadow-md p-6 mt-6">
          <h1 className="text-2xl font-bold text-gray-100 font-funnel">
            👤 {user?.username || "Guest"}
          </h1>
          <p className="text-gray-100 mt-2 font-funnel">
            Integrated Game:{" "}
            <span className="font-semibold">
              {user?.integratedGame || "None yet"}
            </span>
          </p>
        </div>

        {/* Active Tournaments */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 font-funnel">
            Your Active Tournaments
          </h2>
          {loading ? (
            <div className="text-gray-500">Loading tournaments...</div>
          ) : activeTournaments.length === 0 ? (
            <p className="text-gray-500">No active tournaments right now.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeTournaments.map((tournament) => (
                <motion.div
                  key={tournament._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-lg p-4 shadow"
                >
                  <img
                    src={Thumbnail}
                    alt={tournament.name}
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-lg font-bold">{tournament.name}</h3>
                  <p className="text-sm text-gray-600">
                    Stake: {tournament.stakeAmount}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Past Tournaments */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4 font-funnel">
            Your Past Tournaments
          </h2>
          {loading ? (
            <div className="text-gray-500">Loading tournaments...</div>
          ) : pastTournaments.length === 0 ? (
            <p className="text-gray-500">No past tournaments yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pastTournaments.map((tournament) => (
                <motion.div
                  key={tournament._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-100 rounded-lg p-4 shadow"
                >
                  <img
                    src={Thumbnail}
                    alt={tournament.name}
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-lg font-bold">{tournament.name}</h3>
                  <p className="text-sm text-gray-600">
                    Finished • Stake: {tournament.stakeAmount}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
