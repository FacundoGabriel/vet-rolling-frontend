import { Navigate } from "react-router-dom";

const RutasProtegidas = ({ children, rolesPermitidos = [] }) => {
  const token = sessionStorage.getItem("token");
  const rol = JSON.parse(sessionStorage.getItem("rol") || "null");

  if (!token) return <Navigate to="/login" />;


  if (rolesPermitidos.length > 0 && !rolesPermitidos.includes(rol)) {
    if (rol === "admin") return <Navigate to="/admin" />;
    if (rol === "veterinario") return <Navigate to="/administrar-turnos" />;
    return <Navigate to="/user" />;
  }

  return children;
};

export default RutasProtegidas;