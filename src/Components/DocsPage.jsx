import React from "react";
import DocsLayout from "./DocsLayout";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const codeJoinTournament = `
import { ethers } from "ethers";
import TournamentPoolABI from "./TournamentPool.json";

const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();

const contract = new ethers.Contract(
  "<TOURNAMENT_POOL_ADDRESS>",
  TournamentPoolABI,
  signer
);

// Approve tokens first
const token = new ethers.Contract("<TOKEN_ADDRESS>", ERC20_ABI, signer);
await token.approve("<TOURNAMENT_POOL_ADDRESS>", ethers.parseUnits("100", 18));

// Join tournament (pass the tournament ID + stake)
await contract.joinTournament(ethers.parseUnits("100", 18));
`;

const codeGetPlayers = `
const players = await contract.getPlayers();
console.log("Players:", players);
`;

const codeCreateTournament = `
POST /api/tournaments
{
  "name": "Hackathon Cup",
  "minPlayers": 2,
  "maxPlayers": 10
}
`;

const codeJoinApi = `
POST /api/tournaments/:id/join
{
  "stakeAmount": 100
}
`;

const DocsPage = () => {
  return (
    <DocsLayout>
      {/* Title */}
      <section>
        <h1 className="text-3xl font-bold mb-4">
          🎮 TournamentPool Integration Docs
        </h1>
        <p className="text-gray-700">
          Welcome! This document explains how to integrate your game with the
          TournamentPool smart contract + backend API.
        </p>
      </section>

      {/* Overview */}
      <section id="overview" className="space-y-4">
        <h2 className="text-2xl font-bold">📌 Overview</h2>
        <p className="text-gray-700 leading-7">
          TournamentPool allows games to host tournaments where players stake
          ERC-20 tokens to participate.
        </p>
        <ul className="list-disc ml-6 text-gray-700 space-y-1">
          <li>Players join a tournament with a token stake.</li>
          <li>Once the tournament ends, the prize pool can be distributed.</li>
          <li>Games only need to call the API / contract methods provided.</li>
        </ul>
      </section>

      {/* Quickstart */}
      <section id="quickstart" className="space-y-4">
        <h2 className="text-2xl font-bold">⚡ Quickstart</h2>
        <ol className="list-decimal ml-6 text-gray-700 space-y-1">
          <li>Wallet: MetaMask or any Web3-compatible wallet</li>
          <li>Network: Sepolia Testnet</li>
          <li>Token: ERC-20 deployed token (e.g. HACKUSD)</li>
          <li>
            Contract: TournamentPool deployed at <code>0x...</code>
          </li>
        </ol>
      </section>

      {/* Smart Contract */}
      <section id="contract" className="space-y-4">
        <h2 className="text-2xl font-bold">🔗 Smart Contract</h2>
        <p>
          Deployed at: <code>&lt;your_contract_address&gt;</code>
        </p>
        <p>
          Provide the ABI JSON file (so devs can import into ethers.js/web3.js).
        </p>

        {/* joinTournament */}
        <h3 className="text-xl font-semibold mt-6">
          joinTournament(uint256 _stakeAmount)
        </h3>
        <p className="text-gray-700">
          Description: Player stakes tokens to join.
          <br />
          Params: <code>_stakeAmount</code> – the amount of ERC20 tokens to
          stake.
        </p>
        <SyntaxHighlighter language="javascript" style={oneDark}>
          {codeJoinTournament}
        </SyntaxHighlighter>

        {/* getPlayers */}
        <h3 className="text-xl font-semibold mt-6">getPlayers()</h3>
        <p className="text-gray-700">
          Returns the list of all player addresses that joined.
        </p>
        <SyntaxHighlighter language="javascript" style={oneDark}>
          {codeGetPlayers}
        </SyntaxHighlighter>

        {/* closeTournament */}
        <h3 className="text-xl font-semibold mt-6">closeTournament()</h3>
        <p className="text-gray-700">
          Closes the tournament when max players are reached. Admin only.
        </p>

        {/* rewardWinner */}
        <h3 className="text-xl font-semibold mt-6">
          rewardWinner(address winner)
        </h3>
        <p className="text-gray-700">
          Sends the full token pool to the winner. Admin only.
        </p>
      </section>

      {/* Backend API */}
      <section id="api" className="space-y-4">
        <h2 className="text-2xl font-bold">🌐 Backend API</h2>

        <h3 className="text-xl font-semibold">POST /api/tournaments</h3>
        <p>Create a new tournament.</p>
        <SyntaxHighlighter language="json" style={oneDark}>
          {codeCreateTournament}
        </SyntaxHighlighter>

        <h3 className="text-xl font-semibold">
          POST /api/tournaments/:id/join
        </h3>
        <p>Join a tournament (backend verifies JWT, links wallet).</p>
        <SyntaxHighlighter language="json" style={oneDark}>
          {codeJoinApi}
        </SyntaxHighlighter>

        <h3 className="text-xl font-semibold">GET /api/tournaments/:id</h3>
        <p>Fetch tournament details (name, image, players, status).</p>
      </section>

      {/* Frontend Integration */}
      <section id="frontend" className="space-y-4">
        <h2 className="text-2xl font-bold">🎨 Frontend Integration</h2>
        <ul className="list-disc ml-6 text-gray-700 space-y-1">
          <li>Display tournaments list (fetched from backend).</li>
          <li>On Join, ask user for tournament ID + stake amount.</li>
          <li>
            Backend handles verification and contract call — no MetaMask popup
            needed.
          </li>
        </ul>
      </section>

      {/* Example Flow */}
      <section id="flow" className="space-y-4">
        <h2 className="text-2xl font-bold">✅ Example Flow</h2>
        <ol className="list-decimal ml-6 text-gray-700 space-y-1">
          <li>Player logs into your game.</li>
          <li>Player clicks “Join Tournament”.</li>
          <li>Game calls backend → backend gives tournament details.</li>
          <li>Frontend prompts for tournament ID + stake amount.</li>
          <li>Backend processes joinTournament on-chain.</li>
          <li>When tournament ends, admin calls rewardWinner().</li>
        </ol>
      </section>

      {/* Events */}
      <section id="events" className="space-y-4">
        <h2 className="text-2xl font-bold">📢 Events</h2>
        <ul className="list-disc ml-6 text-gray-700 space-y-1">
          <li>
            <code>PlayerJoined(address player, uint256 stake)</code>
          </li>
          <li>
            <code>TournamentClosed()</code>
          </li>
          <li>
            <code>WinnerRewarded(address winner, uint256 amount)</code>
          </li>
        </ul>
        <p>Listen to these for real-time updates.</p>
      </section>
    </DocsLayout>
  );
};

export default DocsPage;
