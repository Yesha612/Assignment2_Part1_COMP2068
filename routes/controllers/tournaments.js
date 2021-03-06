const Tournament = require('../../models/tournament');

// Creating
// Create a new Tournament
exports.createProject = async (req, res, next) => {
  const body = req.body;

  console.log(body);

  const newProject = new Tournament(body);
  const project = await newProject.save();
  res.redirect(`/tournaments/${project._id}`);
};

// Reading
// Read all Projects
exports.getProjects = async (req, res, next) => {
  const projects = await Tournament.find();
  res.render('tournaments/list', { projects });
};

// Read one Tournament (GET a PROJECT by it's ID)
exports.getProjectById = routePath => async (req, res, next) => {
  const id = req.params.id;
  const project = await Tournament.findById(id);
  console.log(project);
  res.render(routePath, { project }); // Pass found project to details pug view
};

// Updating
// Update a project (UPDATE a PROJECT by it's ID)
exports.updateProjectById = async (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  try {
    const tournament = await Tournament.findByIdAndUpdate(id, body, {
      runValidators: true,
      useFindAndModify: true,
      new: true
    });
    res.redirect(`/tournaments/${tournament._id}`);
  } catch (e) {
    res.json(e);
  }
};

// Deleting
// Delete a project (BY it's ID)
exports.deleteProjectById = async (req, res, next) => {
  const id = req.params.id;
  await Tournament.findByIdAndDelete(id);
  res.redirect('/tournaments');
};
