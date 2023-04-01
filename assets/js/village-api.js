var cinema = '';
var cinemaLocations = 'https://taskinoz.com/village/cinemas';

var cinemas = [];

function getMovieCinemas() {

    $('#all-cinemas').html('<div class="loading">loading...</div>')

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
                var li = $('<li><span>' + cinema.DisplayName + '</span><a class="search-cinema" href="./moviesearch/?cinemaId=' + cinema.CinemaId +'&cinemaName='+cinema.DisplayName+'">View ></a></li>');
                ul.append(li);
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
    $('#cinema-list ul li').each(function () {
        if ($(this).children('span').text().toLowerCase().indexOf(search.toLowerCase()) == -1 && search !== "") {
            $(this).hide();
        } else {
            $(this).show();
        }
    });
}

$(document).ready(function(){
    
    $('#cinema-search').keypress(function(e){
        if(e.which == 13){//Enter key pressed
            searchCinemas();
        }
    });

    $('button').on('click', function(){
        searchCinemas();
    })
    getMovieCinemas()

});