$(document).ready(function() {
    const url = 'http://0.0.0.0:5001/api/v1/status/';

    $.get(url, function(data) {
        if (data.status === 'OK') {
            $('div#api_status').addClass('available');
        } else {
            $('div#api_status').removeClass('available');
        }
    });

    let checked = {};
    $('input[type="checkbox"]').on('change', function() {
        const amenityID = $(this).data('id');
        $(this).is(':checked') ? (checked[amenityID] = true) : delete checked[amenityID];
        $('.amenities h4').text(Object.keys(checked).join(', '));
    });

    $.ajax({
        type: 'POST',
        url: 'http://0.0.0.0:5001/api/v1/places_search',
        contentType: 'application/json',
        data: JSON.stringify({})
    }).done(function(response) {
        response.forEach(function(place) {
            var article = $('<article>');
            var titleBox = $('<div class="title_box">');
            titleBox.append('<h2>' + place.name + '</h2>');
            titleBox.append('<div class="price_by_night">$' + place.price_by_night + '</div>');

            var information = $('<div class="information">');
            information.append('<div class="max_guest">' + place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '') + '</div>');
            information.append('<div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '') + '</div>');
            information.append('<div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '') + '</div>');

            var description = $('<div class="description">');
            description.text(place.description);

            article.append(titleBox);
            article.append(information);
            article.append(description);

            $('.places').append(article);
        });
    });
});
