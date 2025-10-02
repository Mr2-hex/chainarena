import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import axios from "axios";
import Sidebar from "../Components/Dashboard/Sidebar.jsx";
import Header from "../Components/Dashboard/Header.jsx";
import TournamentPoolABI from "../../abis/TournamentPool.json";
import ERC20ABI from "../../abis/HACKUSD.json";
import Thumbnail from "../../src/assets/Images/thumbnail.jpg";

const TournamentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(null);
  const [amount, setAmount] = useState("");
  const [toast, setToast] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [balances, setBalances] = useState({ eth: "0", hackusd: "0" });

  const TOURNAMENT_POOL_ADDRESS = "0x291ceab033961a0c92ce73b413411e2a41218376";
  const TOKEN_ADDRESS = "0x93de7b986b65f110aedd4401d3b073a116fc746d";
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setToast("Please log in to view tournament details");
          navigate("/");
          return;
        }
        const res = await axios.get(` ${BASE_URL}/api/tournaments/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTournament(res.data);
      } catch (error) {
        console.error("Error fetching tournament details:", error);
        setToast("Failed to load tournament. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    const fetchBalances = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          const ethBalance = await provider.getBalance(address);
          const token = new ethers.Contract(
            TOKEN_ADDRESS,
            ERC20ABI.abi,
            provider
          );
          const hackusdBalance = await token.balanceOf(address);
          setBalances({
            eth: ethers.formatEther(ethBalance),
            hackusd: ethers.formatUnits(hackusdBalance, 18),
          });
        } catch (err) {
          console.error("Error fetching balances:", err);
        }
      }
    };

    fetchTournament();
    fetchBalances();
  }, [id, navigate]);

  const handleAction = async (type) => {
    try {
      if (!window.ethereum) {
        setToast("MetaMask not installed");
        return;
      }
      // Ensure Sepolia network
      const chainId = "0xAA36A7";
      const currentChain = await window.ethereum.request({
        method: "eth_chainId",
      });
      if (currentChain !== chainId) {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId }],
          });
        } catch (switchError) {
          if (switchError.code === 4902) {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId,
                  chainName: "Sepolia Testnet",
                  rpcUrls: ["https://rpc.sepolia.org"],
                  nativeCurrency: {
                    name: "Sepolia ETH",
                    symbol: "ETH",
                    decimals: 18,
                  },
                  blockExplorerUrls: ["https://sepolia.etherscan.io"],
                },
              ],
            });
          } else {
            setToast("Failed to switch to Sepolia. Please set it in MetaMask.");
            throw switchError;
          }
        }
      }

      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      setIsSubmitting(true);
      setToast("Connecting wallet...");

      if (type === "stake") {
        if (!amount || isNaN(amount) || Number(amount) <= 0) {
          setToast("Please enter a valid stake amount");
          return;
        }
        if (Number(amount) > Number(balances.hackusd)) {
          setToast(
            `Stake amount exceeds balance: ${balances.hackusd} HACKUSD available`
          );
          return;
        }

        const stakeAmountWei = ethers.parseUnits(amount, 18);
        const token = new ethers.Contract(TOKEN_ADDRESS, ERC20ABI.abi, signer);

        // Verify token contract
        setToast("Checking token contract...");
        const code = await provider.getCode(TOKEN_ADDRESS);
        if (code === "0x") {
          setToast("Token contract not found on Sepolia!");
          throw new Error("Token contract not deployed");
        }

        // Check ETH balance for gas
        const walletAddress = await signer.getAddress();
        const ethBalance = await provider.getBalance(walletAddress);
        if (ethBalance === 0n) {
          setToast("No Sepolia ETH for gas fees!");
          return;
        }

        // Approve
        setToast("Approving token spend...");
        console.log(
          "Approving:",
          TOURNAMENT_POOL_ADDRESS,
          stakeAmountWei.toString()
        );
        let tx = await token.approve(TOURNAMENT_POOL_ADDRESS, stakeAmountWei, {
          gasLimit: 100000,
        });
        await tx.wait();
        setToast("Approval successful, joining tournament...");

        // Join tournament
        const tournamentPool = new ethers.Contract(
          TOURNAMENT_POOL_ADDRESS,
          TournamentPoolABI.abi,
          signer
        );
        tx = await tournamentPool.joinTournament(stakeAmountWei);
        await tx.wait();
        setToast("Tournament joined, logging to backend...");

        // Log to backend with auth token
        if (!token) {
          setToast("Please log in to complete staking");
          navigate("/login");
          return;
        }
        await axios.post(
          `${BASE_URL}/api/${id}`,
          {
            walletAddress,
            stakeAmount: amount,
          },
          {
            Headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setToast("Successfully staked & joined!");
      }
    } catch (err) {
      console.error("Staking error:", {
        message: err.message,
        code: err.code,
        data: err.data,
      });
      setToast(
        err.code === "ERR_BAD_REQUEST" && err.response?.status === 401
          ? "Authentication failed. Please log in again."
          : err.code === -32603
          ? "Network or contract issue. Ensure Sepolia is selected."
          : err.message.includes("missing revert data")
          ? "Contract call failed. Check token contract and balance."
          : err.message
      );
    } finally {
      setIsSubmitting(false);
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
      <Sidebar visible={sidebarOpen} />
      <div className="flex flex-col flex-1">
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex-1 bg-white rounded-2xl shadow p-6 mt-6 space-y-6">
          <div className="relative w-full h-60 bg-gray-200 rounded-lg overflow-hidden">
            <img
              src={tournament.thumbnail || `${Thumbnail}`}
              alt={tournament.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 font-funnel left-0 right-0 bg-black/50 p-4 text-white">
              <h1 className="text-2xl font-bold">{tournament.name}</h1>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg shadow ">
              <h2 className="text-lg font-semibold mb-2">Tournament Info</h2>
              <p>
                <strong>Stake:</strong> {tournament.stakeAmount} HACKUSD
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
          <div className="flex justify-end gap-4">
            <button
              onClick={() => setShowModal("stake")}
              className="bg-[#5db2f3] text-white px-6 py-2 rounded-lg shadow transition"
            >
              Stake & Play
            </button>
            <button
              onClick={() => setShowModal("contribute")}
              className="bg-[#000b11]  text-white px-6 py-2 rounded-lg shadow transition"
            >
              Contribute
            </button>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4">
              {showModal === "stake" ? "Stake & Play" : "Contribute"}
            </h2>
            <div className="mb-4">
              <p className="text-sm text-gray-500">
                Balance: {balances.hackusd} HACKUSD, {balances.eth} Sepolia ETH
              </p>
              <p className="text-sm text-gray-500">
                Note: Staking requires a small Sepolia ETH gas fee.
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Stake Amount (HACKUSD)
              </label>
              <input
                type="number"
                placeholder="Amount (HACKUSD)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(null)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAction(showModal)}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Loading..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-gray-800 text-white px-4 py-2 rounded shadow">
          {toast}
        </div>
      )}
    </div>
  );
};

export default TournamentDetails;
