import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import Thumbnail from "../../assets/Images/thumbnail.jpg";

const Home = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

    const fetchTournaments = async () => {
      try {
        const res = await axios.get(
          " https://chain-backend-tkk9.onrender.com/api/getTournament"
        );
        setTournaments(res.data);
      } catch (error) {
        console.error("Failed to fetch tournaments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  return (
    <div className="flex p-6 gap-6 bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <Sidebar visible={sidebarOpen} />

      {/* Main container */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Sticky Top Section */}
        <div className="sticky top-0 z-10 bg-white space-y-6 pt-6 pb-4">
          {/* Welcome Banner */}
          <div className="bg-[#0f172a] text-white rounded-xl p-6 shadow-md flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold font-funnel">
                Welcome {user?.username || "Guest"} 👋
              </h1>
              <p className="mt-2 text-sm text-blue-100 w-[70%] leading-6 font-inter">
                Join tournaments, stake tokens, and experience the thrill of
                on-chain gaming!
              </p>
            </div>
            <Link to="/create">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200">
                Create Tournament
              </button>
            </Link>
          </div>

          {/* Live Events Title */}
          <h2 className="text-xl font-semibold flex items-center gap-2 px-1">
            Live Events
            <span className="h-3 w-3 rounded-full bg-red-500 animate-pulse"></span>
          </h2>
        </div>

        {/* Scrollable Tournaments Section */}
        <div className="flex-1 overflow-y-auto mt-4 space-y-10 pr-1">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-100 rounded-lg p-4 shadow animate-pulse"
                >
                  <div className="w-full h-32 bg-gray-300 rounded-lg mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : tournaments.length === 0 ? (
            <div className="text-gray-500">No tournaments available yet.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {tournaments.map((tournament) => (
                <Link to={`/tournament/${tournament._id}`} key={tournament._id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-lg p-4 shadow transition flex flex-col justify-between"
                  >
                    <img
                      src={Thumbnail}
                      alt={tournament.name}
                      className="w-full h-32 object-cover rounded-lg mb-4"
                    />
                    <div>
                      <h3 className="text-lg font-bold">{tournament.name}</h3>
                      <p className="text-sm text-gray-600">
                        Stake Amount: {tournament.stakeAmount}
                      </p>
                      <p className="text-xs text-gray-500">
                        Created by {tournament.creatorId?.name || "Unknown"}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          )}

          {/* Previous Matches Section */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold">Previous Matches</h2>
            <p className="mt-4 text-gray-500 text-sm">
              No matches played yet. Be the first to join a tournament!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
