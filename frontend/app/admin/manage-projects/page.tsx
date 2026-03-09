"use client";

import ProjectTable from "@/components/admin/ProjectTable";
import { useRouter } from "next/navigation";

export default function ManageProjectsPage() {
  const router = useRouter();

  return (
    <div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Manage Projects
        </h1>
        
        <button
          onClick={() => router.refresh()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ↻ Refresh
        </button>
      </div>

      <ProjectTable />

    </div>
  );
}