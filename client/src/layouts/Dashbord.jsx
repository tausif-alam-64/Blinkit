import React from "react";
import UserManu from "../components/UserManu";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <section className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-4 lg:p-6 grid lg:grid-cols-[250px,1fr] gap-4">
        {/* Left sidebar for menu */}
        <aside className="hidden lg:block sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto border-r bg-white rounded-lg shadow-sm p-2">
          <UserManu />
        </aside>

        {/* Main content */}
        <main className="min-h-[75vh] bg-white rounded-lg shadow-sm p-4">
          <Outlet />
        </main>
      </div>
    </section>
  );
};

export default Dashboard;
