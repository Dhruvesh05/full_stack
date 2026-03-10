"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, MapPin, Calendar } from "lucide-react";
import { Project, ProjectUpdate } from "@/types/project";

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectDetailModal({ project, isOpen, onClose }: ProjectDetailModalProps) {
  const [updates, setUpdates] = useState<ProjectUpdate[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUpdates = async () => {
    if (!project?.id) return;
    
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/projects/${project.id}/updates`);
      if (response.ok) {
        const data = await response.json();
        setUpdates(Array.isArray(data) ? data : []);
      } else {
        console.error('Failed to fetch updates:', response.statusText);
        setUpdates([]);
      }
    } catch (error) {
      console.error("Failed to fetch updates:", error);
      setUpdates([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && project?.id) {
      fetchUpdates();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, project?.id]);

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 overflow-y-auto">
      <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          <X size={24} className="text-gray-700" />
        </button>

        {/* Project Image */}
        <div className="relative h-64 sm:h-80 w-full">
          <Image
            src={
              project.id && project.image
                ? `http://localhost:5000${project.image}` 
                : project.image
                ? `/projects_photo/${project.image}`
                : `/projects_photo/Abbott Canola Work.png`
            }
            alt={project.name}
            fill
            className="object-cover"
            unoptimized={project.id ? true : false}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <span className="inline-block bg-red-600 text-white text-sm px-3 py-1 rounded-full mb-2">
              {project.type}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              {project.name}
            </h2>
          </div>
        </div>

        {/* Project Details */}
        <div className="p-6 sm:p-8">
          
          {/* Location */}
          <div className="flex items-start gap-2 mb-6">
            <MapPin size={24} className="text-red-600 shrink-0 mt-1" />
            <div>
              {project.locationLink ? (
                <a
                  href={project.locationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline text-lg"
                >
                  {project.location}
                </a>
              ) : (
                <p className="text-gray-700 text-lg">{project.location}</p>
              )}
            </div>
          </div>

          {/* Divider */}
          <hr className="my-6" />

          {/* Progress Updates Section */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              Progress Updates
            </h3>

            {loading ? (
              <div className="text-center py-8 text-gray-500">
                Loading updates...
              </div>
            ) : updates.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  No progress updates available yet for this project.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {updates.map((update, index) => (
                  <div
                    key={update.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-gray-50"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                      <h4 className="text-lg font-semibold text-gray-900">
                        {update.title}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar size={16} />
                        <span>{new Date(update.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                      {update.description}
                    </p>
                    {index < updates.length - 1 && (
                      <div className="mt-4 border-b border-gray-200" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Close Button at Bottom */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={onClose}
              className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
