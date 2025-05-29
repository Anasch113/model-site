import React, { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast'
import { Menu, X } from "lucide-react";
const AdminWrapper = ({ children }) => {

    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);


    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/admin/logout`, { withCredentials: true });  // important for session

            toast.success("Logout successfully");
            console.log("res", res.data)
            window.location.href = "/admin/login";
        } catch (err) {
            toast.error("error");
            console.log("error", err)
        }
    };



    return (
       <div className="flex min-h-screen bg-bg-color text-gray-200">
      {/* Mobile Sidebar (sliding) */}
      <div
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-bg-light3 text-white flex flex-col transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:hidden`}
      >
        <div className="p-4 text-2xl font-semibold border-b border-gray-700">
          Admin Panel
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/admin/dashboard" className="block py-2 px-4 rounded hover:bg-gray-700">
            Dashboard
          </Link>
          <Link to="/admin/users" className="block py-2 px-4 rounded hover:bg-gray-700">
            Users
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button onClick={handleLogout} className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 rounded">
            Logout
          </button>
        </div>
      </div>

      {/* Desktop Sidebar (static) */}
      <div className="hidden md:flex md:w-64 md:flex-col md:bg-bg-light3 md:text-white md:min-h-screen md:border-r md:border-gray-700">
        <div className="p-4 text-2xl font-semibold border-b border-gray-700">
          Admin Panel
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/admin/dashboard" className="block py-2 px-4 rounded hover:bg-gray-700">
            Dashboard
          </Link>
          <Link to="/admin/users" className="block py-2 px-4 rounded hover:bg-gray-700">
            Users
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button onClick={handleLogout} className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 rounded">
            Logout
          </button>
        </div>
      </div>

      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
        />
      )}

      {/* Hamburger Button (mobile only) */}
      <button
        onClick={toggleSidebar}
        className="absolute top-4 left-4 z-50 text-white md:hidden"
      >
        {isSidebarOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-bg-color overflow-auto mt-10 md:mt-0">
        {children}
      </main>
    </div>
    );
};

export default AdminWrapper;
