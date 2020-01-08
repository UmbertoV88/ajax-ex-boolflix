$(document).ready(function() {

    var api_url_base = "https://api.themoviedb.org/3" ;
    var api_key = "7058fdc9b87af5cb2dbc92bd22e4e43c";
    var image_url_base = "https://image.tmdb.org/t/p/";
    var image_size = "w342";

    // Handlebars
    var templateHtml = $("#template").html();
    var templateFunction = Handlebars.compile(templateHtml);

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
        $(".testata").show();
        var ricerca = $(".campo-ricerca-input").val();
        $(".movie").hide();
        $.ajax({
            url : api_url_base + "/search/movie",
            data : {
                api_key : api_key,
                query : ricerca.toLowerCase()
            },
            method : "get",
            success : function (data){
                if (data.total_results > 0 ) {
                    var film = data.results;
                    for (var i = 0; i < film.length; i++) {
                        // console.log(film[i]);

                        // creo delle variabili per prendere le informazioni di cui ho bisogno dai vari film
                        var titolo = film[i].title;
                        var titoloOriginale = film[i].original_title;
                        var lingua = film[i].original_language;
                        var voto = film[i].vote_average;
                        if(film[i].poster_path != null) {
                            var immagine_locandina = image_url_base + image_size + film[i].poster_path;
                        }else{
                            var immagine_locandina = 'https://s3-ap-southeast-1.amazonaws.com/silverscreen-photos/1534489151m000001.jpg'
                        };

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
                            stella : htmlStellaPiena + htmlStellaVuota,
                            image : immagine_locandina
                        };


                        var htmlFinale = templateFunction(variabili);
                        // lo appendo nel contenitore dei dischi
                        $(".container_film ").append(htmlFinale);

                    }
                }else{
                    $(".container_film ").append(' Nessun film trovato con la query "'  + ricerca + '"');
                };
            },
            error : function (){
                alert("errore")
            }
        });
    };

    function ricercaSerieTv() {
        $(".testata").show();
        var ricerca = $(".campo-ricerca-input").val();
        $(".serietv").hide();
        $.ajax({
            url :api_url_base + "/search/tv",
            data : {
                api_key : api_key,
                query : ricerca.toLowerCase()
            },
            method : "get",
            success : function (data){
                if (data.total_results > 0 ) {
                    var film = data.results;
                    for (var i = 0; i < film.length; i++) {
                        // console.log(film[i]);

                        // creo delle variabili per prendere le informazioni di cui ho bisogno dai vari film
                        var titolo = film[i].name;
                        var titoloOriginale = film[i].original_name;
                        var lingua = film[i].original_language;
                        var voto = film[i].vote_average;

                        if(film[i].poster_path != null) {
                            var immagine_locandina = image_url_base + image_size + film[i].poster_path;
                        }else{
                            var immagine_locandina = 'https://s3-ap-southeast-1.amazonaws.com/silverscreen-photos/1534489151m000001.jpg'
                        };

                        var stella = Math.round(voto / 2);
                        var htmlStellaVuota =
                        '<i class="far fa-star"></i>'.repeat(5 - stella);
                        var htmlStellaPiena =
                        '<i class="fas fa-star"></i>'.repeat(stella);

                        var imgBandiera = bandiere(lingua);

                        var variabili = {
                            titolo : titolo,
                            titoloOriginale : titoloOriginale,
                            lingua : imgBandiera,
                            voto : voto,
                            stella : htmlStellaPiena + htmlStellaVuota,
                            image : immagine_locandina
                        };


                        var htmlFinale = templateFunction(variabili);
                        // lo appendo nel contenitore dei dischi
                        $(".container_serie").append(htmlFinale);

                    }
                }else{
                    $(".container_serie ").append(' Nessuna serie trovata con la query "'  + ricerca + '"');
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
