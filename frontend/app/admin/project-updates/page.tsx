import { Suspense } from "react";
import ProjectUpdatesClient from "@/app/admin/project-updates/client";

export default function ProjectUpdatesPage() {
  return (
    <Suspense
      fallback={(
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">Manage Project Updates</h1>
          <div className="text-gray-600">Loading...</div>
        </div>
      )}
    >
      <ProjectUpdatesClient />
    </Suspense>
  );
}
