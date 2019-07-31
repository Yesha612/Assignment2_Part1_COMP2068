const Project = require('../../models/project');
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Creating
// Create a new Project
exports.createProject = async (req, res, next) => {
  const body = req.body;

  console.log(body);

  const newProject = new Project(body);
  const project = await newProject.save();
  res.redirect(`/projects/${project._id}`);
};

// Reading
// Read all Projects
exports.getProjects = async (req, res, next) => {
  const projects = await Project.find();
  res.render('projects/list', { projects });
};

// Read one Project (GET a PROJECT by it's ID)
exports.getProjectById = routePath => async (req, res, next) => {
  const id = req.params.id;
  const project = await Project.findById(id);
  console.log(project);
  res.render(routePath, { project }); // Pass found project to details pug view
};

// Updating
// Update a project (UPDATE a PROJECT by it's ID)
exports.updateProjectById = async (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  try {
    const project = await Project.findByIdAndUpdate(id, body, {
      runValidators: true,
      useFindAndModify: true,
      new: true
    });
    res.redirect(`/projects/${project._id}`);
  } catch (e) {
    res.json(e);
  }
};

// Deleting
// Delete a project (BY it's ID)
exports.deleteProjectById = async (req, res, next) => {
  const id = req.params.id;
  await Project.findByIdAndDelete(id);
  res.redirect('/projects');
};