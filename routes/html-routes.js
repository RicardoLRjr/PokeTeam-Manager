// const path = require("path");

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
  app.get("/Pokemon%20Manager", function (req, res){
    res.render("pokemanager");
  });
};