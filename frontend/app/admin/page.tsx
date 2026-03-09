"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const [projectCount, setProjectCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/projects");
        const data = await res.json();
        setProjectCount(data.length || 0);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>

      <div className="mb-8 bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">Quick Stats</h2>
        <div className="text-3xl font-bold text-red-600">
          {loading ? "..." : projectCount}
        </div>
        <div className="text-gray-600">Total Projects</div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>

      <div className="grid md:grid-cols-3 gap-6">

        <Link
          href="/admin/add-project"
          className="bg-red-600 text-white p-6 rounded-xl text-center hover:bg-red-700 transition-colors"
        >
          <div className="text-2xl mb-2">➕</div>
          <div className="font-semibold">Add Project</div>
        </Link>

        <Link
          href="/admin/manage-projects"
          className="bg-blue-600 text-white p-6 rounded-xl text-center hover:bg-blue-700 transition-colors"
        >
          <div className="text-2xl mb-2">📋</div>
          <div className="font-semibold">Manage Projects</div>
        </Link>

        <Link
          href="/admin/uploads"
          className="bg-green-600 text-white p-6 rounded-xl text-center hover:bg-green-700 transition-colors"
        >
          <div className="text-2xl mb-2">📤</div>
          <div className="font-semibold">Upload Site Images</div>
        </Link>

      </div>

    </div>
  );
}