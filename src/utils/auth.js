// utils/auth.js
export const getAdminRole = () => {
  return localStorage.getItem("admin_role");
};

export const isAdminAuthenticated = () => {
  return localStorage.getItem("admin_authenticated") === "true";
};