import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const API = `http://localhost:8880/api/auth/me`;
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const initials = user?.name?.charAt(0).toUpperCase() || "U";

  return (
    <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-4 py-2.5 w-fit shadow-sm">
      {user?.avatar ? (
        <img
          src={user.avatar}
          alt="avatar"
          className="w-9 h-9 rounded-full object-cover border border-gray-100"
        />
      ) : (
        <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 font-medium text-sm">
          {initials}
        </div>
      )}
      <div>
        <p className="text-sm font-medium text-gray-800 leading-none">
          Hi, {user?.name || "Guest"}
        </p>
        <p className="text-xs text-gray-400 mt-0.5">Welcome back</p>
      </div>
    </div>
  );
}
