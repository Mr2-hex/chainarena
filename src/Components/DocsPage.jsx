import React, { useState } from "react";
import DocsLayout from "./DocsLayout";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const codeJoinTournament = `
POST  https://chain-backend-tkk9.onrender.com/api/tournaments/:id/join
Headers: { "Authorization": "<your-api-key>" }
{
  "code": "<tournamentCode>"
}
`;

const codeJoinResponse = `
{
  "success": true
}
`;

const codeJoinTournamentNew = `
POST /api/tournaments/:id/join
Headers: { "Authorization": "<your-api-key>" }
{
  "walletAddress": "0xYourWalletAddress"
}
`;

const codeJoinResponseNew = `
{
  "success": true,
  "user": "PlayerName",
  "walletAddress": "0xYourWalletAddress",
  "tournament": {
    "id": "<tournamentId>",
    "name": "FIFA 24 Championship",
    "tournamentCode": "<uniquePlayerCode>"
  }
}
`;

const codeRewardWinner = `
POST /api/tournaments/:id/winner
Headers: { "Authorization": "<your-api-key>" }
{
  "winner": "0xWinnerWalletAddress"
}
`;

const codeRewardResponse = `
{
  "success": true
}
`;

const DocsPage = () => {
  const [showJoinSneakPeek, setShowJoinSneakPeek] = useState(false);
  const [showRewardSneakPeek, setShowRewardSneakPeek] = useState(false);

  return (
    <DocsLayout>
      {/* Title */}
      <section>
        <h1 className="text-3xl font-bold text-gray-900 mb-4 font-funnel">
          Chain Arena API Integration
        </h1>
        <p className="text-gray-700">
          Welcome! This guide shows how to integrate your game with Chain Arena
          to let players join tournaments and compete for HACKUSD rewards.
        </p>
      </section>

      {/* Add Your Game Button */}
      <section className="mt-6">
        <p className="text-gray-700 font-medium mb-4">
          Haven’t added your game yet? Get started now!
        </p>
        <motion.div whileTap={{ scale: 0.95 }}>
          <Link
            to="/integrateGame"
            className="inline-block bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-indigo-700 transition duration-200"
          >
            Add Your Game
          </Link>
        </motion.div>
      </section>

      {/* Overview */}
      <section id="overview" className="space-y-4 mt-6">
        <h2 className="text-2xl font-bold text-gray-900">📌 Overview</h2>
        <p className="text-gray-700 leading-7">
          Chain Arena enables players to join tournaments using HACKUSD tokens
          via a smart contract. Use our API to integrate your game and let
          players compete seamlessly.
        </p>
        <ul className="list-disc ml-6 text-gray-700 space-y-1">
          <li>Tournaments are created on the platform, not via this API.</li>
          <li>Players join with a tournament code and stake tokens.</li>
          <li>Use your game’s API key to authenticate requests.</li>
        </ul>
      </section>

      {/* Game Integration */}
      <section id="game-integration" className="space-y-4 mt-6">
        <h2 className="text-2xl font-bold text-gray-900">
          🕹️ Game Integration
        </h2>
        <p className="text-gray-700 leading-7">
          Get an API key to authenticate your game’s requests.
        </p>
        <ol className="list-decimal ml-6 text-gray-700 space-y-1">
          <li>
            Visit{" "}
            <Link
              to="/integrateGame"
              className="text-indigo-600 hover:underline"
            >
              Integrate Game
            </Link>{" "}
            to add your game.
          </li>
          <li>Provide your game’s name (e.g., “FIFA 24”).</li>
          <li>Get a unique API key (e.g., “abc123xyz789”).</li>
          <li>
            Include it in the <code>Authorization</code> header.
          </li>
        </ol>
      </section>

      {/* Quickstart */}
      <section id="quickstart" className="space-y-4 mt-6">
        <h2 className="text-2xl font-bold text-gray-900">⚡ Quickstart</h2>
        <ol className="list-decimal ml-6 text-gray-700 space-y-1">
          <li>Network: Sepolia Testnet</li>
          <li>Token: HACKUSD (ERC-20)</li>
          <li>
            API Key: Use{" "}
            <Link
              to="/integrateGame"
              className="text-indigo-600 hover:underline"
            >
              Integrate Game
            </Link>
          </li>
          <li>
            Base URL: <code>{BASE_URL}</code>
          </li>
        </ol>
      </section>

      {/* Backend API */}
      <section id="api" className="space-y-4 mt-6">
        <h2 className="text-2xl font-bold text-gray-900">🌐 Backend API</h2>
        <h3 className="text-xl font-semibold text-gray-800 mt-4">
          POST /api/tournaments/:id/join
        </h3>
        <p className="text-gray-700">
          Join a tournament with a unique code. Include your API key in the
          headers.
        </p>
        <SyntaxHighlighter language="json" style={oneDark}>
          {codeJoinTournament}
        </SyntaxHighlighter>
        <p className="text-gray-700">
          <strong>Headers:</strong> Authorization: your-api-key
          <br />
          <strong>Params:</strong> id – Tournament ID from platform
          <br />
          <strong>Body:</strong> code – Tournament code (e.g., “XYZ123”)
          <br />
          <strong>Response:</strong>
        </p>
        <SyntaxHighlighter language="json" style={oneDark}>
          {codeJoinResponse}
        </SyntaxHighlighter>
      </section>

      {/* Coming Soon Features */}
      <section id="coming-soon" className="space-y-4 mt-6">
        <h2 className="text-2xl font-bold text-gray-900">🚧 Coming Soon</h2>
        <p className="text-gray-700 leading-7">
          Exciting new features are under construction to enhance your Chain
          Arena experience. Check out a sneak peek of what’s to come!
        </p>

        {/* Join Tournament (Updated) */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-800">
            Join Tournament (Updated)
          </h3>
          <p className="text-gray-700">
            Soon, players will stake HACKUSD tokens via our smart contract and
            receive a unique tournament code per player for a seamless
            experience. No need to input wallet addresses manually!
          </p>
          <motion.button
            onClick={() => setShowJoinSneakPeek(!showJoinSneakPeek)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-indigo-700 transition duration-200"
          >
            {showJoinSneakPeek ? "Hide Sneak Peek" : "Show Sneak Peek"}
          </motion.button>
          <AnimatePresence>
            {showJoinSneakPeek && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 mt-4"
              >
                <p className="text-gray-700">
                  <strong>Request:</strong> After staking, join with your API
                  key and wallet address.
                </p>
                <SyntaxHighlighter language="json" style={oneDark}>
                  {codeJoinTournamentNew}
                </SyntaxHighlighter>
                <p className="text-gray-700">
                  <strong>Response:</strong> Get a unique code for the player.
                </p>
                <SyntaxHighlighter language="json" style={oneDark}>
                  {codeJoinResponseNew}
                </SyntaxHighlighter>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Reward Winner */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-800">Reward Winner</h3>
          <p className="text-gray-700">
            Under construction: Report the tournament winner to trigger smart
            contract payouts in HACKUSD tokens to the winner’s wallet.
          </p>
          <motion.button
            onClick={() => setShowRewardSneakPeek(!showRewardSneakPeek)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-indigo-700 transition duration-200"
          >
            {showRewardSneakPeek ? "Hide Sneak Peek" : "Show Sneak Peek"}
          </motion.button>
          <AnimatePresence>
            {showRewardSneakPeek && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 mt-4"
              >
                <p className="text-gray-700">
                  <strong>Request:</strong> Report the winner’s wallet address.
                </p>
                <SyntaxHighlighter language="json" style={oneDark}>
                  {codeRewardWinner}
                </SyntaxHighlighter>
                <p className="text-gray-700">
                  <strong>Response:</strong> Confirm payout success.
                </p>
                <SyntaxHighlighter language="json" style={oneDark}>
                  {codeRewardResponse}
                </SyntaxHighlighter>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </DocsLayout>
  );
};

export default DocsPage;
