import React, { useState, useEffect, useRef } from 'react';
import { FaTrashAlt, FaDownload, FaUpload } from 'react-icons/fa';
import AdminDashboard from './AdminDashboard';
import AdminWrapper from '../../components/Admin/AdminWrapper';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaRocket } from "react-icons/fa";
import { FaImages } from "react-icons/fa6";



const Users = () => {

    const [users, setUsers] = useState([])
    const [selectedImage, setSelectedImage] = useState(null)
    const [caption, setCaption] = useState("")

    const fileInputRef = useRef(null)



    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/admin/users`)
            setUsers(response.data)
            console.log("response", response.data)
        }

        fetchUsers()
    }, [])

    const handleDelete = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            // Replace with API call
            const deleteUser = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/admin/delete-user`, {
                data: { userId }
            })
            window.location.reload()
        }
    };



    const handleDownload = async (chat_id, nickname) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/admin/conversation/${chat_id}/download`, {
                method: 'GET',
                headers: {
                    'Accept': 'text/markdown'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to download conversation.');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = `conversation_${nickname}.md`;
            document.body.appendChild(a); // For Firefox compatibility
            a.click();
            a.remove();

            window.URL.revokeObjectURL(url);
            toast.success("File Downloaded")
        } catch (error) {
            console.error('Download failed:', error);
            toast.error('Failed to download conversation.');
        }
    };


    const handleActivate = async (chat_id) => {

        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/admin/activate-user/${chat_id}`)
            toast.success("Activation message sent to user!")


        } catch (error) {
            toast.error("Something went wrong!")
        }

    }

    // Function to send the image for single user

    const handleSendImage = async (chat_id) => {

        if (!selectedImage) {
            toast.error("Please select an image first")
            return
        }

        const formData = new FormData()
        formData.append("image", selectedImage)
        formData.append("caption", caption)

        try {
            await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/admin/send-image/${chat_id}`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            )
            toast.success("Image sent successfully!")
        } catch (error) {
            toast.error("Failed to send image")
        }
    }


    // Function to broadcast image to all users

    const handleBroadcastImage = async () => {
        if (!selectedImage) {
            toast.error("Please select an image first")
            return
        }

        const formData = new FormData()
        formData.append("image", selectedImage)
        formData.append("caption", caption)

        try {
            await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/admin/send-image-broadcast`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            )
            toast.success("Image sent to all users!")
        } catch (error) {
            toast.error("Broadcast failed")
        }
    }


    const handleReset = () => {
        setSelectedImage(null)
        setCaption("")

        if (fileInputRef.current) {
            fileInputRef.current.value = null
        }
    }



    return (

        <AdminWrapper >
            <h1 className="text-2xl font-bold mb-4">User Management</h1>


            <div className="bg-bg-color shadow rounded-lg overflow-x-auto " >

                <div className="flex gap-4 mb-4 items-center rounded">

                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={(e) => setSelectedImage(e.target.files[0])}
                        className="hidden"
                    />

                    <button
                        onClick={() => fileInputRef.current.click()}
                        className="flex items-center gap-2 px-4 py-2 
                   bg-gray-700 hover:bg-gray-600 
                   text-white rounded 
                   transition duration-300 ease-in-out"
                    >
                        <FaUpload />
                        <span>Upload Image</span>
                    </button>

                    {selectedImage && (
                        <span className="text-sm text-gray-400 truncate max-w-[180px]">
                            {selectedImage.name}
                        </span>
                    )}

                    <input
                        type="text"
                        placeholder="Optional caption"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        className="px-3 py-2 rounded bg-gray-800 text-white flex-1"
                    />

                    <button
                        onClick={handleBroadcastImage}
                        disabled={!selectedImage}
                        className="bg-blue-600 hover:bg-blue-600/70 
                   disabled:bg-gray-600 disabled:cursor-not-allowed
                   transition duration-300 ease-in-out 
                   px-4 py-2 rounded text-white"
                    >
                        Send Image to All
                    </button>

                    <button
                        onClick={handleReset}
                        className="bg-red-600 hover:bg-red-600/70 
                   transition duration-300 ease-in-out 
                   px-4 py-2 rounded text-white"
                    >
                        Reset
                    </button>

                </div>





                <table className="w-full table-auto">
                    <thead className="bg-bg-light3 text-left">
                        <tr>
                            <th className="p-4">#</th>
                            <th className="p-4">Nick Name</th>
                            <th className="p-4">Phone</th>
                            <th className="p-4">Payment Status</th>
                            <th className="p-4">Onboarding Status</th>
                            <th className="p-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, idx) => (
                            <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-800">
                                <td className="p-4">{idx + 1}</td>
                                <td className="p-4">{user.nickname}</td>
                                <td className="p-4">{user.chat_id
                                }</td>
                                <td className="p-4">{user.payment_status
                                }</td>
                                <td className="p-4">{user.payment_status === "waiting" ? "Waiting for activation" : user.onboarding_status
                                }</td>

                                <td className="p-4 flex justify-center gap-4">
                                    <button
                                        onClick={() => handleDownload(user.chat_id, user.nickname)}
                                        className="text-blue-600 hover:text-blue-800"
                                        title="Download Conversation"
                                    >
                                        <FaDownload size={20} className='text-white' />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="text-red-600 hover:text-red-800"
                                        title="Delete User"
                                    >
                                        <FaTrashAlt size={20} />
                                    </button>
                                    {
                                        user.payment_status === "waiting" &&

                                        <button
                                            onClick={() => {
                                                handleActivate(user.chat_id)
                                            }}
                                            className="text-blue-600 hover:text-blue-800"
                                            title="Delete User"
                                        >
                                            <FaRocket size={20} />
                                        </button>
                                    }

                                    <button
                                        onClick={() => handleSendImage(user.chat_id)}
                                        className="text-green-500 hover:text-green-700"
                                        title="Send Image"
                                    >
                                        <FaImages size={20} />
                                    </button>


                                </td>
                            </tr>
                        ))}
                        {users.length === 0 && (
                            <tr>
                                <td colSpan="4" className="text-center p-6 text-gray-500">
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AdminWrapper>
    );
};

export default Users;
