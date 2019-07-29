// Project.js
// Schema/Model for Projects

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const projectSchema = new Schema({
  Name: {
    type: String,
    required: true
  },
  Password: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  
});


const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
