"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProjectForm from "@/components/admin/ProjectForm";
import { Project } from "@/types/project";

export default function EditProjectPage() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get('id');
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!projectId) {
      setLoading(false);
      return;
    }

    const fetchProject = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/projects/${projectId}`);
        
        if (!res.ok) {
          setError(res.status === 404 ? "Project not found" : "Failed to load project");
          setLoading(false);
          return;
        }
        
        const data = await res.json();
        setProject(data);
      } catch (error) {
        console.error("Failed to fetch project:", error);
        setError("Failed to load project. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">Edit Project</h1>
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!projectId || error || !project) {
    return (
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">Edit Project</h1>
        <div className="bg-red-100 text-red-600 p-4 rounded mb-4">
          {error || "Project not found. Please select a project to edit."}
        </div>
        <a 
          href="/admin/manage-projects"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          ← Back to Manage Projects
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">

      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">
        Edit Project
      </h1>

      <ProjectForm 
        projectId={projectId}
        initialData={{
          name: project.name,
          type: project.type,
          location: project.location,
          locationLink: project.locationLink
        }}
      />

    </div>
  );
}