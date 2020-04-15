DROP DATABASE IF EXISTS pokemon_db;

CREATE DATABASE pokemon_db;

USE pokemon_db;

CREATE TABLE pokemon
(
id INT NOT NULL AUTO_INCREMENT, 
pokedexId INT NOT NULL,
pokemonName VARCHAR(40) NOT NULL,
pokeType1 VARCHAR(50) NOT NULL,
pokeType2 VARCHAR(50), 
abilities VARCHAR (70) NOT NULL,
nickname VARCHAR (50) NOT NULL
PRIMARY KEY (id)
);


CREATE table team
(
id INT NOT NULL AUTO_INCREMENT,
teamName VARCHAR(100) NOT NULL,
PRIMARY KEY(id)
),


CREATE table teamPokemon
(
id INT NOT NULL,
pokemonId INT NOT NULL,
teamId INT NOT NULL, 
PRIMARY KEY (id), 
FOREIGN KEY (pokemonId) REFERENCES pokemon(pokemonId), 
FOREIGN KEY (teamId) REFERENCES team(teamId), 
) 