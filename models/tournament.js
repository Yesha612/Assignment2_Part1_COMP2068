var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const tournamentSchema = new Schema({
    Tournamentname: {
        type: String,
        required: true
      },
    Discription: {
        type: String,
        required: true
      },
    StartDate: {
      type: Date,
      required: true
    },
    EndDate: {
      type: Date,
      required: true},
    });

const Tournament = mongoose.model('Tournament', tournamentSchema);

module.exports = Tournament;