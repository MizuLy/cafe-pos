import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const users = localStorage.getItem("user");

  return users ? children : <Navigate to={"/"} />;
}
