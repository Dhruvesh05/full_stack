import React from 'react'
import Image from "next/image";



const ProjectCard = () => {
    
    const Projects = [
  {
    image: "Abbott Crane Foundation Work.jpg",
    name: "Abbott Crane Foundation Work",
    type: "Industrial Project",
    description: ""
  },
  {
    image: "Abbott Crane Foundation.jpg",
    name: "Abbott Crane Foundation",
    type: "Industrial Project",
    description: ""
  },
  {
    image: "Abbott Slab Work.JPG",
    name: "Abbott Slab Work",
    type: "Industrial Project",
    description: ""
  },
  {
    image: "Abbott Canola Work.png",
    name: "Abbott Canola Work",
    type: "Industrial Project",
    description: ""
  },
  {
    image: "Birla Cellulose Slab Casting Work.jpg",
    name: "Birla Cellulose Slab Casting Work",
    type: "Industrial Project",
    description: ""
  },
  {
    image: "Birla Cellulose Slab Casting.jpg",
    name: "Birla Cellulose Slab Casting",
    type: "Industrial Project",
    description: ""
  },
  {
    image: "Birla Cellulose.jpg",
    name: "Birla Cellulose",
    type: "Industrial Project",
    description: ""
  },
  {
    image: "Deramic Painting work.jpg",
    name: "Deramic Painting work",
    type: "Industrial Project",
    description: ""
  },
  {
    image: "Elantas RCC Road work.jpg",
    name: "Elantas RCC Road work",
    type: "Industrial Project",
    description: ""
  },
  {
    image: "Elantas Back ETP Work.jpg",
    name: "Elantas Back ETP Work",
    type: "Industrial Project",
    description: ""
  },
  {
    image: "Elantas Slab Work.JPG",
    name: "Elantas Slab Work",
    type: "Industrial Project",
    description: ""
  },
  {
    image: "ETP & MEE.jpg",
    name: "ETP & MEE",
    type: "Industrial Project",
    description: ""
  },
  {
    image: "Foundation Bolt Fixing at Reliance.jpg",
    name: "Foundation Bolt Fixing at Reliance",
    type: "Industrial Project",
    description: ""
  },
  {
    image: "Godrej machine foundation Steel work.jpg",
    name: "Godrej machine foundation Steel work",
    type: "Industrial Project",
    description: ""
  },
  {
    image: "Godrej Road Work.jpg",
    name: "Godrej Road Work",
    type: "Industrial Project",
    description: ""
  },
  {
    image: "Lab Building.jpg",
    name: "Lab Building",
    type: "Industrial Project",
    description: ""
  },
  {
    image: "MG Motors Precast Drain Work.jpg",
    name: "MG Motors Precast Drain Work",
    type: "Industrial Project",
    description: ""
  },
  {
    image: "Nerolac ETP Work.jpg",
    name: "Nerolac ETP Work",
    type: "Industrial Project",
    description: ""
  },
  {
    image: "Reliance Scrubber Absorber Tower Foundation.jpg",
    name: "Reliance Scrubber Absorber Tower Foundation",
    type: "Industrial Project",
    description: ""
  },
  {
    image: "Reliance scrubber foundation.jpg",
    name: "Reliance scrubber foundation",
    type: "Industrial Project",
    description: ""
  },
  {
    image: "Scaffolding Training.jpg",
    name: "Scaffolding Training",
    type: "Industrial Project",
    description: ""
  }
];

  return (
    <section className="grid grid-cols-1 gap-8 px-4 py-12 md:grid-cols-2 lg:grid-cols-3">
        {Projects.map((item,index)=>(
            <div className="relative shadow-xl bg-white border-[1] border-gray-300 hover:scale-105 hover:shadow-2xl transition-all duration-300 rounded-xl h-120 overflow-hidden" key={index}>
            <Image
  src={`/projects_photo/${item.image}`}
  alt={`${item.name} – ${item.type} construction project by Shubh Construction`}
  width={600}
  height={400}
  className="object-cover w-full h-2/3"
/>
            <div className="p-6 space-y-4">
            <h3 className="font-bold text-xl">
                {item.name}
            </h3>
            <p  className="text-gray-500 text-sm">{item.description}</p>
            </div>
            <span className="absolute text-white text-sm bg-red-700 rounded-3xl px-2 py-1 top-4 right-4">{item.type}</span>
            </div>
        ))}
    </section>
  )
}

export default ProjectCard