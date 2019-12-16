$(document).ready(function() {


    $(".bottone-ricerca").click(function(){
        ricercaFilm();
    });

    $(".campo-ricerca-input").keypress(function(event){
        if(event.which == 13) {
            ricercaFilm();
        }

    });

});


//------------------------------------
//-------------FUNZIONI---------------
//------------------------------------
function ricercaFilm() {
    var templateHtml = $("#template").html();
    var templateFunction = Handlebars.compile(templateHtml);
    var ricercaFilm = $(".campo-ricerca-input").val();
    $(".container").text(" ");
    $.ajax({
        url :"https://api.themoviedb.org/3/search/movie",
        data : {
            api_key : "7058fdc9b87af5cb2dbc92bd22e4e43c",
            query : ricercaFilm
        },
        method : "get",
        success : function (data){
            var film = data.results;
            for (var i = 0; i < film.length; i++) {
                console.log(film[i]);

                // creo delle variabili per prendere le informazioni di cui ho bisogno dai vari film
                var titolo = film[i].title;
                var titoloOriginale = film[i].original_title;
                var lingua = film[i].original_language;
                var voto = Math.round(film[i].vote_average);


                var variabili = {
                    titolo : titolo,
                    titoloOriginale : titoloOriginale,
                    lingua : lingua,
                    voto : voto
                }

                var htmlFinale = templateFunction(variabili);

                // lo appendo nel contenitore dei dischi
                $(".container").append(htmlFinale);

            }
        },
        error : function (){
            alert("errore")
        }
    });
};






















/*Milestone 1:
Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente. Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato:
1. Titolo
2. Titolo Originale
3. Lingua
4. Voto */
