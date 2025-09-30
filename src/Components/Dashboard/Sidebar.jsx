import React from "react";
import {
  Home,
  BookOpen,
  MessageSquare,
  Bell,
  Calendar,
  Users,
  Settings,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const menus = [
    { name: "Dashboard", icon: Home, link: "/docs" },
    { name: "Developers", icon: BookOpen, link: "/docs" },
    { name: "Messages", icon: MessageSquare, link: "/messages" },
    { name: "Notifications", icon: Bell, badge: 2, link: "/notifications" },
    { name: "Calendar", icon: Calendar, link: "/calendar" },
    { name: "Community", icon: Users, link: "/community" },
    { name: "Settings", icon: Settings, link: "/settings" },
  ];

  return (
    <div className="flex flex-col bg-[#0f172a] text-gray-200 rounded-2xl h-[90vh] w-[220px] p-4 justify-between max-[720px]:hidden">
      {/* Logo Section */}
      <div className="flex justify-center items-center gap-2 mb-10">
        {/* Add your logo here if needed */}
      </div>

      {/* Navigation Menu */}
      <ul className="flex-1 flex flex-col gap-2">
        {menus.map((menu, idx) => {
          const isActive = location.pathname === menu.link;

          return menu.link ? (
            <li key={idx}>
              <Link
                to={menu.link}
                className={`flex items-center gap-3 px-4 py-3 rounded-4xl transition-all ${
                  isActive
                    ? "bg-blue-600 text-white font-semibold"
                    : "hover:bg-blue-800 hover:text-white"
                }`}
              >
                <menu.icon size={20} />
                <span className="flex-1 text-sm font-funnel font-semibold">
                  {menu.name}
                </span>
                {menu.badge && (
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {menu.badge}
                  </span>
                )}
              </Link>
            </li>
          ) : (
            <li
              key={idx}
              className="flex items-center gap-3 px-4 py-3 rounded-4xl hover:bg-blue-800 hover:text-white transition-all"
            >
              <menu.icon size={20} />
              <span className="flex-1 text-sm font-funnel font-semibold">
                {menu.name}
              </span>
              {menu.badge && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {menu.badge}
                </span>
              )}
            </li>
          );
        })}
      </ul>

      {/* Bottom CTA */}
      <div className="bg-blue-100 text-blue-900 rounded-xl p-3 text-center cursor-pointer hover:bg-blue-200 transition">
        <p className="text-xs font-semibold">Download our mobile app</p>
      </div>
    </div>
  );
};

export default Sidebar;
