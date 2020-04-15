$(function() {
    $(".createPokemon").on("click", function(event) {
        var id = $(this).data("id"); 

        $.ajax("/api/pokemon")
    })
}