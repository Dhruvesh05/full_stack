"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminNavbar() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  return (
    <div className="bg-white shadow p-4 flex justify-between items-center">

      <h1 className="font-semibold text-lg">
        Shubh Construction Admin
      </h1>

      <button 
        onClick={handleLogout}
        className="text-red-600 hover:text-red-800 font-medium"
      >
        Logout
      </button>

    </div>
  );
}