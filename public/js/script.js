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
    $.post("/api/pokemons/" + pokeName)
      .then(data => {
        console.log("Submitted a Pokemon");
        console.log(data);
        // Getting the abilities
        async function getAbilities(jqobj){
          for (let items of data.abilities){
            var str = "";
            var paragraph = $("<p>");
            str += items.ability.name;
            await $.get(items.ability.url, data => {
              console.log(data);
              str += `: ${data.effect_entries[0].effect}\n`;
            });
            console.log(str);
            paragraph.text(str);
            jqobj.append(paragraph);
          }
        }

        // Styling card to display pokemon
        $("#pokeSelection").attr("style", "display: block");
        $("#pokeSelection img").attr("src", data.sprites.front_default);
        $("#pokeSelection .card-content").empty();
        getAbilities($("#pokeSelection .card-content"));
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

  $(".savePokemon").on("click", function() {
    event.preventDefault();
    if (!$(".pokemonName").val().trim()) {
      return;
    }
    $.post("/api/pokemons/", {name: $(".pokemonName").val().trim()});
  });


  // $(".addToTeam").on("click", function(){
  //   event.preventDefault();
  //   if (!$(".pokemonName").val().trim()) {
  //     return;
  //   }
  //   console.log("You added this pokemon to a team!");
  //   $.put("api/teams",
  //   $.teamname).val().trim())
  // });

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