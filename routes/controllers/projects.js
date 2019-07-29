const Project = require('../../models/project');
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateLoginInput = require('./projects/login');

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

router.post("/projects/create", (req, res) => {
  // Form validation
const { errors, isValid } = validateRegisterInput(req.body);
// Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
  }
})
});
//login 
router.post("/projects/login", (req, res) => {
  // Form validation
const { errors, isValid } = validateLoginInput(req.body);
// Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
const email = req.body.email;
  const password = req.body.password;
// Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
// Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };
// Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});
module.exports = router;