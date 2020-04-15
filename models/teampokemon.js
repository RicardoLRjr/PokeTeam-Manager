module.exports = function(sequelize, Datatype) {
  const TeamPokemon = sequelize.define("TeamPokemon", {
    teamId: Datatype.INTEGER,
    pokemonId: Datatype.INTEGER,
  },
  {timestamps: false}
  );
  return TeamPokemon;
};