import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/admin/login`, {
                email,
                password
            }, { withCredentials: true });  // important for session

            toast.success("Login successfully!");
            console.log("res", res.data)
            window.location.href = "/admin/dashboard";
        } catch (err) {
            toast.error("Invalid Credentials");
            console.log("error", err)
        }
    };

    return (
        <div className='min-h-screen bg-bg-color flex items-center justify-center '>
            <form onSubmit={handleLogin} className='md:w-[450px] md:h-[500px] bg-bg-light3 rounded-lg flex flex-col p-4 border border-gray-400 gap-4 shadow-md'>
                <h1 className='my-4'>Welcome Back Admin!</h1>
                <span className='flex flex-col gap-2  w-full'>
                    <label className='text-lg '>Email</label>
                    <input value={email} onChange={e => setEmail(e.target.value)} className='w-full h-12 p-4 rounded-lg text-gray-200 bg-bg-light2' type="email" placeholder='Enter Your Email' />
                </span>
                <span className='flex flex-col gap-2 w-full'>
                    <label className='text-lg '>Password</label>
                    <input value={password} onChange={e => setPassword(e.target.value)} className='w-full  h-12 p-4 rounded-lg text-gray-200 bg-bg-light2' type="password" placeholder='Enter Your password' />
                </span>
                <button type="submit" className='bg-blue-500 px-6 py-2 rounded-lg w-32 h-12'>Login</button>
            </form>
        </div>
    );
};

export default Login;
