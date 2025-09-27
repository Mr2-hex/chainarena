import React from "react";

const DocsLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50 font-inter">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-6">
        <h1 className="text-xl font-bold mb-6">Tournament Docs</h1>
        <nav className="space-y-3 text-gray-700">
          <a href="#overview" className="block hover:text-blue-600">
            Overview
          </a>
          <a href="#contract" className="block hover:text-blue-600">
            Smart Contract
          </a>
          <a href="#api" className="block hover:text-blue-600">
            Backend API
          </a>
          <a href="#frontend" className="block hover:text-blue-600">
            Frontend Integration
          </a>
          <a href="#events" className="block hover:text-blue-600">
            Events
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 space-y-12">{children}</main>
    </div>
  );
};

export default DocsLayout;
