import React from "react";
import { Bell, Search, Menu } from "lucide-react";

const Header = ({ onToggleSidebar }) => {
  return (
    <header className="z-40 bg-white w-full h-16 flex items-center justify-between px-6 pt-3">
      {/* Left - Greeting */}
      <div className="flex items-center gap-2">
        <span className="text-2xl md:text-3xl font-bold tracking-wide font-funnel text-gray-800">
          Welcome Back, Champ
        </span>
      </div>

      {/* Center - Search */}
      <div className="hidden md:flex items-center bg-white rounded-xl px-3 py-2 w-1/3 shadow-inner border border-gray-200">
        <Search className="w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          className="ml-2 w-full bg-transparent outline-none text-sm placeholder:text-gray-400"
        />
      </div>

      {/* Right - Icons */}
      <div className="flex items-center gap-4">
        {/* Notification Icon */}
        <div className="relative cursor-pointer hidden md:flex">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full animate-ping"></span>
        </div>

        {/* Mobile Menu Icon */}
        <button
          onClick={onToggleSidebar}
          className="md:hidden w-9 h-9 rounded-full bg-[#000b11] flex items-center justify-center"
        >
          <Menu className="w-5 h-5 text-white" />
        </button>
      </div>
    </header>
  );
};

export default Header;
