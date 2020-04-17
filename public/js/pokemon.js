$(document).ready(function() {
  console.log("Page loaded with pokemon.js");
  $(".editPokemon").on("click", function() {
    event.preventDefault();
    if (!$(".Pokemon").val().trim()) {
      return;
    }
    $.put("/api/pokemons",
      $(".pokemonName").val().trim()
    )
      .then(console.log("Submitted a pokemon to team"));
  });
});