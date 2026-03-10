const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const upload = require('../middleware/uploadMiddleware');

// Get all projects
router.get('/', projectController.getAllProjects);

// Get single project
router.get('/:id', projectController.getProjectById);

// Create project (with optional image upload)
router.post('/', upload.single('image'), projectController.createProject);

// Update project (with optional image upload)
router.put('/:id', upload.single('image'), projectController.updateProject);

// Delete project
router.delete('/:id', projectController.deleteProject);

// Project Updates Routes
// Add update to project
router.post('/:id/updates', projectController.addProjectUpdate);

// Get all updates for a project
router.get('/:id/updates', projectController.getProjectUpdates);

// Delete update from project
router.delete('/:id/updates/:updateId', projectController.deleteProjectUpdate);

module.exports = router;
