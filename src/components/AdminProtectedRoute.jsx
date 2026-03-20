// components/AdminProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { isAdminAuthenticated } from "../utils/auth";

const AdminProtectedRoute = ({ children }) => {
  const isAuth = isAdminAuthenticated();

  if (!isAuth) {
    return <Navigate to="/admin/login" />;
  }

  return children;
};

export default AdminProtectedRoute;