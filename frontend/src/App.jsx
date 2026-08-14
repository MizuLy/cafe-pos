import ProtectedRoute from "./protectedRoute/ProtectedRoute";
import Authlayout from "./layouts/Authlayout";
import Mainlayout from "./layouts/Mainlayout";
import Kiosklayout from "./layouts/Kiosklayout";

import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Logout from "./pages/auth/Logout";

import Dashboard from "./pages/Dashboard";
import Drink from "./pages/Drink";
import Order from "./pages/Order";
import KioskMenu from "./pages/kiosk/Menu";

export default function App() {
  return (
    <Routes>
      <Route element={<Authlayout />}>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
      </Route>

      <Route
        element={
          <ProtectedRoute>
            <Mainlayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/drink" element={<Drink />} />
        <Route path="/order" element={<Order />} />
      </Route>

      <Route element={<Kiosklayout />}>
        <Route path="/kiosk" element={<KioskMenu />} />
      </Route>
    </Routes>
  );
}
