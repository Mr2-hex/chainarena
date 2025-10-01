import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Dashboard/Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Clipboard } from "lucide-react";

const PutGame = () => {
  const [gameName, setGameName] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const errorRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Ensure loader shows for at least 1 second
      const [res] = await Promise.all([
        axios.post(" https://chain-backend-tkk9.onrender.com/api/putGames", {
          name: gameName,
        }),
        new Promise((resolve) => setTimeout(resolve, 1000)),
      ]);
      setApiKey(res.data.apiKey || res.data.game.apiKey);
      setGameName(""); // Clear form on success
    } catch (err) {
      console.error("Error generating API key:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });
      setError(
        err.response?.data?.message ||
          "Failed to generate API key. Please check your network or try again."
      );
      setGameName(""); // Clear form on error
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Hide toast after 2s
  };

  // Scroll to error message when it appears
  useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br p-8 from-indigo-50 to-purple-100 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md"
        >
          <h1 className="text-3xl font-extrabold font-funnel text-gray-800 mb-6 text-center">
            🕹️ Add Your Game
          </h1>

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <svg
                  className="animate-spin h-8 w-8 mx-auto text-indigo-600 mb-4"
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
                <p className="text-gray-700 font-medium">
                  Checking For Availability...
                </p>
              </motion.div>
            ) : apiKey ? (
              <motion.div
                key="apiKey"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 text-center"
              >
                <p className="text-gray-700 font-medium">Your API Key:</p>
                <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-center space-x-2">
                  <code className="text-indigo-600 font-mono">{apiKey}</code>
                  <button
                    onClick={handleCopy}
                    className="text-indigo-600 hover:text-indigo-800"
                    title="Copy API Key"
                  >
                    <Clipboard size={20} />
                  </button>
                </div>
                {copied && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-green-600 text-sm"
                  >
                    Copied!
                  </motion.p>
                )}
                <motion.button
                  onClick={() => navigate("/dashboard")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg shadow-lg transition font-semibold"
                >
                  🚀 Move to Dashboard
                </motion.button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Game Name
                  </label>
                  <input
                    type="text"
                    value={gameName}
                    onChange={(e) => setGameName(e.target.value)}
                    className="w-full border rounded-lg p-3 mt-1 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                    placeholder="e.g., FIFA 24"
                    required
                  />
                </div>
                {error && (
                  <motion.p
                    ref={errorRef}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-600 text-sm font-medium text-center bg-red-100 p-3 rounded-lg"
                  >
                    {error}
                  </motion.p>
                )}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg shadow-lg transition disabled:opacity-50 font-semibold flex items-center justify-center"
                >
                  Generate API Key
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default PutGame;
