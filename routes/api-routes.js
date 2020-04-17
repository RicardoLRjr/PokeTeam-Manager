// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");
var PokeDex = require("pokedex-promise-v2");
var P = new PokeDex();

//Gets all teams; include needed in order to provide left outer join info
module.exports = function(app) {
  app.get("/api/teams", function(req, res) {
    db.Team.findAll({
      include: [db.Pokemon]
    }).then(function(dbTeam) {
      res.json(dbTeam);
    });
  });

  app.get("/api/teams/:id", function(req, res) {
    db.Team.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Pokemon]
    }).then(function(dbTeam){
      res.json(dbTeam);
    });
  });

  app.post("/api/teams", function(req, res) {
    db.Team.create(req.body)
      .then(function(dbTeam){
        res.json(dbTeam);
      });
  });

  app.delete("/api/teams/:id", function(req, res) {
    db.Team.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbTeam){
      res.json(dbTeam);
    });
  });

  app.put("/api/teams", function(req, res) {
    db.Team.update(
      req.body,
      {
        where: {
          id: req.params.id
        }
      }).then(function(dbTeam){
      res.json(dbTeam);
    });
  });

  app.get("/api/pokemons", function(req, res) {
    db.Pokemon.findAll({
      include: [db.Team]
    }).then(function(dbPokemon){
      res.json(dbPokemon);
    });
  });

  app.get("/api/pokemons/:id", function(req, res) {
    db.Pokemon.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Team]
    }).then(function(dbPokemon){
      res.json(dbPokemon);
    });
  });

  app.post("/api/pokemons", function(req, res) {
    db.Pokemon.create(req.body)
      .then(function(dbPokemon){
        res.json(dbPokemon);
      });
  });

  // Add Pokemon to database with search by name
  app.post("/api/pokemons/:name", function(req, res) {
    var name = req.params.name.toLowerCase();
    P.getPokemonByName(name).then(response => {
      res.json(response).end();
    });
    // db.Pokemon.create(req.body)
    //   .then(function(dbPokemon){
    //     res.json(dbPokemon);
    //   });
  });

  app.delete("/api/pokemons/:id", function(req, res) {
    db.Pokemon.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbPokemon){
      res.json(dbPokemon);
    });
  });

  app.put("/api/pokemons", function(req, res) {
    db.Pokemon.update(
      req.body,
      {
        where: {
          id: req.params.id
        }
      }).then(function(dbPokemon){
      res.json(dbPokemon);
    });
  });

  app.post("/api/teampokemon/:id", function(req, res) {
    db.TeamPokemon.create({ teamID: req.params.id, pokemonID: req.body})
      .then(function(teamPokemon) {
        res.json(teamPokemon);
      });
  });
};
