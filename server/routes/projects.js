const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// GET /api/projects — fetch all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ index: 1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST /api/projects — add a new project
router.post('/', async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ message: 'Bad request', error: err.message });
  }
});

module.exports = router;