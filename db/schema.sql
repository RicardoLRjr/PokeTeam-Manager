DROP DATABASE IF EXISTS pokemon_db;

CREATE DATABASE pokemon_db;

USE pokemon_db;

CREATE TABLE pokemon
(
id INT NOT NULL AUTO_INCREMENT, 
Pokedex_id int not null,
Pokemon_Name VARCHAR(40) not null,
Poke_type VARCHAR(50) not NULL,
Abilities VARCHAR (70) NOT NULL,
Nickname VARCHAR (50) not NULL
);


CREATE table team
(
id int not null AUTO_INCREMENT,
team_name VARCHAR(100) NOT NULL,
),


CREATE table teamPokemon
(
id int not null,
pokemon_id int not null,
team_id int not null
)