import { useState } from "react";
import axios from "axios";

const CreateTournament = () => {
  const [form, setForm] = useState({
    name: "",
    code: "",
    game: "",
    maxPlayers: "",
    minPlayers: "",
    stakeAmount: "",
    token: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost:3000/api/createTournament",
        form
      );
      setMessage(
        `✅ Tournament created! Contract: ${res.data.contractAddress}`
      );
    } catch (err) {
      setMessage("❌ Error: " + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          🎮 Create Tournament
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Tournament Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring focus:ring-indigo-300"
              placeholder="e.g. FIFA Hackathon Cup"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Code</label>
            <input
              type="text"
              name="code"
              value={form.code}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring focus:ring-indigo-300"
              placeholder="Unique code for tournament"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Game</label>
            <input
              type="text"
              name="game"
              value={form.game}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring focus:ring-indigo-300"
              placeholder="e.g. FIFA 24, COD, Chess"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Min Players</label>
              <input
                type="number"
                name="minPlayers"
                value={form.minPlayers}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring focus:ring-indigo-300"
                required
              />
            </div>
            <div>
              <label className="block font-medium">Max Players</label>
              <input
                type="number"
                name="maxPlayers"
                value={form.maxPlayers}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring focus:ring-indigo-300"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-medium">Stake Amount</label>
            <input
              type="number"
              name="stakeAmount"
              value={form.stakeAmount}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring focus:ring-indigo-300"
              placeholder="e.g. 100"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Token Address</label>
            <input
              type="text"
              name="token"
              value={form.token}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring focus:ring-indigo-300"
              placeholder="0x1234abcd..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg shadow-md transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Tournament"}
          </button>
        </form>

        {message && (
          <div className="mt-4 p-3 rounded-lg text-sm font-medium bg-gray-100">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};
export default CreateTournament;
