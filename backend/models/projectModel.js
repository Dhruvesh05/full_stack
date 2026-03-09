// In-memory storage for projects (replace with database later)
let projects = [
  {
    id: 1,
    name: "Luxury Villa",
    type: "Residential",
    location: "Mumbai",
    locationLink: "https://maps.google.com/?q=Mumbai",
    image: null,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    name: "Shopping Complex",
    type: "Commercial",
    location: "Delhi",
    locationLink: "https://maps.google.com/?q=Delhi",
    image: null,
    createdAt: new Date().toISOString()
  }
];

let nextId = 3;

// Get all projects
const getAllProjects = () => {
  return projects;
};

// Get project by ID
const getProjectById = (id) => {
  return projects.find(p => p.id === id);
};

// Create project
const createProject = (projectData) => {
  const newProject = {
    id: nextId++,
    ...projectData,
    createdAt: new Date().toISOString()
  };
  projects.push(newProject);
  return newProject;
};

// Update project
const updateProject = (id, projectData) => {
  const index = projects.findIndex(p => p.id === id);
  if (index === -1) return null;
  
  projects[index] = {
    ...projects[index],
    ...projectData,
    updatedAt: new Date().toISOString()
  };
  
  return projects[index];
};

// Delete project
const deleteProject = (id) => {
  const index = projects.findIndex(p => p.id === id);
  if (index === -1) return null;
  
  const deleted = projects[index];
  projects.splice(index, 1);
  return deleted;
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};
