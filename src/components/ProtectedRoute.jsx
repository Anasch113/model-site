// ProtectedRoute.jsx
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
    const [authorized, setAuthorized] = useState(null);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_SERVER_URL}/admin/protected`, {
            withCredentials: true,
        }).then(() => {
            setAuthorized(true);
            
        }).catch(() => {
            setAuthorized(false);
        });
    }, []);

    if (authorized === null) return <div>Loading...</div>;
    if (!authorized) return <Navigate to="/admin/login" />;

    return children;
};

export default ProtectedRoute;
