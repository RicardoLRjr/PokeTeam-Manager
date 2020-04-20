$(document).ready(function () {
  console.log("Page loaded with script.js");

  $(".addTeam").on("click", function () {
    event.preventDefault();
    if (!$(".teamName").val().trim()) {
      return;
    }
    console.log("You submitted!");
    console.log($(".teamName").val().trim());
    $.post("/api/teams", { teamName: $(".teamName").val().trim() }).then(
      function () {
        document.location.href = "/";
      }
    );
  });

  $(".previewPokemon").on("click", function () {
    event.preventDefault();
    var pokeName = $(".pokemonName").val().trim();
    if (!pokeName) {
      return;
    }
    $.get("/api/pokemons/" + pokeName).then((data) => {
      console.log(data);
      $("#pokeSelection").attr("style", "display: block");
      $("#pokeSelection img").attr(
        "src",
        "https://img.pokemondb.net/artwork/vector/" + data.pokemonName + ".png"
      );
      $("#pokeSelection img").attr("alt", "image of a " + data.nickname);
      async function getAbilities(jqobj) {
        for (let items of data.abilities) {
          var str = "";
          var paragraph = $("<p class='bottomPadding'>");
          str += `<strong>${items.name}: </strong>${items.description}`;
          console.log(str);
          paragraph.html(str);
          jqobj.append(paragraph);
        }
      }
      $("#pokeSelection .card-content").empty();
      $("#pokeSelection .card-content").html(
        "<h3 class='viewPokemon align bottomMargin'><strong>Abilities</strong></h3>"
      );
      getAbilities($("#pokeSelection .card-content"));
      $("#pokeSelection .name").text(data.nickname);
      $("#pokeSelection .pokeID").text("Pokedex ID: " + data.pokedexId);
      if (data.pokeType2) {
        $("#pokeSelection .typePreview").text(
          data.pokeType1 + "/" + data.pokeType2
        );
      } else {
        $("#pokeSelection .typePreview").text(data.pokeType1);
      }
    });
  });

  $(".savePokemon").on("click", function () {
    event.preventDefault();
    if (!$(".pokemonName").val().trim()) {
      return;
    }
    $.post("/api/pokemons/", { name: $(".pokemonName").val().trim() }).then(
      () => {
        document.location.href = "/viewAllPokemon";
      }
    );
  });

  $(".addPokemonToTeam").on("click", function () {
    event.preventDefault();
    teamId = $(this).data("id");
    document.location.href = "/addToTeam/" + teamId;
  });

  $(".addToTeam").on("click", function () {
    event.preventDefault();
    var teamId = $(this).data("teamid");
    var pokemonId = $(this).data("id");
    var data = {
      teamId: teamId,
      pokemonId: pokemonId,
    };
    console.log(data);
    $.post("/api/teampokemon", { teamId: teamId, pokemonId: pokemonId }).then(
      function () {
        document.location.href = "/";
      }
    );
  });

  $(".editTeam").on("click", function () {
    event.preventDefault();
    var teamId = $(this).data("id");
    document.location.href = "/editTeam/" + teamId;
  });

  $(".saveTeam").on("click", function () {
    event.preventDefault();
    var teamId = $(this).data("id");
    var teamName = $(this).data("name");
    var newName;
    if (!$(".teamName").val().trim()) {
      newName = teamName;
    } else {
      newName = $(".teamName").val().trim();
    }
    $.ajax({
      url: "/api/teams/" + teamId,
      method: "PUT",
      data: {teamName: newName},
      success: function(result) {
        console.log(result);
        document.location.href = "/";
      },
      error: function(error) {
        throw error;
      }
    });
  });

  $(".deleteTeam").on("click", function () {
    event.preventDefault();
    teamId = $(this).data("id");
    $.ajax({
      url: "/api/teams/" + teamId,
      method: "DELETE",
      success: function(result) {
        console.log(result);
        location.reload();
      },
      error: function(error) {
        throw error;
      }
    });
  });

  $(".deleteFromTeam").on("click", function () {
    event.preventDefault();
    //console.log("deleteFromTeam (script.js): data = "+data);
    var ids = $(this).data("ids");
    console.log("deleteFromTeam (script.js): ids = "+ids);
    var separatorIndex = ids.indexOf(":");
    console.log("deleteFromTeam (script.js): separatorIndex = "+separatorIndex);
    var pokemonId = ids.substring(0,separatorIndex);
    var teamId = ids.substring(separatorIndex+1);
    console.log("deleteFromTeam (script.js): pokemonId ="+pokemonId+" teamId = "+teamId);
    $.ajax({
      url: "/api/teampokemon/"+pokemonId+"/"+teamId,
      method: "DELETE",
      success: function(result) {
        console.log(result);
        location.reload();
      },
      error: function(error) {
        throw error;
      }
    });
  });

  $(".deletePokemon").on("click", function () {
    event.preventDefault();
    pokemonId = $(this).data("id");
    $.ajax({
      url: "/api/pokemons/" + pokemonId,
      method: "DELETE",
      success: function(result) {
        console.log(result);
        document.location.href = "/viewAllPokemon";
      },
      error: function(error) {
        throw error;
      }
    });
  });

  $(".removePokemonAssociations").on("click", function () {
    event.preventDefault();
    teamId = $(this).data("id");
    $.ajax({
      url: "/api/teampokemon/team/" + teamId,
      method: "DELETE",
      success: function(result) {
        console.log(result);
        location.reload();
      },
      error: function(error) {
        throw error;
      }
    });
  });

  $(".editOne").on("click", function () {
    event.preventDefault();
    pokemonId = $(this).data("id");
    document.location.href = "/editPokemon/" + pokemonId;
  });

  $(".saveOne").on("click", function () {
    event.preventDefault();
    var pokemonId = $(this).data("id");
    var nickname = $(this).data("name");
    var newName;
    if (!$(".nickname").val().trim()) {
      newName = nickname;
    } else {
      newName = $(".nickname").val().trim();
    }
    console.log($(".nickname").val().trim());
    $.ajax({
      url: "/api/pokemons/" + pokemonId,
      method: "PUT",
      data: {nickname: newName},
      success: function() {
        document.location.href = "/";
      },
      error: function(error) {
        throw error;
      }
    });
  });

  $(".removeTeamAssociations").on("click", function () {
    event.preventDefault();
    pokemonId = $(this).data("id");
    $.ajax({
      url: "/api/teampokemon/pokemon/" + pokemonId,
      method: "DELETE",
      success: function(result) {
        console.log(result);
        location.reload();
      },
      error: function(error) {
        throw error;
      }
    });
  });
});
