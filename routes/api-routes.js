// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");
var PokeDex = require("pokedex-promise-v2");
var P = new PokeDex();

//Gets all teams; include needed in order to provide left outer join info
module.exports = function (app) {
  app.get("/api/teams", function (req, res) {
    db.Team.findAll({
      include: [db.Pokemon],
    }).then(function (dbTeam) {
      res.json(dbTeam);
    });
  });

  app.get("/api/teams/:id", function (req, res) {
    db.Team.findOne({
      where: {
        id: req.params.id,
      },
      include: [db.Pokemon],
    }).then(function (dbTeam) {
      res.json(dbTeam);
    });
  });

  app.post("/api/teams", function (req, res) {
    db.Team.create(req.body).then(function (dbTeam) {
      res.json(dbTeam);
    });
  });

  app.put("/api/teams/:id", function (req, res) {
    db.Team.update(req.body, {
      where: {
        id: req.params.id,
      },
    }).then(function (dbTeam) {
      res.json(dbTeam);
    });
  });

  app.delete("/api/teams/:id", function (req, res) {
    db.Team.destroy({
      where: {
        id: req.params.id,
      },
    }).then(function (dbTeam) {
      res.json(dbTeam);
    });
  });

  app.get("/api/pokemons", function (req, res) {
    db.Pokemon.findAll({
      include: [db.Team],
    }).then(function (dbPokemon) {
      res.json(dbPokemon);
    });
  });

  app.post("/api/pokemons", function (req, res) {
    console.log(req.body.name);
    P.getPokemonByName(req.body.name.toLowerCase())
      .then( async function(response) {
        var pokeType1 = response.types[0].type.name;
        if (response.types[1]) {
          var pokeType2 = response.types[1].type.name;
        }
        var abilities = response.abilities[0].ability.name;
        var nickname = response.name;
        if (response.types[1]) {
          await db.Pokemon.create({
            pokemonSprite: response.sprites.front_default,
            pokedexId: response.id,
            pokemonName: response.name,
            pokeType1: pokeType1.replace(/^./, pokeType1[0].toUpperCase()),
            pokeType2: pokeType2.replace(/^./, pokeType2[0].toUpperCase()),
            abilities: abilities.replace(/^./, abilities[0].toUpperCase()),
            nickname: nickname.replace(/^./, nickname[0].toUpperCase()),
          });
        } else {
          await db.Pokemon.create({
            pokemonSprite: response.sprites.front_default,
            pokedexId: response.id,
            pokemonName: response.name,
            pokeType1: pokeType1.replace(/^./, pokeType1[0].toUpperCase()),
            abilities: abilities.replace(/^./, abilities[0].toUpperCase()),
            nickname: nickname.replace(/^./, nickname[0].toUpperCase()),
          });
        }
      })
      // Currently redirects too fast - doesn't display newly added Pokemon until refresh
      .then(function () {
        res.send();
      })
      .catch((err) => console.log(err));
  });

  app.get("/api/pokemons/:name", function (req, res) {
    var name = req.params.name.toLowerCase();
    function pokemonCard() {
      P.getPokemonByName(name).then((response) => {
        var pokemonName = response.name;
        var nickname = response.name.replace(
          /^./,
          response.name[0].toUpperCase()
        );
        var abilityName = [];
        var ability = [];
        var dexID = response.id;
        var types = [];
        for (var a = 0; a < response.abilities.length; a++) {
          abilityName[a] = { name: response.abilities[a].ability.name };
        }
        for (var t = 0; t < response.types.length; t++) {
          types[t] = response.types[t].type.name.replace(
            /^./,
            response.types[t].type.name[0].toUpperCase()
          );
        }
        async function abDesc(name) {
          await P.getAbilityByName(name.name).then((data) => {
            ability.push({
              name: name.name.replace(/^./, name.name[0].toUpperCase()),
              description: data.effect_entries[0].effect,
            });
          });
        }
        async function abName(abilityName) {
          for (const name of abilityName) {
            await abDesc(name);
          }
        }
        async function abilities(abilityName) {
          await abName(abilityName);
          res.json({
            pokemonName: pokemonName,
            nickname: nickname,
            pokedexId: dexID,
            pokeType1: types[0],
            pokeType2: types[1],
            abilities: ability,
          });
        }
        abilities(abilityName);
      });
    }
    pokemonCard();
  });

  app.put("/api/pokemons/:id", function (req, res) {
    db.Pokemon.update(req.body, {
      where: {
        id: req.params.id,
      },
    }).then(function (dbPokemon) {
      res.json(dbPokemon);
    });
  });

  app.delete("/api/pokemons/:id", function (req, res) {
    db.Pokemon.destroy({
      where: {
        id: req.params.id,
      },
    }).then(function (dbPokemon) {
      res.json(dbPokemon);
    });
  });

  app.get("/api/teampokemon", function (req, res) {
    db.TeamPokemon.findAll({}).then(function (dbPokemon) {
      res.json(dbPokemon);
    });
  });

  app.post("/api/teampokemon", function (req, res) {
    db.TeamPokemon.create({
      teamId: req.body.teamId,
      pokemonId: req.body.pokemonId,
    })
      .then((newEntry) => {
        res.json({
          success: true,
          message: "Successfully added to your collection.",
          data: newEntry,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500);
        res.json({
          success: false,
        });
      });
  });

  app.delete("/api/teampokemon/team/:id", function (req, res) {
    db.TeamPokemon.destroy({
      where: {
        teamId: req.params.id,
      },
    }).then(function (dbTeam) {
      res.json(dbTeam);
    });
  });

  app.delete("/api/teampokemon/pokemon/:id", function (req, res) {
    db.TeamPokemon.destroy({
      where: {
        pokemonId: req.params.id,
      },
    }).then(function (dbTeam) {
      res.json(dbTeam);
    });
  });
};
