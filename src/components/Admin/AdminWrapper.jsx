import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast'
const AdminWrapper = ({ children }) => {


    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/admin/logout`,  { withCredentials: true });  // important for session

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
            {/* Sidebar */}
            <aside className="w-64 bg-bg-light3 text-white flex flex-col">
                <div className="p-4 text-2xl font-semibold border-b border-gray-700">
                    Admin Panel
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <Link to="/admin/dashboard" className="block py-2 px-4 rounded hover:bg-gray-700">Dashboard</Link>
                    <Link to="/admin/users" className="block py-2 px-4 rounded hover:bg-gray-700">Users</Link>

                </nav>
                <div className="p-4 border-t border-gray-700">
                    <button onClick={handleLogout} className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 rounded">Logout</button>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 p-6 bg-bg-color shadow-inner overflow-auto">
                {children}
            </main>
        </div>
    );
};

export default AdminWrapper;
