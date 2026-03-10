"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

interface ProjectFormProps {
  projectId?: string;
  initialData?: {
    name: string;
    type: string;
    location: string;
    locationLink?: string;
  };
}

export default function ProjectForm({ projectId, initialData }: ProjectFormProps) {

  const [name, setName] = useState(initialData?.name || "");
  const [type, setType] = useState(initialData?.type || "");
  const [location, setLocation] = useState(initialData?.location || "");
  const [locationLink, setLocationLink] = useState(initialData?.locationLink || "");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("type", type);
      formData.append("location", location);
      formData.append("locationLink", locationLink);

      if (image) formData.append("image", image);

      const url = projectId
        ? `http://localhost:5000/api/projects/${projectId}`
        : "http://localhost:5000/api/projects";

      const method = projectId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to save project' }));
        console.error('Backend error:', errorData);
        throw new Error(errorData.message || "Failed to save project");
      }

      alert(projectId ? "Project Updated Successfully!" : "Project Added Successfully!");
      
      // Clear form if adding new project
      if (!projectId) {
        setName("");
        setType("");
        setLocation("");
        setLocationLink("");
        setImage(null);
        // Reset file input
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
        // Navigate to manage projects to see the new project
        router.push("/admin/manage-projects");
      } else {
        // Navigate back to manage projects if editing
        router.push("/admin/manage-projects");
      }
    } catch (err) {
      setError("Failed to save project. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-2xl bg-white p-4 sm:p-6 rounded-lg shadow"
    >

      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded text-sm sm:text-base">
          {error}
        </div>
      )}

      <div>
        <label className="block mb-2 font-medium text-gray-900 text-sm sm:text-base">Project Name</label>
        <input
          placeholder="Enter project name"
          value={name}
          className="border p-2 sm:p-3 w-full rounded text-gray-900 text-sm sm:text-base"
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block mb-2 font-medium text-gray-900 text-sm sm:text-base">Project Type</label>
        <input
          placeholder="e.g., Residential, Commercial"
          value={type}
          className="border p-2 sm:p-3 w-full rounded text-gray-900 text-sm sm:text-base"
          onChange={(e) => setType(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block mb-2 font-medium text-gray-900 text-sm sm:text-base">Location</label>
        <input
          placeholder="Enter location"
          value={location}
          className="border p-2 sm:p-3 w-full rounded text-gray-900 text-sm sm:text-base"
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block mb-2 font-medium text-gray-900 text-sm sm:text-base">Location Link (Google Maps)</label>
        <input
          type="url"
          placeholder="Enter Google Maps link (optional)"
          value={locationLink}
          className="border p-2 sm:p-3 w-full rounded text-gray-900 text-sm sm:text-base"
          onChange={(e) => setLocationLink(e.target.value)}
        />
        <p className="text-xs text-gray-500 mt-1">Example: https://maps.google.com/?q=Your+Location</p>
      </div>

      <div>
        <label className="block mb-2 font-medium text-gray-900 text-sm sm:text-base">Project Image</label>
        <input
          type="file"
          accept="image/*"
          className="border p-2 w-full rounded text-gray-900 text-sm sm:text-base file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:bg-gray-400 w-full"
      >
        {loading ? "Saving..." : projectId ? "Update Project" : "Save Project"}
      </button>

    </form>
  );
}