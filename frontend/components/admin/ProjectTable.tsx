"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Project } from "@/types/project";

export default function ProjectTable(){

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(()=>{
    const fetchProjects = async ()=>{

      try {
        const res = await fetch(
          "http://localhost:5000/api/projects"
        );

        const data = await res.json();

        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  },[]);

  const deleteProject = async(id:number)=>{

    if (!confirm("Are you sure you want to delete this project?")) {
      return;
    }

    try {
      await fetch(
        `http://localhost:5000/api/projects/${id}`,
        {method:"DELETE"}
      );

      // Refresh the projects list
      const res = await fetch("http://localhost:5000/api/projects");
      const data = await res.json();
      setProjects(data);
      
      alert("Project deleted successfully!");
    } catch (error) {
      console.error("Failed to delete project:", error);
      alert("Failed to delete project. Please try again.");
    }
  };

  const handleEdit = (id: number) => {
    router.push(`/admin/edit-project?id=${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-gray-600">Loading projects...</div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="bg-white rounded shadow p-8 text-center">
        <p className="text-gray-600">No projects found. Add your first project!</p>
      </div>
    );
  }

  return (

    <div className="overflow-x-auto">
      <table className="w-full bg-white shadow rounded">

        <thead className="bg-gray-50">
          <tr className="border-b">
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Type</th>
            <th className="p-3 text-left">Location</th>
            <th className="p-3 text-left">Location Link</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>

          {projects.map((p: Project)=>(
            <tr key={p.id} className="border-b hover:bg-gray-50">

              <td className="p-3">{p.id}</td>
              <td className="p-3">{p.name}</td>
              <td className="p-3">{p.type}</td>
              <td className="p-3">{p.location}</td>
              <td className="p-3">
                {p.locationLink ? (
                  <a 
                    href={p.locationLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    View Map
                  </a>
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </td>

              <td className="p-3">
                <div className="flex gap-2">
                  <button
                    onClick={()=>handleEdit(p.id)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={()=>deleteProject(p.id)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Delete
                  </button>
                </div>
              </td>

            </tr>
          ))}

        </tbody>

      </table>
    </div>
  );
}