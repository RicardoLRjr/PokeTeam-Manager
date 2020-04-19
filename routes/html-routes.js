var express = require("express");

var router = express.Router();

var db = require("../models");

router.get("/", function (req, res) {
  db.Team.findAll({
    include: [db.Pokemon],
  })
    .then(function (data) {
      var teamObject = {
        teams: data,
      };
      // console.log(teamObject);
      // console.log(data);
      res.render("index", teamObject);
    })
    .catch(function (error) {
      console.log("Error", error);
    });
});

router.get("/api/config", function (req, res) {
  res.json({
    success: true,
  });
});

router.get("/addToTeam/:id", function (req, res) {
  var teamId = req.params.id;
  console.log(teamId);
  db.Pokemon.findAll({
    include: [db.Team],
    // where: {
    //   teamId: {
    //     [Op.ne]: req.params.id,
    //   },
    // },
  }).then(function (data) {
    var pokemonObject = {
      pokemons: data,
      teamId: teamId,
    };
    // console.log(pokemonObject);
    // console.log(teamId);
    res.render("addToTeam", pokemonObject);
  });
});

router.get("/addPokemon", function (req, res) {
  res.render("addPokemon");
});

router.get("/addTeam", function (req, res) {
  res.render("addTeam");
});

router.get("/editTeam/:id", function (req, res) {
  teamId = req.params.id;
  db.Team.findOne({
    where: {
      id: teamId,
    },
  }).then((data) => {
    res.render("editTeam", data.dataValues);
  });
});

router.put("/editTeam/:id", function (req, res, next) {
  var teamId = req.params.id;
  db.Team.update(
    {
      teamName: req.body,
    },
    {
      where: {
        id: teamId,
      },
    }
  )
    .then(function (data) {
      res.json(data);
    })
    .catch(next);
});

router.get("/editPokemon/:id", function (req, res) {
  pokemonId = req.params.id;
  db.Pokemon.findOne({
    where: {
      id: pokemonId,
    },
    include: [db.Team],
  }).then(function (data) {
    console.log(data);
    res.render("editPokemon", data.dataValues);
  });
});

router.put("/editPokemon/:id", function (req, res, next) {
  var pokemonId = req.params.id;
  console.log(req.body);
  db.Team.update(
    {
      nickname: req.body
    },
    {
      where: {
        id: pokemonId,
      },
    }
  )
    .then(function (data) {
      res.json(data);
    })
    .catch(next);
});

router.get("/viewAllPokemon", function (req, res) {
  db.Pokemon.findAll({
    include: [db.Team],
  }).then(function (data) {
    var pokemonObject = {
      pokemons: data,
    };
    res.render("viewAllPokemon", pokemonObject);
  });
});

module.exports = function (app) {
  app.use("/", router),
    app.use("/api/config", router),
    app.use("/addToTeam/:id", router),
    app.use("/addPokemon", router),
    app.use("/addTeam", router),
    app.use("/editTeam/:id", router),
    app.use("/editPokemon/:id", router),
    app.use("/viewAllPokemon", router);
};
