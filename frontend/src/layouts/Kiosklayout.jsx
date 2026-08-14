import React from "react";
import { Outlet } from "react-router-dom";

export default function Kiosklayout() {
  return (
    <div className="flex h-screen">
      <div className="flex-1 p-6 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
