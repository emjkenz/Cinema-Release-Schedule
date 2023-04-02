var even = '';
var allEvents = 'https://taskinoz.com/village/schedule';
var events = [];
function getEvents() {
    $('#all-cinemas').html('<div class="loading">loading...</div>')
    console.log("hello")
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
                //var sessions = event.Sessions;
                var times = "";
                console.log(times);
                // for (let j = 0; j < sessions.length; j++) {
                //     var session = sessions[j];
                //     times += '<span>' + dayjs(session.ShowDateTime).format("ddd hh:mm a") + '</span>\n';
                // }
                var div = $(
                    '<div class="event">' +
                    '<div class="event-image">' +
                    '<img src="' + (event.GraphicUrl?? "../assets/images/download.png") + '">' +
                    '</div>' +
                    '<div class="event-info">' +
                    '<h3 class="event-title">' + event.Title + '</h3>' +
                    '<p class="event-rating">Rating: ' + event.Rating + '</p>' +
                    //'<p class="event-genre">' + event.Genres[0].Name + '</p>' +
                    '<p class="event-duration">' + event.Runtime + ' minutes</p>' +
                    '<div class="movie-sessions">' +
                    times +
                    '</div>' +
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
$(document).ready(function () {
    getEvents()
});