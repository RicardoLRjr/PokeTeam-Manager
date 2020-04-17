// const path = require("path");
// var Pokedex = require("pokedex-promise-v2");
// var P = new Pokedex();
// P.getPokemonByName(1)
//   .then(function(response){
//     console.log(response.sprites.front_default);
//     console.log(response.name);
//     console.log(response.types);
//     console.log(response.abilities[0].ability.name);
//   }).catch(function (error) {
//     console.log("Error", error);
//   });
// function typeDeterminer(){
// array.forEach(response.types => {

// });

var express = require("express");

var router = express.Router();

var db = require("../models");

router.get("/", function(req, res) {
  db.Team.findAll({
    include: [db.Pokemon]
  })
    .then(function(data){
      var teamObject = {
        teams: data
      };
      // console.log(teamObject);
      console.log();
      res.render("index", teamObject);
    }).catch(function (error) {
      console.log("Error", error);
    });
});

router.get("/api/config", function (req, res) {
  res.json({
    success: true,
  });
});

router.get("/editTeam", function (req, res){
  db.Team.findOne({
    include: [db.Pokemon],
    where: {
      id: req.body
    }
  })
    .then(function(dbTeam){
      res.render("editTeam", dbTeam);
    });
});

router.get("/addPokemon", function (req, res){
  res.render("addPokemon");
});

router.get("/addTeam", function (req, res){
  res.render("addTeam");
});

router.get("/editPokemon", function (req, res){
  db.Pokemon.findAll({})
    .then(function(dbTeam){
      res.render("editPokemon", dbTeam);
    });
});

router.get("/viewAllPokemon", function (req, res){
  db.Pokemon.findAll({})
    .then(function(dbTeam){
      res.render("viewAllPokemon", dbTeam);
    });
});

module.exports = function (app) {
  app.use("/", router),
  app.use("/api/router", router),
  app.use("/editTeam", router),
  app.use("/addPokemon", router),
  app.use("/addTeam", router),
  app.use("/editPokemon", router),
  app.use("/viewAllPokemon", router);
};
