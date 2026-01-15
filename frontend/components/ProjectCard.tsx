import React from 'react'
import Image from "next/image";
import { MapPin } from "lucide-react";
import AnimateOnScroll from './AnimateOnScroll';


const ProjectCard = () => {
    
    const Projects = [
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

  return (
    <section className="grid grid-cols-1 gap-8 px-4 py-10 md:grid-cols-2 lg:grid-cols-3">
      {Projects.map((item, index) => (
        <AnimateOnScroll direction="up" delay={((index/3)*0.2)} key={index}>
          <div
            className="relative shadow-xl bg-white border-[1] border-gray-400 hover:scale-105 hover:shadow-2xl transition-all duration-300 rounded-xl h-104 overflow-hidden"
            key={index}
          >
            <Image
              src={`/projects_photo/${item.image}`}
              alt={`${item.name} – ${item.type} construction project by Shubh Construction`}
              width={600}
              height={400}
              className="object-cover w-full h-2/3 cursor-pointer"
            />
            <div className="p-6 space-y-2">
              <h3 className="font-bold text-lg">{item.name}</h3>
              <div className="absolute flex space-x-2 items-center bottom-6">
                <MapPin size={24} color="red" />
                <p className="text-gray-500 text-sm">{item.location}</p>
              </div>
            </div>
            <span className="absolute text-white text-sm bg-red-700 rounded-3xl px-2 py-1 top-4 right-4">
              {item.type}
            </span>
          </div>
        </AnimateOnScroll>
      ))}
    </section>
  );
}

export default ProjectCard