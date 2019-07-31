var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const playerSchema = new Schema({
    Playername: {
      type: String,
      required: true
    },
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;