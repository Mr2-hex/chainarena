import React from "react";
import { Bell, Search, User } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full h-16  text-black flex items-center justify-between px-6  sticky top-0 z-50">
      {/* Left - Logo */}
      <div className="flex items-center gap-2">
        <span className="text-3xl font-bold tracking-wide font-funnel">
          Welcome Back, Emmanuel
        </span>
      </div>

      {/* Center - Search */}
      <div className="hidden md:flex items-center bg-white rounded-xl px-3 py-2 w-1/3 shadow-2xl shadow-blue-600">
        <Search className="w-4 h-4 text-gray-300" />
        <input
          type="text"
          placeholder="Search..."
          className="ml-2 w-full bg-transparent outline-none text-sm placeholder:text-gray-400"
        />
      </div>

      {/* Right - Icons */}
      <div className="flex items-center gap-4">
        {/* Notifications */}

        {/* User Avatar */}
        <div className="w-9 h-9 rounded-full bg-[#2563EB] flex items-center justify-center cursor-pointer">
          <User className="w-5 h-5 text-white" />
        </div>
      </div>
    </header>
  );
};

export default Header;
