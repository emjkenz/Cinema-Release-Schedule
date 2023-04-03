var cinema = '';
var cinemaLocations = 'https://taskinoz.com/village/cinemas';
var cinemas = [];
function getMovieCinemas() {
    $('#all-cinemas').html('<div class="loading">loading...</div>')
    console.log("hello")
    $.ajax({
        url: cinemaLocations,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            cinemas = data;
            $('#all-cinemas').text("")
            var list = $('<div></div>').attr('id', 'cinema-list');
            var ul = $('<ul></ul>');
            for (let i = 0; i < cinemas.Items.length; i++) {
                const cinema = cinemas.Items[i];
                var li = $('<li><a href="./moviesearch/?cinemaId=' + cinema.CinemaId + '&cinemaName=' + cinema.DisplayName + '"><span>' + cinema.DisplayName + '</span></li>');
                ul.append(li);
                // provides the means to disseminate detailed information about cinema names, id's and other data via this API to the rest of the website and is the cornerstone of our cinema and movie search function.
            }
            list.append(ul);
            $('#all-cinemas').append(list);
        },
        error: function (data) {
            console.log(data);
        }
    });
}
function searchCinemas() {
    var search = $('#cinema-search').val();
    $('#cinema-list ul li a').each(function () {
        if ($(this).children('span').text().toLowerCase().indexOf(search.toLowerCase()) == -1 && search !== "") {
            $(this).hide();
        } else {
            $(this).show();
        } // this block of code absolutely melts my brain.
    });
}
$(document).ready(function () {

    $('#cinema-search').keypress(function (e) {
        if (e.which == 13) {//Enter key pressed
            searchCinemas();
        }
    });
    $('button').on('click', function () {
        searchCinemas();
    })
    getMovieCinemas()
});