$(document).ready(function() {

    var templateHtml = $("#template").html();
    var templateFunction = Handlebars.compile(templateHtml);
    var templateHtmlSerie = $("#templateSerietv").html();
    var templateFunctionSerie = Handlebars.compile(templateHtmlSerie);

    $(".bottone-ricerca").click(function(){
        ricercaFilm();
        ricercaSerieTv();
    });

    $(".campo-ricerca-input").keypress(function(event){
        if(event.which == 13) {
            ricercaFilm();
            ricercaSerieTv();
        }

    });
    //------------------------------------
    //-------------FUNZIONI---------------
    //------------------------------------
    function ricercaFilm() {
        var ricercaFilm = $(".campo-ricerca-input").val();
        $(".container").text(" ");
        $.ajax({
            url :"https://api.themoviedb.org/3/search/movie",
            data : {
                api_key : "7058fdc9b87af5cb2dbc92bd22e4e43c",
                query : ricercaFilm.toLowerCase()
            },
            method : "get",
            success : function (data){
                var film = data.results;
                for (var i = 0; i < film.length; i++) {
                    // console.log(film[i]);

                    // creo delle variabili per prendere le informazioni di cui ho bisogno dai vari film
                    var titolo = film[i].title;
                    var titoloOriginale = film[i].original_title;
                    var lingua = film[i].original_language;
                    var voto = film[i].vote_average;
                    var stella = Math.round(voto / 2);
                    var htmlStellaVuota =
                    '<i class="far fa-star"></i>'.repeat(5 - stella);
                    var htmlStellaPiena =
                    '<i class="fas fa-star"></i>'.repeat(stella);

// Creazione delle stelle con il ciclo FOR di seguito
                    // for (var j = 0; j < 5; j++) {
                    //     if (j < stella ) {
                    //         htmlStella += '<i class="fas fa-star"></i>'
                    //     }else{
                    //         htmlStella += '<i class="far fa-star"></i>'
                    //     }
                    // }
                    // '<i class="fas fa-star"></i>'.repeat(stella);
                    // '<i class="far fa-star"></i>'.repeat(5 - stella);
// -------------------------------------------------------

                    var imgBandiera = bandiere(lingua);

                    var variabili = {
                        titolo : titolo,
                        titoloOriginale : titoloOriginale,
                        lingua : imgBandiera,
                        voto : voto,
                        stella : htmlStellaPiena + htmlStellaVuota
                    };


                    var htmlFinale = templateFunction(variabili);
                    // lo appendo nel contenitore dei dischi
                    $(".container").append(htmlFinale);

                };
            },
            error : function (){
                alert("errore")
            }
        });
    };

    function ricercaSerieTv() {
        var ricercaSerie = $(".campo-ricerca-input").val();
        $(".container").text(" ");
        $.ajax({
            url :"https://api.themoviedb.org/3/search/tv",
            data : {
                api_key : "7058fdc9b87af5cb2dbc92bd22e4e43c",
                query : ricercaSerie.toLowerCase()
            },
            method : "get",
            success : function (data){
                var serie = data.results;
                for (var k = 0; k < serie.length; k++) {
                    // console.log(serie[i]);

                    // creo delle variabili per prendere le informazioni di cui ho bisogno dai vari serie
                    var titolo = serie[k].name;
                    var titoloOriginale = serie[k].original_name;
                    var lingua = serie[k].original_language;
                    var voto = serie[k].vote_average;
                    var stella = Math.round(voto / 2);
                    var htmlStellaVuota =
                    '<i class="far fa-star"></i>'.repeat(5 - stella);
                    var htmlStellaPiena =
                    '<i class="fas fa-star"></i>'.repeat(stella);

                    var imgBandiera = bandiere(lingua);

                    var variabiliSerie = {
                        titoloSerie : titolo,
                        titoloOriginaleSerie : titoloOriginale,
                        linguaSerie : imgBandiera,
                        votoSerie : voto,
                        stellaSerie : htmlStellaPiena + htmlStellaVuota
                    };


                    var htmlFinaleSerie = templateFunctionSerie(variabiliSerie);
                    // lo appendo nel contenitore dei dischi
                    $(".container").append(htmlFinaleSerie);

                };
            },
            error : function (){
                alert("errore")
            }
        });
    };


function bandiere(lang) {
    if (lang == "en") {
        var icona = '<img class="bandieraLingua" src="http://icons.iconarchive.com/icons/icons-land/vista-flags/24/United-States-Flag-1-icon.png" alt="">'
    }else if (lang == "es"){
        var icona = '<img class="bandieraLingua" src="http://icons.iconarchive.com/icons/custom-icon-design/flat-europe-flag/24/Spain-icon.png">'
    }else{
        var icona = '<img class="bandieraLingua" src="http://icons.iconarchive.com/icons/custom-icon-design/flat-europe-flag/24/Italy-icon.png">'
    };
    return icona;

};







});























/*Milestone 2:
Trasformiamo il voto da 1 a 10 decimale in un numero intero da 1 a 5, così da permetterci di stampare a schermo un numero di stelle piene che vanno da 1 a 5, lasciando le restanti vuote (troviamo le icone in FontAwesome).
Arrotondiamo sempre per eccesso all’unità successiva, non gestiamo icone mezze piene (o mezze vuote :P)

Trasformiamo poi la stringa statica della lingua in una vera e propria bandiera della nazione corrispondente, gestendo il caso in cui non abbiamo la bandiera della nazione ritornata dall’API (le flag non ci sono in FontAwesome).
Allarghiamo poi la ricerca anche alle serie tv. Con la stessa azione di ricerca dovremo prendere sia i film che corrispondono alla query, sia le serie tv, stando attenti ad avere alla fine dei valori simili (le serie e i film hanno campi nel JSON di risposta diversi, simili ma non sempre identici)
Qui un esempio di chiamata per le serie tv:
https://api.themoviedb.org/3/search/tv?api_key=e99307154c6dfb0b4750f6603256716d&language=it_IT&query=s
crubs*/
