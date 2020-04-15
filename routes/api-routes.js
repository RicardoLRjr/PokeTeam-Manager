// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

//Gets all teams
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
    }).then()
  })

  app.post("/api/teams", function(req, res) {
    db.Team.create({
      teamName: req.body.teamName
    })
      .then(function(dbTeam){
        res.json(dbTeam);
      });
  });
};