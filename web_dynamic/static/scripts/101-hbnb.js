$(document).ready(function () {
    const url = 'http://0.0.0.0:5001/api/v1/status/';
    const checked = { amenities: [], states: [], cities: [] };

    $.get(url, function (data) {
        if (data.status === 'OK') {
            $('div#api_status').addClass('available');
        } else {
            $('div#api_status').removeClass('available');
        }
    });

    $('input[type="checkbox"]').on('change', function () {
        const dataType = $(this).data('type');
        const dataID = $(this).data('id');

        if ($(this).is(':checked')) {
            checked[dataType].push(dataID);
        } else {
            const index = checked[dataType].indexOf(dataID);
            if (index > -1) {
                checked[dataType].splice(index, 1);
            }
        }

        updateLocations();
    });

    $('#searchBtn').on('click', function () {
        const dataToSend = { amenities: checked.amenities, states: checked.states, cities: checked.cities };

        $.ajax({
            type: 'POST',
            url: 'http://0.0.0.0:5001/api/v1/places_search',
            contentType: 'application/json',
            data: JSON.stringify(dataToSend)
        }).done(function (response) {
            response.forEach(function (place) {
                const article = $('<article>');
                $('.places').append(article);
            });
        });
    });

    function updateLocations() {
        const locations = [...checked.states, ...checked.cities].join(', ');
        $('.locations h4').text(locations);
    }
});
