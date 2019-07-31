const Player = require('../../models/player');

exports.createPlayer = async (req, res, next) => {
    const body = req.body;
  
    console.log(body);
  
    const newPlayer = new Player(body);
    const player = await newPlayer.save();
    res.redirect(`/players/${player._id}`);
  };

  // Reading
 // Read all Projects
exports.getPlayers = async (req, res, next) => {
    const players = await Player.find();
    res.render('players/list', { players });
  };
  
  // Read one Project (GET a PROJECT by it's ID)
  exports.getPlayerById = routePath => async (req, res, next) => {
    const id = req.params.id;
    const player = await Player.findById(id);
    console.log(player);
    res.render(routePath, { player }); // Pass found project to details pug view
  };