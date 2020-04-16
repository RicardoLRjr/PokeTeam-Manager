$(document).ready(function() {

  $(".createPokemon").on("click", function(event) {
    event.preventDefault();
    if (!".createPokemon".val().trim().trim()) {
      return;
    }

  });

  $(".createTeam").on("click", function(event) {
    event.preventDefault();
    if (!".createTeam".val().trim().trim()) {
      return;
    }
    $.post("/api/teams", {teamName: nameInput.val().trim()})
      .then(getAuthors);
  });






});