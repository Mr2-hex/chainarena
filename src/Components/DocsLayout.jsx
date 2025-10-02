import React, { useState } from "react";
import Sidebar from "../Components/Dashboard/Sidebar";
import Header from "../Components/Dashboard/Header";

const DocsLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const greeting = "Documentation";

  return (
    <div className="flex flex-col md:flex-row md:p-6 md:gap-6 bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <Sidebar visible={sidebarOpen} />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <Header
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          greeting={greeting}
        />

        <div className="flex-1 overflow-y-auto mt-6 space-y-6 px-4 md:px-0">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DocsLayout;
