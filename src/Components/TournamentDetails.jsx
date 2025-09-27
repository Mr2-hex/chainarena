import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ethers } from "ethers";
import axios from "axios";
import Sidebar from "../Components/Dashboard/Sidebar.jsx";
import Header from "../Components/Dashboard/Header.jsx";

const TournamentDetails = () => {
  const { id } = useParams(); // tournament id from URL
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(null); // "stake" or "contribute"
  const [wallet, setWallet] = useState("");
  const [amount, setAmount] = useState("");
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/tournaments/${id}`
        );
        setTournament(res.data);
      } catch (error) {
        console.error("Error fetching tournament details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTournament();
  }, [id]);

  const handleAction = async (type) => {
    try {
      if (!window.ethereum) {
        alert("MetaMask is not installed!");
        return;
      }

      // request accounts from MetaMask
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // setup ethers provider & signer
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // ✅ Example: send ETH directly (later replace with your contract call)
      const tx = await signer.sendTransaction({
        to: wallet, // wallet address from modal input
        value: ethers.parseEther(amount), // convert amount (ETH) to wei
      });

      console.log("Transaction hash:", tx.hash);
      await tx.wait(); // wait until transaction is mined

      // close modal + show toast
      setShowModal(null);
      setWallet("");
      setAmount("");
      setToast(
        `✅ Successfully ${
          type === "stake" ? "staked & joined" : "contributed"
        }!`
      );

      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      console.error(err);
      setToast("❌ Transaction failed!");
      setTimeout(() => setToast(null), 3000);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!tournament) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Tournament not found
      </div>
    );
  }

  return (
    <div className="flex p-6 gap-6 bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <Header />

        <div className="flex-1 bg-white rounded-2xl shadow p-6 mt-6 space-y-6">
          {/* Tournament Banner */}
          <div className="relative w-full h-60 bg-gray-200 rounded-lg overflow-hidden">
            <img
              src={
                tournament.thumbnail || "https://via.placeholder.com/600x300"
              }
              alt={tournament.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4 text-white">
              <h1 className="text-2xl font-bold">{tournament.name}</h1>
            </div>
          </div>

          {/* Tournament Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-2">Tournament Info</h2>
              <p>
                <strong>Stake:</strong> {tournament.stakeAmount} ETH
              </p>
              <p>
                <strong>Min Players:</strong> {tournament.minPlayers}
              </p>
              <p>
                <strong>Max Players:</strong> {tournament.maxPlayers}
              </p>
              <p>
                <strong>Code:</strong> {tournament.tournamentCode}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-2">Game Info</h2>
              <p>
                <strong>Game:</strong>{" "}
                {tournament.gameId?.name || "Unknown Game"}
              </p>
              <p>
                <strong>Creator:</strong>{" "}
                {tournament.creatorId?.name || "Anonymous"}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(tournament.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button
              onClick={() => setShowModal("stake")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow transition"
            >
              Stake & Play
            </button>
            <button
              onClick={() => setShowModal("contribute")}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow transition"
            >
              Contribute
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4">
              {showModal === "stake" ? "Stake & Play" : "Contribute"}
            </h2>
            <input
              type="text"
              placeholder="Wallet Address"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-3"
            />
            <input
              type="number"
              placeholder="Amount (ETH)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-4"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(null)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAction(showModal)}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-gray-800 text-white px-4 py-2 rounded shadow">
          {toast}
        </div>
      )}
    </div>
  );
};

export default TournamentDetails;
