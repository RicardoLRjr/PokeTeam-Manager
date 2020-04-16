// const path = require("path");
// var Pokedex = require("pokedex-promise-v2");
// var P = new Pokedex();
// P.getPokemonByName(1)
//   .then(function(response){
//     console.log(response.name);
//   });

var express = require("express");

var router = express.Router();

// var pokemon = require("../models/pokemon.js");
var team = require("../models/team.js");
console.log(team);
// var teampokemon = require("../models/teampokemon.js");

router.get("/", function(req, res) {
  // team.all(function(data) {
  //   var poketeams = {
  //     teams: data
  //   };
  //   console.log(poketeams);
  // });
  res.render("index");

});

router.get("/api/config", function (req, res) {
  res.json({
    success: true,
  });
});

router.get("/editTeam", function (req, res){
  res.render("editTeam");
});

router.get("/addPokemon", function (req, res){
  res.render("addPokemon");
});

router.get("/addTeam", function (req, res){
  res.render("addTeam");
});

router.get("/editPokemon", function (req, res){
  res.render("editPokemon");
});

router.get("/viewPokemon", function (req, res){
  res.render("viewAllPokemon");
});

module.exports = function (app) {
  app.use("/", router),
  app.use("/api/router", router),
  app.use("/editTeam", router),
  app.use("/addPokemon", router),
  app.use("/addTeam", router),
  app.use("/editPokemon", router),
  app.use("/viewPokemon", router);
};