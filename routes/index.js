var express = require('express');
var router = express.Router();
var projects = require('./controllers/projects');
var tournaments = require('./controllers/tournaments');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/projects', projects.getProjects);
router.get('/projects/new', (req, res) => res.render('projects/create'));
router.post('/projects/new', projects.createProject);
router.get('/projects/', projects.getProjectById('projects/login'));
router.get('/projects/:id', projects.getProjectById('projects/details'));
router.get('/projects/:id/edit', projects.getProjectById('projects/edit'));
router.post('/projects/:id/edit', projects.updateProjectById);
router.get('/projects/:id/delete', projects.deleteProjectById);

router.get('/tournaments', tournaments.getProjects);
router.get('/tournaments/create', (req, res) => res.render('tournaments/create'));
router.post('/tournaments/create', tournaments.createProject);
router.get('/tournaments/:id', tournaments.getProjectById('tournaments/details'));

module.exports = router;