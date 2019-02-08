// When searched show the coresponding pokemon

var initUrl = 'https://pokeapi.co/api/v2/';
var pokeUrl = initUrl + 'pokemon/';

$(function () {
    $('#button').click(function (e) {
        pokeSubmit()
        e.preventDefault();

    });
 
    $.getJSON(pokeUrl, function (data) {
        
        JSON.stringify(data, null, "  ");
        //List all pokemon
        console.log(data.results)
        counter = 0;
        for (var i = 0; i < 40; i++) {
            counter++
            $('#pokemonList').append('<li onclick="pushName('+counter+')">'+  counter + '.' + data.results[i].name + '</li>')
        }
    })
});

function pushName(counter){
    pokeSubmit(counter)
    console.log(counter)
}
function pokeSubmit(input) {
    var param = $('#pokeInput').val();
    var pokeUrl = initUrl + 'pokemon/' + param + "/";
    var pokeCounter= initUrl + 'pokemon/' + input + "/";
    $('#pokeInput').val('');
    //when list clicked do
    $.getJSON(pokeCounter, function (data) {
        JSON.stringify(data, null, "  ");


        //Show name of searched pokemon
        $('#name').html('<strong>Name:</strong> ' + data.name + ' no.   ' + data.id)

        //Show sprite of searched pokemon
        $('#spritePoke').html('<img src="' + data.sprites.front_default + '"/>' + '<img src="' + data.sprites.back_default + '"/>');

        //Show type of the pokemon
        $('#type').empty()
        $('#type').html('Type: ')
        for (var i = 0; i < data.types.length; i++) {

            $('#type').append('<li>' + data.types[i].type.name + '</li>' + '  ')
        }

        //Show 4 different moves
        $('#moves').empty()
        $('#moves').append('<li> Moves: <br> </li>')
        for (var i = 0; i < 4; i++) {
            var move = Math.floor(Math.random() * data.moves.length)
            //output moves to HTML

            $('#moves').append('<li>' + data.moves[move].move.name + '</li>')

            if (data.moves[1].move.name === data.moves[2].move.name) {
                $('#moves').empty()
                $('#moves').append('<li>' + data.moves[0].move.name + '</li>')
            }
        }
        //EvolutionChain
        var evoUrl = "https://pokeapi.co/api/v2/pokemon-species/" + input + "/";

        $.getJSON(evoUrl, function (data) {
            JSON.stringify(data, null, "  ");

            $('#evo').empty()
            $('#evo').html('Prevolution: ' + data.evolves_from_species.name)


        })
    });
    $.getJSON(pokeUrl, function (data) {
        JSON.stringify(data, null, "  ");


        //Show name of searched pokemon
        $('#name').html('<strong>Name:</strong> ' + data.name + ' no.   ' + data.id)
        
        //Show sprite of searched pokemon
        $('#spritePoke').html('<img src="' + data.sprites.front_default + '"/>' + '<img src="' + data.sprites.back_default + '"/>');

        //Show type of the pokemon
        $('#type').empty()
        $('#type').html('<strong>Type: </strong> ')
        for (var i = 0; i < data.types.length; i++) {

            $('#type').append('<li>' + data.types[i].type.name + '</li>' + '  ')
        }

        //Show 4 different moves
        $('#evo').empty()
        $('#moves').empty()
        $('#moves').append('<li> <strong>Moves:</strong> <br> </li>')
        for (var i = 0; i < 4; i++) {
            var move = Math.floor(Math.random() * data.moves.length)
            //output moves to HTML

            $('#moves').append('<li>' + data.moves[move].move.name + '</li>')

            if (data.moves[1].move.name === data.moves[2].move.name) {
                $('#moves').empty()
                $('#moves').append('<li>' + data.moves[0].move.name + '</li>')
            }
        }
        //EvolutionChain
        var evoUrl = "https://pokeapi.co/api/v2/pokemon-species/" + param + "/";

        $.getJSON(evoUrl, function (data) {
            JSON.stringify(data, null, "  ");

            $('#evo').empty()
            $('#evo').html('<strong>Prevolution: </strong>' + data.evolves_from_species.name)


        })
        
    });



};