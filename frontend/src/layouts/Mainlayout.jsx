import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function Mainlayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
