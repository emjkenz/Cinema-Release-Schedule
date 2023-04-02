var even = '';
var allEvents = 'https://taskinoz.com/village/schedule';
var events = [];
function getEvents() {
    $('#all-events').html('<div class="loading">loading...</div>')
    $.ajax({
        url: allEvents,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            events = data;
            $('#all-events').text("")
            var list = $('<div></div>').attr('id', 'movie-list'); //provides the detailed list of information about the events, such as name, run time and genre.

            for (let i = 0; i < events.Items.length; i++) {
                var event = events.Items[i];
                var genere = event.Genres?.[0]?.Name ? '<p class="event-genre">' + event.Genres?.[0]?.Name  + '</p>' : "";

                var div = $(
                    '<div class="event">' +
                        '<div class="event-image">' +
                            '<img src="' + (event.GraphicUrl ?? "../assets/images/poster-not-found.png") + '">' +
                        '</div>' +
                        '<div class="event-info">' +
                            '<h3 class="event-title">' + event.Title + '</h3>' +
                            '<p class="event-description">' + truncate(event.Synopsis, 200) + '</p>' +
                            '<p class="event-rating">Rating: ' + event.Rating + '</p>' +
                            genere +
                            '<p class="event-duration">' + event.Runtime + ' minutes</p>' +
                            '<div class="book-container">'+
                                '<a href="https://villagecinemas.com.au'+event.PageUrl+'" '+
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

            $('#all-events').append(list);
        },
        error: function (data) {
            console.log(data);
        }
    });
}

function truncate(text, length) {
    return text.length > length ? text.slice(0, length)+"..." : text
}
$(document).ready(function () {
    getEvents()
});