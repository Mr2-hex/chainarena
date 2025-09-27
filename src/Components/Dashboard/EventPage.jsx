import React, { useState } from "react";
import { ethers } from "ethers"; // make sure ethers is installed

const EventPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stakeAmount, setStakeAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  // Example MetaMask staking handler
  const handleStake = async () => {
    if (!window.ethereum) {
      alert("MetaMask not detected!");
      return;
    }

    try {
      // Request wallet connection
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected account:", account);

      // Ensure wallet entered matches connected account (optional check)
      if (
        walletAddress &&
        walletAddress.toLowerCase() !== account.toLowerCase()
      ) {
        alert("Wallet address does not match your connected MetaMask account!");
        return;
      }

      // Initialize provider and signer
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Example contract interaction placeholder
      // Replace with your contract address + ABI
      // const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      // const tx = await contract.stake(ethers.parseEther(stakeAmount));
      // await tx.wait();

      console.log(`Staking ${stakeAmount} ETH from ${account}...`);

      alert(`Successfully staked ${stakeAmount} ETH! 🎉`);
      setIsModalOpen(false);
      setStakeAmount("");
      setWalletAddress("");
    } catch (err) {
      console.error(err);
      alert("Staking failed!");
    }
  };

  const TournamentCard = ({ name, date, time, location, imageUrl }) => (
    <div className="bg-[#0f172a] text-white rounded-xl p-6 shadow-md flex flex-col md:flex-row gap-6">
      <img
        src={imageUrl}
        alt={name}
        className="w-full md:w-1/3 h-48 object-cover rounded-lg"
      />
      <div>
        <h2 className="text-2xl font-bold">{name}</h2>
        <p className="mt-3 text-blue-100 text-sm leading-6">
          <strong>Date:</strong> {date}
        </p>
        <p className="mt-1 text-blue-100 text-sm leading-6">
          <strong>Time:</strong> {time}
        </p>
        <p className="mt-1 text-blue-100 text-sm leading-6">
          <strong>Location:</strong> {location}
        </p>

        {/* Action Buttons */}
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            🎮 Play / Stake
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200">
            🤝 Contribute
          </button>
        </div>
      </div>
    </div>
  );

  const ThankYouSection = () => (
    <div className="bg-blue-600 text-white rounded-xl p-6 shadow-md mt-6">
      <h3 className="text-xl font-semibold">THANK YOU FOR JOINING</h3>
      <p className="mt-2 text-blue-100 text-sm">
        We hope you enjoyed the tournament!
      </p>
    </div>
  );

  const HostSection = ({ hosts }) => (
    <div className="bg-[#0f172a] text-white rounded-xl p-6 shadow-md mt-6">
      <h3 className="text-xl font-semibold">HOSTED BY</h3>
      <ul className="mt-3 list-disc list-inside text-blue-100 text-sm leading-6">
        {hosts.map((host, index) => (
          <li key={index}>{host}</li>
        ))}
      </ul>
    </div>
  );

  const AboutSection = ({ name, theme, note }) => (
    <div className="bg-blue-600 text-white rounded-xl p-6 shadow-md mt-6">
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="mt-2 text-sm leading-6">
        <strong>Theme:</strong> {theme}
      </p>
      <p className="mt-1 text-sm leading-6">
        <strong>Note:</strong> {note}
      </p>
    </div>
  );

  const hosts = ["South Stable Summit", "Defiboy", "NextBridge Africa"];

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <TournamentCard
          name="NEXTBRIDGE GAMING TOURNAMENT"
          date="Wednesday, September 24"
          time="12:00 PM - 1:00 PM"
          location="Cafe One Enugu"
          imageUrl="https://via.placeholder.com/600x400"
        />
        <ThankYouSection />
        <HostSection hosts={hosts} />
        <AboutSection
          name="NEXTBRIDGE GAMING TOURNAMENT"
          theme="Battle for Glory — Stake and Play On-Chain"
          note="Official Side Tournament at Web3Conf Enugu 2025 | Free Entry | Limited to 100 Players"
        />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">Stake Tokens</h2>

            <input
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              placeholder="Enter your wallet address"
              className="w-full border border-gray-300 rounded-lg p-2 mb-4"
            />

            <input
              type="number"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              placeholder="Enter amount to stake (ETH)"
              className="w-full border border-gray-300 rounded-lg p-2 mb-4"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleStake}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
              >
                Stake
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventPage;
