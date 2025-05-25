import React from 'react';
import AdminWrapper from '../../components/Admin/AdminWrapper';
import { useEffect, useState } from 'react'
import axios from 'axios'
const AdminDashboard = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/admin/users`)
            setUsers(response.data)
            console.log("response", response.data)
        }

        fetchUsers()
    }, [])


    return (
        <AdminWrapper>
            <div className="text-xl font-semibold mb-4">Welcome to Admin Dashboard</div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-4  bg-bg-light3 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-2">Total Users</h2>
                    <p className="text-3xl">{users?.length}</p>
                </div>

                {/* <div className="p-4 bg-bg-light3 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-2">Active Sessions</h2>
                    <p className="text-3xl">38</p>
                </div>

                <div className="p-4 bg-bg-light3 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-2">Conversations Today</h2>
                    <p className="text-3xl">204</p>
                </div> */}
            </div>
        </AdminWrapper>
    );
};

export default AdminDashboard;
