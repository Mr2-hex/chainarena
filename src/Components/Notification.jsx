import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Dashboard/Sidebar";
import Header from "../Components/Dashboard/Header";

const Notification = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col md:flex-row md:p-6 md:gap-6 bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <Sidebar visible={sidebarOpen} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 max-[480px]:mt-3">
        <Header
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          greeting={"Notifications"}
        />

        <div className="flex-1 overflow-y-auto mt-6 px-4 md:px-0">
          {loading ? (
            <div className="space-y-4">
              {/* Skeleton Banner */}
              <div className="h-20 bg-gray-200 rounded-lg animate-pulse"></div>
              {/* Skeleton Text */}
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
              </div>
              {/* Second */}
              {/* Skeleton Banner */}
              <div className="h-20 bg-gray-200 rounded-lg animate-pulse"></div>
              {/* Skeleton Text */}
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
              </div>
              {/* Third*/}
              {/* Skeleton Banner */}
              <div className="h-20 bg-gray-200 rounded-lg animate-pulse"></div>
              {/* Skeleton Text */}
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Additional Info */}
              <div className="bg-white rounded-lg p-6 shadow">
                <h2 className="text-lg font-semibold mb-2">
                  📢 Welcome To Chain Arena
                </h2>
                <p className="text-gray-700 leading-6 w-[70%]">
                  As you are going through the product if you encounter any bug
                  or any issue or have any suggestions, kindly reach out to the
                  Chain Arena team. Have a wounderful game
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow">
                <h2 className="text-lg font-semibold mb-2">
                  📢 Updates & Information
                </h2>
                <p className="text-gray-700 leading-6 w-[70%]">
                  Any new Information concerning the product will be sent to you
                  to check out and test. Contact Team If you encounter any
                  issues or have suggestions.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;
