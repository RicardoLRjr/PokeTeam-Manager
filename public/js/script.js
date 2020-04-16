$(document).ready(function() {

  console.log("Page loaded with script.js")
  // $(".createPokemon").on("click", function(event) {
  //   event.preventDefault();
  //   if (!".createPokemon".val().trim().trim()) {
  //     return;
  //   }

  // });

  $("#addTeam").on("click", function() {
    event.preventDefault(); 
    if (!$(".teamName").val().trim().trim()) {
      return;
    }
    console.log("You submitted!")
    $.post("/api/teams", {teamName: $(".teamName").val().trim()})
    .then(console.log("Submitted a team"));
  })






});