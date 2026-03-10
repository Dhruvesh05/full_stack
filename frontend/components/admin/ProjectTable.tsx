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

  const handleManageUpdates = (id: number) => {
    router.push(`/admin/project-updates?id=${id}`);
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
      <div className="bg-white rounded shadow p-6 sm:p-8 text-center">
        <p className="text-gray-600">No projects found. Add your first project!</p>
      </div>
    );
  }

  return (

    <div className="bg-white rounded shadow overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">

          <thead className="bg-gray-50">
            <tr className="border-b">
              <th className="p-3 text-left text-gray-900">ID</th>
              <th className="p-3 text-left text-gray-900">Name</th>
              <th className="p-3 text-left text-gray-900">Type</th>
              <th className="p-3 text-left text-gray-900">Location</th>
              <th className="p-3 text-left text-gray-900">Location Link</th>
              <th className="p-3 text-left text-gray-900">Actions</th>
            </tr>
          </thead>

          <tbody>

            {projects.map((p: Project)=>(
              <tr key={p.id} className="border-b hover:bg-gray-50">

                <td className="p-3 text-gray-900">{p.id}</td>
                <td className="p-3 text-gray-900">{p.name}</td>
                <td className="p-3 text-gray-900">{p.type}</td>
                <td className="p-3 text-gray-900">{p.location}</td>
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
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={()=>handleEdit(p.id)}
                      className="text-blue-600 hover:text-blue-800 font-medium whitespace-nowrap"
                    >
                      Edit
                    </button>
                    <button
                      onClick={()=>handleManageUpdates(p.id)}
                      className="text-green-600 hover:text-green-800 font-medium whitespace-nowrap"
                    >
                      Updates
                    </button>
                    <button
                      onClick={()=>deleteProject(p.id)}
                      className="text-red-600 hover:text-red-800 font-medium whitespace-nowrap"
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

      {/* Mobile Card View */}
      <div className="md:hidden">
        {projects.map((p: Project) => (
          <div key={p.id} className="border-b last:border-b-0 p-4 hover:bg-gray-50">
            <div className="space-y-3">
              <div>
                <span className="text-xs text-gray-500 uppercase">ID</span>
                <p className="text-gray-900 font-medium">{p.id}</p>
              </div>
              
              <div>
                <span className="text-xs text-gray-500 uppercase">Name</span>
                <p className="text-gray-900 font-medium">{p.name}</p>
              </div>
              
              <div>
                <span className="text-xs text-gray-500 uppercase">Type</span>
                <p className="text-gray-900">{p.type}</p>
              </div>
              
              <div>
                <span className="text-xs text-gray-500 uppercase">Location</span>
                <p className="text-gray-900">{p.location}</p>
              </div>
              
              {p.locationLink && (
                <div>
                  <a 
                    href={p.locationLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline text-sm"
                  >
                    View on Map
                  </a>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  onClick={()=>handleEdit(p.id)}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-medium text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={()=>handleManageUpdates(p.id)}
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 font-medium text-sm"
                >
                  Updates
                </button>
                <button
                  onClick={()=>deleteProject(p.id)}
                  className="flex-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 font-medium text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}