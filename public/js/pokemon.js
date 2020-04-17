$(document).ready(function() {
  console.log("Page loaded with pokemon.js");
  $(".editPokemon").on("click", function() {
    event.preventDefault();
    if (!$(".Pokemon").val().trim()) {
      return;
    }
  });
});
