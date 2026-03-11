import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Drink from "../pages/Drink";
import Order from "../pages/Order";

export default function Mainrouter() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/drink" element={<Drink />} />
      <Route path="/order" element={<Order />} />
    </Routes>
  );
}
