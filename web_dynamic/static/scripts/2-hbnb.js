$(document).ready(function () {
  // Check the status of the API
  const apiUrl = 'http://' + window.location.hostname + ':5001/api/v1/status/';
  $.get(apiUrl, function (response) {
    const apiStatusDiv = $('DIV#api_status');

    if (response.status === 'OK') {
      apiStatusDiv.addClass('available');
    } else {
      apiStatusDiv.removeClass('available');
    }
  });

  const amenities = {};

  // Use event delegation to handle checkbox changes
  $('body').on('change', 'INPUT[type="checkbox"]', function () {
    const checkbox = $(this);
    const amenityId = checkbox.data('id');
    const amenityName = checkbox.data('name');

    if (checkbox.is(':checked')) {
      amenities[amenityId] = amenityName;
    } else {
      delete amenities[amenityId];
    }

    const amenitiesH4 = $('.amenities H4');

    if (Object.values(amenities).length === 0) {
      amenitiesH4.html('&nbsp;');
    } else {
      amenitiesH4.text(Object.values(amenities).join(', '));
    }
  });
});
