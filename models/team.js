module.exports = function(sequelize, Datatype) {
  const Team = sequelize.define("Team", {
    teamName: Datatype.STRING,
  });

  Team.associate = function(models) {
    Team.belongsToMany(models.Pokemon, {
      through: "TeamPokemon",
      foreignKey: "teamId"
    });
  };
  return Team;
};
