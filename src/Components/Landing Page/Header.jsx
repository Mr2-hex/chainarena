import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Logo from "../../assets/Images/chain-arena-logo.jpg";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/login", label: "Login" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/docs", label: "Developers" },
  ];

  return (
    <motion.div
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50"
    >
      <header
        className={`w-full px-8 py-4 flex items-center justify-center transition-all duration-300 ${
          scrolled
            ? "bg-white/70 backdrop-blur-lg shadow-lg rounded-b-xl"
            : "bg-gray-100"
        }`}
      >
        {/* Container to center everything */}
        <div className="flex items-center justify-between py-4 w-full max-w-6xl">
          {/* Logo + Text */}
          <Link to="/" className="flex items-center gap-2">
            <img src={Logo} alt="ChainArena Logo" className="h-8 w-auto" />
            <span className="text-2xl font-funnel font-bold text-[#0f172a]">
              Chain Arena
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 text-[#0f172a] font-medium">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to} className="hover:text-blue-600">
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/register"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Burger Icon */}
          <button
            className="md:hidden text-[#0f172a]"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Sidebar */}
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 mt-2 bg-gray-50 backdrop-blur-md rounded-2xl shadow-md w-full p-6 text-[#0f172a] flex flex-col gap-4 md:hidden z-40 border border-gray-200"
          >
            <ul className="flex flex-col gap-4">
              {navItems.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="hover:text-blue-600 py-2 block font-medium"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-4 pt-4 border-t border-gray-200">
              <Link
                to="/login"
                className="text-[#0f172a] font-medium hover:text-blue-600 py-2"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/get-started"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition text-center"
                onClick={() => setOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </header>
    </motion.div>
  );
};

export default Header;
