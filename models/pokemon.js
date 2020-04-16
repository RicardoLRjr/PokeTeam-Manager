module.exports = function(sequelize, Datatype) {
  const Pokemon = sequelize.define("Pokemon", {
    pokedexId: Datatype.INTEGER,
    pokemonName: Datatype.STRING,
    pokeType1: Datatype.STRING,
    pokeType2: Datatype.STRING,
    abilities: Datatype.STRING,
    nickname: Datatype.STRING,
  });

  Pokemon.associate = function(models) {
    Pokemon.belongsToMany(models.Team, {
      through: "TeamPokemon",
      foreignKey: "pokemonId"
    });
  };
  return Pokemon;
};