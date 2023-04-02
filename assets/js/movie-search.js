//var movie = '';
var movieSessions = 'https://taskinoz.com/village/movies';
var movies = [];
//pulling from the API
function getMoviesFromCinema(cinemaId) {

    $('#all-movies').html('<div class="loading">loading...</div>')

    $.ajax({
        url: movieSessions + '?id=' + cinemaId,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            movies = data;

            $('#all-movies').text("")
            var list = $('<div></div>').attr('id', 'movie-list'); //provides the detailed list of information about the movies, such as name, run time and genre.

            for (let i = 0; i < movies.Items.length; i++) {
                var movie = movies.Items[i];
                var sessions = movie.Sessions;
                var times = "";
                console.log(times);
                for (let j = 0; j < sessions.length; j++) {
                    var session = sessions[j];
                    times += '<span>' + dayjs(session.ShowDateTime).format("ddd hh:mm a") + '</span>\n';
                }
                var div = $(
                    '<div class="movie">' +
                        '<div class="movie-image">' +
                            '<img src="' + movie.GraphicUrl + '">' +
                        '</div>' +
                        '<div class="movie-info">' +
                            '<h3 class="movie-title">' + movie.Title + '</h3>' +
                            '<p class="movie-rating">Rating: ' + movie.Rating + '</p>' +
                            '<p class="movie-genre">' + movie.Genres[0].Name + '</p>' +
                            '<p class="movie-duration">' + movie.Runtime + ' minutes</p>' +
                            '<div class="movie-sessions">' +
                                times +
                            '</div>' +
                            '<div class="book-container">'+
                                '<a href="https://villagecinemas.com.au'+movie.PageUrl+'" '+
                                    'class="btn waves-effect waves-light book-button" '+
                                    'target="_blank" rel="noreferrer nofollow">'+
                                    'Book Now <i class="material-icons left">local_activity</i>'+
                                '</a>'+
                            '</div>'+
                        '</div>' +
                    '</div>'
                );
                list.append(div);
            }

            $('#all-movies').append(list);
        },
        error: function (data) {
            console.log(data);
        }
    });

}

function movieSearch() {
    var search = $('#movie-search').val();
    $('#movie-list .movie').each(function () {
        if ($(this).children('.movie-info').children('.movie-title').text().toLowerCase().indexOf(search.toLowerCase()) == -1 && search !== "") {
            $(this).hide();
        } else {
            $(this).show();
        }
    });
}

$(document).ready(function () {
    // Get url parameters
    var urlParams = new URLSearchParams(window.location.search);
    var cinemaId = urlParams.get('cinemaId');
    var cinemaName = urlParams.get('cinemaName');

    if (cinemaName) {
        $('h1').text(cinemaName + " Cinema");
    }

    if (cinemaId) {
        getMoviesFromCinema(cinemaId)
    }

    $('#movie-search').keypress(function (e) {
        if (e.which == 13) {//Enter key pressed
            movieSearch();
        }
    });

    $('button').on('click', function () {
        movieSearch();
    })
});