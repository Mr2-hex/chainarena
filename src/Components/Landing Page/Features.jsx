import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Illustration from "../../assets/Images/Illus1.png";

const Features = () => {
  return (
    <section className="px-40 py-16 w-full grid md:grid-cols-2 gap-10 items-center max-[480px]:px-8">
      {/* Left Text Content */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-gray-900 font-funnel leading-snug">
          Build seamless gaming experiences <br /> with well-documented APIs
        </h2>
        <p className="mt-4 text-lg text-gray-600 w-[60%] max-[480px]:w-[100%]">
          Developers love Chain Arena’s clear and powerful APIs that let you
          build everything from small indie projects to large-scale games with
          thousands of players. If you can imagine it, you can build it with
          Chain Arena.
        </p>

        <ul className="mt-6 space-y-4 text-gray-700">
          <motion.li
            className="flex items-start"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <CheckCircle className="text-green-600 mr-2 mt-0.5 h-5 w-5 flex-shrink-0" />
            Create and manage on-chain tournaments directly in your game
          </motion.li>
          <motion.li
            className="flex items-start"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <CheckCircle className="text-green-600 mr-2 mt-0.5 h-5 w-5 flex-shrink-0" />
            Allow players to join with multiple wallets (desktop + mobile)
          </motion.li>
          <motion.li
            className="flex items-start"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <CheckCircle className="text-green-600 mr-2 mt-0.5 h-5 w-5 flex-shrink-0" />
            Automate prize payouts and NFT badge rewards
          </motion.li>
          <motion.li
            className="flex items-start"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <CheckCircle className="text-green-600 mr-2 mt-0.5 h-5 w-5 flex-shrink-0" />
            Access real-time player and tournament data
          </motion.li>
        </ul>

        <Link
          to="/docs"
          className="mt-8 inline-block text-green-600 font-medium hover:underline"
        >
          Chain Arena API Quickstart →
        </Link>
      </motion.div>

      {/* Right Side Illustration */}
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <img
          src={Illustration}
          alt="Illustration"
          className="w-full h-auto max-w-lg"
        />
      </motion.div>
    </section>
  );
};

export default Features;
