import React from "react";
import { Link } from "react-router-dom";
import HeroImg from "../../assets/Images/diagram-flow-Photoroom.png";
import HeroBg from "../../assets/Images/HeroBg.jpg";

const HeroSection = () => {
  return (
    <section
      className="w-full px-8 py-20 flex mt-8 flex-col items-center text-center bg-cover bg-center bg-no-repeat min-h-screen"
      style={{ backgroundImage: `url(${HeroBg})` }}
    >
      {/* Badge */}
      <span className="px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-funnel font-medium mb-6">
        Bringing Web2 Games On-Chain
      </span>

      {/* Headline */}
      <h1 className="text-4xl md:text-6xl font-funnel font-bold text-[#0f172a] max-w-3xl leading-tight max-[480px]:text-[30px] max-[480px]h-[60%]:">
        Onboard your game to Web3 without rebuilding from scratch
      </h1>

      {/* Subheading */}
      <p className="mt-6 text-lg text-gray-600 max-w-2xl font-inter leading-relaxed">
        ChainArena makes it easy for Web2 games to tap into Web3 tournaments,
        staking, and rewards — all through simple APIs.
      </p>

      {/* CTA Buttons */}
      <div className="mt-8 flex gap-4">
        <Link
          to="/register"
          className="bg-blue-600 text-white font-inter px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition max-[480px]:px-8"
        >
          Get Started for Free
        </Link>
      </div>

      <div className="mt-12">
        <img
          src={HeroImg}
          alt="Web2 to Web3 Flow"
          className="max-w-4xl w-full"
        />
      </div>
    </section>
  );
};

export default HeroSection;
