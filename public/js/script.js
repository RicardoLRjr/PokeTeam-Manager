$(document).ready(function() {

  console.log("Page loaded with script.js");

  $(".addTeam").on("click", function() {
    event.preventDefault();
    if (!$(".teamName").val().trim()) {
      return;
    }
    console.log("You submitted!");
    console.log($(".teamName").val().trim());
    $.post("/api/teams", {teamName: $(".teamName").val().trim()})
      .then(console.log("Submitted a team"));
  });

  $(".addPokemon").on("click", function() {
    event.preventDefault();
    var pokeName = $(".pokemonName").val().trim();
    if (!pokeName) {
      return;
    }
    console.log("You entered a name: " + pokeName);
    $.post("/api/pokemons/" + pokeName
    )
      .then(data => {
        console.log("Submitted a Pokemon");
        console.log(data);
        // Styling card to display pokemon
        $("#pokeSelection").attr("style", "display: block");
        $("#pokeSelection img").attr("src", data.sprites.front_default);
        $("#pokeSelection .card-header-title").text(data.name);
        $("#pokeSelection .card-footer-item:first-child").text(data.id);
        var typeString = "";
        for (let pos of data.types){
          var type = pos.type.name;
          console.log(type);
          typeString += type + ", ";
          console.log(typeString);
        }
        // Taking out the last comma
        typeString.replace(/, $/, "");
        $("#pokeSelection .card-footer-item:last-child").text(typeString);
      });
  });

  $(".editTeam").on("click", function() {
    event.preventDefault();
    if (!$(".teamName").val().trim()) {
      return;
    }
    console.log("You submitted!");
    $.put("/api/teams",
      $(".teamName").val().trim()
    )
      .then(console.log("Submitted a team"));
  });

  $(".editPokemon").on("click", function() {
    event.preventDefault();
    if (!$(".pokemonName").val().trim()) {
      return;
    }
    console.log("You submitted!");
    $.put("/api/pokemons",
      $(".pokemonName").val().trim()
    )
      .then(console.log("Submitted a team"));
  });

  $(".deletePokemon").on("click", function() {
    event.preventDefault();
    if (!$(".pokemonName").val().trim()) {
      return;
    }
    console.log("You submitted!");
    $.delete("/api/pokemons",
      $(".pokemonName").val().trim()
    )
      .then(console.log("Submitted a team"));
  });

  $(".addTeamPage").on("click", function() {
    event.preventDefault();
    window.location.href="/addTeam";
  });

  $(".addPokemonPage").on("click", function() {
    event.preventDefault();
    window.location.href="/addPokemon";
  });

  // $(".deletePokemon").on("click", function() {
  //   event.preventDefault();
  //   if (!$(".pokemonName").val().trim()) {
  //     return;
  //   }
  //   console.log("You submitted!");
  //   $.delete("/api/pokemons",
  //     $(".pokemonName").val().trim()
  //   )
  //     .then(console.log("Submitted a team"));
  // });
});
