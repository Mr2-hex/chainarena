import { useState } from "react";
import { ethers } from "ethers";
import tournamentAbi from "./TournamentPool.json";

export default function StakePage() {
  const [stakeAmount, setStakeAmount] = useState("");
  const [status, setStatus] = useState("");

  async function joinTournament() {
    try {
      if (!window.ethereum) throw new Error("MetaMask not found!");

      setStatus("Connecting to wallet...");

      // 1. Connect wallet
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      setStatus("Connecting to contract...");

      // 2. Connect to contract
      const contract = new ethers.Contract(
        "0xContractAddressHere",
        tournamentAbi,
        signer
      );

      setStatus("Sending transaction...");

      // 3. Call stake()
      const tx = await contract.stake(
        ethers.parseUnits(stakeAmount.toString(), 18),
        { value: ethers.parseUnits(stakeAmount.toString(), 18) }
      );

      setStatus(`Transaction sent: ${tx.hash}`);

      await tx.wait();
      setStatus("✅ Stake confirmed!");
    } catch (err) {
      console.error(err);
      setStatus("❌ " + err.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          Stake in Tournament
        </h1>

        <input
          type="number"
          placeholder="Enter stake amount"
          value={stakeAmount}
          onChange={(e) => setStakeAmount(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          onClick={joinTournament}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition"
        >
          Stake Now
        </button>

        {status && (
          <p className="mt-4 text-center text-sm text-gray-700">{status}</p>
        )}
      </div>
    </div>
  );
}
