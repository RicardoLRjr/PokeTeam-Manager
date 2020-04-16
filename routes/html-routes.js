// const path = require("path");
var Pokedex = require("pokedex-promise-v2");
var P = new Pokedex();
console.log(P);

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.render("index");
  });
  app.get("/api/config", function (req, res) {
    res.json({
      success: true,
    });
  });
  app.get("/Team%20Manager", function (req, res){
    res.render("teamManager");
  });
  app.get("/addPokemon", function (req, res){
    res.render("pokemanager");
  });
  app.get("/addTeam", function (req, res){
    res.render("addTeam");
  });
};