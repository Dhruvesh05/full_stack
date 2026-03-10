const projectModel = require('../models/projectModel');

// Get all projects
const getAllProjects = async (req, res) => {
  try {
    const projects = projectModel.getAllProjects();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get project by ID
const getProjectById = async (req, res) => {
  try {
    const project = projectModel.getProjectById(parseInt(req.params.id));
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create project
const createProject = async (req, res) => {
  try {
    console.log('Received body:', req.body);
    console.log('Received file:', req.file);
    
    const { name, type, location, locationLink } = req.body;
    
    if (!name || !type || !location) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const projectData = { 
      name, 
      type, 
      location,
      locationLink: locationLink || '',
      image: req.file ? `/uploads/${req.file.filename}` : null
    };

    const newProject = projectModel.createProject(projectData);
    res.status(201).json(newProject);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update project
const updateProject = async (req, res) => {
  try {
    const { name, type, location, locationLink } = req.body;
    
    const updateData = { name, type, location, locationLink: locationLink || '' };
    
    // Add image if new one was uploaded
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }
    
    const updated = projectModel.updateProject(parseInt(req.params.id), updateData);
    
    if (!updated) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.json(updated);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ message: error.message });
  }
};

// Delete project
const deleteProject = async (req, res) => {
  try {
    const deleted = projectModel.deleteProject(parseInt(req.params.id));
    
    if (!deleted) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add update to project
const addProjectUpdate = async (req, res) => {
  try {
    const { title, description } = req.body;
    const projectId = parseInt(req.params.id);
    
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }
    
    const updateData = { title, description };
    const newUpdate = projectModel.addProjectUpdate(projectId, updateData);
    
    if (!newUpdate) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.status(201).json(newUpdate);
  } catch (error) {
    console.error('Error adding update:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get all updates for a project
const getProjectUpdates = async (req, res) => {
  try {
    const projectId = parseInt(req.params.id);
    const updates = projectModel.getProjectUpdates(projectId);
    
    if (updates === null) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.json(updates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete update from project
const deleteProjectUpdate = async (req, res) => {
  try {
    const projectId = parseInt(req.params.id);
    const updateId = parseInt(req.params.updateId);
    
    const deleted = projectModel.deleteProjectUpdate(projectId, updateId);
    
    if (!deleted) {
      return res.status(404).json({ message: 'Update not found' });
    }
    
    res.json({ message: 'Update deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  addProjectUpdate,
  getProjectUpdates,
  deleteProjectUpdate
};
