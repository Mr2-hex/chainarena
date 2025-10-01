import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CreateTournament = () => {
  const [form, setForm] = useState({
    name: "",
    gameId: "",
    stakeAmount: "",
    minPlayers: "",
    maxPlayers: "",
  });
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await axios.get(
          " https://chain-backend-tkk9.onrender.com/api/getGames"
        );
        console.log("Games response:", res.data);
        const gamesData = res.data.games;
        if (Array.isArray(gamesData)) {
          setGames(gamesData);
        } else {
          console.error("Games data is not an array:", gamesData);
          setGames([]);
          setMessage({
            text: "Failed to load games: Invalid response format",
            type: "error",
          });
        }
      } catch (err) {
        console.error("Error fetching games:", {
          message: err.message,
          response: err.response?.data,
        });
        setGames([]);
        setMessage({
          text: "Failed to load games. Please try again.",
          type: "error",
        });
      }
    };
    fetchGames();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    // Client-side validation
    if (!form.gameId) {
      setMessage({ text: "Please select or enter a game ID", type: "error" });
      return;
    }
    if (Number(form.minPlayers) > Number(form.maxPlayers)) {
      setMessage({
        text: "Min players cannot exceed max players",
        type: "error",
      });
      return;
    }
    if (Number(form.stakeAmount) <= 0) {
      setMessage({ text: "Stake amount must be positive", type: "error" });
      return;
    }

    setLoading(true);
    try {
      console.log("Submitting tournament:", form); // Debug form data
      const res = await axios.post(
        " https://chain-backend-tkk9.onrender.com/api/createTournament",
        {
          name: form.name,
          gameId: form.gameId,
          stakeAmount: form.stakeAmount,
          minPlayers: Number(form.minPlayers),
          maxPlayers: Number(form.maxPlayers),
        }
      );
      setMessage({
        text: `✅ Tournament "${form.name}" created! Contract: ${res.data.contractAddress}`,
        type: "success",
      });
      setForm({
        name: "",
        gameId: "",
        stakeAmount: "",
        minPlayers: "",
        maxPlayers: "",
      });
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      console.error("Error creating tournament:", {
        message: err.message,
        response: err.response?.data,
      });
      setMessage({
        text: `❌ Error: ${err.response?.data?.error || err.message}`,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl"
      >
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          🎮 Create Tournament
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tournament Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-1 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="e.g. FIFA Hackathon Cup"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Game
            </label>
            {games.length > 0 ? (
              <select
                name="gameId"
                value={form.gameId}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-1 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                required
              >
                <option value="" disabled>
                  Select a game
                </option>
                {games.map((game) => (
                  <option key={game._id} value={game._id}>
                    {game.name}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                name="gameId"
                value={form.gameId}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-1 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                placeholder="Enter Game ID (e.g., FIFA24)"
                required
              />
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Min Players
              </label>
              <input
                type="number"
                name="minPlayers"
                value={form.minPlayers}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-1 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                min="2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Max Players
              </label>
              <input
                type="number"
                name="maxPlayers"
                value={form.maxPlayers}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-1 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                min="2"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Stake Amount (HACKUSD)
            </label>
            <input
              type="number"
              name="stakeAmount"
              value={form.stakeAmount}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-1 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              min="0.000001"
              step="0.000001"
              placeholder="e.g. 0.000001"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter amount in HACKUSD (e.g., 0.000001 for 1 wei)
            </p>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg shadow-lg transition disabled:opacity-50 font-semibold flex items-center justify-center"
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z"
                />
              </svg>
            ) : null}
            {loading ? "Creating..." : "🚀 Create Tournament"}
          </motion.button>
        </form>

        {message.text && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-5 p-4 rounded-lg text-center font-medium ${
              message.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message.text}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default CreateTournament;
