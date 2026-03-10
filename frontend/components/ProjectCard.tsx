"use client";

import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { MapPin } from "lucide-react";
import AnimateOnScroll from './AnimateOnScroll';
import ProjectDetailModal from './ProjectDetailModal';
import { Project as ProjectType } from '@/types/project';

interface Project {
  id?: number;
  image: string | null;
  name: string;
  type: string;
  location: string;
  locationLink?: string;
}

const ProjectCard = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleProjectClick = (project: Project) => {
      // Convert to ProjectType if it has an id
      if (project.id) {
        setSelectedProject({
          id: project.id,
          name: project.name,
          type: project.type,
          location: project.location,
          locationLink: project.locationLink,
          image: project.image || undefined,
        });
      }
      setIsModalOpen(true);
    };

    const handleCloseModal = () => {
      setIsModalOpen(false);
      setTimeout(() => setSelectedProject(null), 300); // Clear after animation
    };

    // Hardcoded existing projects
    const existingProjects: Project[] = [
      {
        image: "Abbott Crane Foundation Work.jpg",
        name: "Abbott Crane Foundation Steel Binding Work",
        type: "Industrial Project",
        location: "Abbott, Jhagadia, Gujarat",
      },
      {
        image: "Abbott Crane Foundation.jpg",
        name: "Abbott Crane Foundation Concrete Work",
        type: "Industrial Project",
        location: "Abbott, Jhagadia, Gujarat",
      },
      {
        image: "Abbott Slab Work.JPG",
        name: "Abbott Canola Slab Work",
        type: "Industrial Project",
        location: "Abbott, Jhagadia, Gujarat",
      },
      {
        image: "Abbott Canola Work.png",
        name: "Abbott Canola Final Work",
        type: "Industrial Project",
        location: "Abbott, Jhagadia, Gujarat",
      },
      {
        image: "Birla Cellulose Slab Casting Work.jpg",
        name: "Birla Cellulose Slab Casting work",
        type: "Industrial Project",
        location: "Kharach, Gujarat",
      },
      {
        image: "Birla Cellulose.jpg",
        name: "Birla Cellulose Canteen work",
        type: "Industrial Project",
        location: "Kharach, Gujarat",
      },
      {
        image: "Deramic Painting work.jpg",
        name: "Deramic Admin Building Painting work",
        type: "Industrial Project",
        location: "Dahej, Gujarat",
      },
      {
        image: "Elantas RCC Road work.jpg",
        name: "Elantas Back RCC Road work",
        type: "Industrial Project",
        location: "Ankleshwar, Gujarat",
      },
      {
        image: "Elantas Back ETP Work.jpg",
        name: "Elantas Back ETP Final work",
        type: "Industrial Project",
        location: "Ankleshwar, Gujarat",
      },
      {
        image: "Elantas Slab Work.JPG",
        name: "Elantas Back Slab Shuttering and Steel work",
        type: "Industrial Project",
        location: "Ankleshwar, Gujarat",
      },
      {
        image: "ETP & MEE.jpg",
        name: "ETP & MEE",
        type: "Industrial Project",
        location: "Dahej, Gujarat",
      },
      {
        image: "Foundation Bolt Fixing at Reliance.jpg",
        name: "Scrubber Foundation Bolt Fixing at Reliance",
        type: "Industrial Project",
        location: "Reliance, Dahej, Gujarat",
      },
      {
        image: "Godrej Road Work.jpg",
        name: "Godrej Bitumen Road work",
        type: "Industrial Project",
        location: "Dahej, Gujarat",
      },
      {
        image: "Lab Building.jpg",
        name: "Lab Building",
        type: "Industrial Project",
        location: "Dahej, Gujarat",
      },
      {
        image: "MG Motors Precast Drain Work.jpg",
        name: "MG Motors Precast Drain work",
        type: "Industrial Project",
        location: "Halol, Gujarat",
      },
      {
        image: "Nerolac ETP Work.jpg",
        name: "Nerolac ETP work",
        type: "Industrial Project",
        location: "Vilayat, Gujarat",
      },
      {
        image: "Reliance scrubber foundation.jpg",
        name: "Reliance Scrubber Foundation Concrete work",
        type: "Industrial Project",
        location: "Reliance, Dahej, Gujarat",
      },
      {
        image: "Scaffolding Training.jpg",
        name: "Scaffolding Training",
        type: "Industrial Project",
        location: "Birla Cellulose, Kharach, Gujarat",
      },
      {
        image: "DM N pit Raft casting.jpeg",
        name: "DM N pit Raft casting",
        type: "Industrial Project",
        location: "Reliance, Dahej, Gujarat",
      },
      {
        image: "DM plant work pooja.jpeg",
        name: "DM plant work pooja",
        type: "Industrial Project",
        location: "Reliance, Dahej, Gujarat",
      },
      {
        image: "Utility Building.jpeg",
        name: "Utility Building",
        type: "Industrial Project",
        location: "Vital Synthesis Company, Dahej, Gujarat",
      },
      {
        image: "Bullet.jpeg",
        name: "Bullet Foundation Work",
        type: "Industrial Project",
        location: "Reliance VMD, Vadodara, Gujarat",
      },
      {
        image: "N-pit_casting_Wall.jpeg",
        name: "N Pit wall casting",
        type: "Industrial Project",
        location: "Reliance, Dahej, Gujarat",
      },
      {
        image: "CA_flacker.jpeg",
        name: "CA flacker Ware house Renovation work",
        type: "Renovation Project",
        location: "Vital Synthesis Company, Dahej, Gujarat",
      },
      {
        image: "Clarification_Tank_20mt_Dia.jpeg",
        name: "Clarification Tank 20mt Dia at Reliance VMD Baroda",
        type: "Industrial Project",
        location: "Reliance VMD, Vadodara, Gujarat",
      },
      {
        image: "Vital_Synthesis_Plant_Building.jpeg",
        name: "Vital Synthesis Plant Building work",
        type: "Industrial Project",
        location: "Dahej, Gujarat",
      },
      {
        image: "Vital_Synthesis_Road_work.jpeg",
        name: "Vital Synthesis Road work",
        type: "Industrial Project",
        location: "Vital, Dahej, Gujarat",
      },
      {
        image: "Vital_Road,Building,Compound_wall.jpeg",
        name: "Vital Synthesis Road work, Plant Building work, Compound wall work",
        type: "Industrial Project",
        location: "Vital, Dahej, Gujarat",
      },
      {
        image: "Plate_load_Test_Checking.jpeg",
        name: "Plate Load Test Checking of Reliance client ",
        type: "Industrial Project",
        location: "Reliance, Dahej, Gujarat",
      },
    ];

    useEffect(() => {
      const fetchProjects = async () => {
        try {
          const res = await fetch("http://localhost:5000/api/projects");
          const apiProjects = await res.json();
          
          // Merge API projects with existing hardcoded projects
          const mergedProjects = [
            ...apiProjects.map((p: Project & { id: number }) => ({
              id: p.id,
              image: p.image || null, // Keep null if no image
              name: p.name,
              type: p.type,
              location: p.location,
              locationLink: p.locationLink, // Include location link from API
            })),
            ...existingProjects
          ];
          
          setProjects(mergedProjects);
        } catch (error) {
          console.error("Failed to fetch projects:", error);
          // If API fails, show existing projects
          setProjects(existingProjects);
        } finally {
          setLoading(false);
        }
      };

      fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) {
      return (
        <section className="grid grid-cols-1 gap-8 px-4 py-10 md:grid-cols-2 lg:grid-cols-3">
          <div className="text-center col-span-full text-gray-500">
            Loading projects...
          </div>
        </section>
      );
    }

  return (
    <>
      <section className="grid grid-cols-1 gap-8 px-4 py-10 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((item, index) => (
          <AnimateOnScroll direction="up" delay={(index % 3) * 0.2} key={item.id || `project-${index}`}>
            <div
              onClick={() => handleProjectClick(item)}
              className="relative shadow-xl bg-white border-[1] border-gray-400 hover:scale-105 hover:shadow-2xl transition-all duration-300 rounded-xl h-104 overflow-hidden cursor-pointer"
            >
              <Image
                src={
                  item.id && item.image
                    ? `http://localhost:5000${item.image}` 
                    : item.image
                    ? `/projects_photo/${item.image}`
                    : `/projects_photo/Abbott Canola Work.png`
                }
                alt={`${item.name} – ${item.type} construction project by Shubh Construction`}
                width={600}
                height={400}
                className="object-cover w-full h-2/3 cursor-pointer"
                unoptimized={item.id ? true : false}
              />
              <div className="p-6 space-y-2">
                <h3 className="font-bold dark:text-gray-900 text-lg">
                  {item.name}
                </h3>
                <div className="absolute flex space-x-2 items-center bottom-6">
                  <MapPin size={24} color="red" />
                  {item.locationLink ? (
                    <a
                      href={item.locationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-blue-600 hover:text-blue-800 text-sm underline cursor-pointer"
                    >
                      {item.location}
                    </a>
                  ) : (
                    <p className="text-gray-500 text-sm">{item.location}</p>
                  )}
                </div>
              </div>
              <span className="absolute text-white text-sm bg-red-700 rounded-3xl px-2 py-1 top-4 right-4">
                {item.type}
              </span>
            </div>
          </AnimateOnScroll>
        ))}
      </section>

      {/* Project Detail Modal */}
      <ProjectDetailModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}

export default ProjectCard