import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/getTournament");
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
      <Sidebar />

      {/* Main container */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <Header />

        {/* Content area */}
        <div className="flex-1 bg-white rounded-2xl shadow p-6 mt-6 space-y-10">
          {/* Welcome Banner */}
          <div className="bg-[#0f172a] text-white rounded-xl p-6 shadow-md flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold font-funnel">
                Welcome Emmanuel 👋
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

          {/* Live Events Section */}
          <div>
            <h2 className="text-xl font-semibold flex items-center gap-2">
              Live Events
              <span className="h-3 w-3 rounded-full bg-red-500 animate-pulse"></span>
            </h2>

            {loading ? (
              <div className="mt-4 text-gray-500">Loading tournaments...</div>
            ) : tournaments.length === 0 ? (
              <div className="mt-4 text-gray-500">
                No tournaments available yet.
              </div>
            ) : (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {tournaments.map((tournament) => (
                  <Link
                    to={`/tournament/${tournament._id}`}
                    key={tournament._id}
                  >
                    <div className="bg-gray-100 rounded-lg p-4 shadow hover:shadow-md transition flex flex-col justify-between">
                      <h3 className="text-lg font-bold">{tournament.name}</h3>
                      <p className="text-sm text-gray-600">
                        Stake Amount: {tournament.stakeAmount}
                      </p>
                      <p className="text-xs text-gray-500">
                        Created by {tournament.creatorId?.name || "Unknown"}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Previous Matches Section */}
          <div>
            <h2 className="text-xl font-semibold">Previous Matches</h2>
            <div className="mt-4 text-gray-500 text-sm">
              No matches played yet. Be the first to join a tournament!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
