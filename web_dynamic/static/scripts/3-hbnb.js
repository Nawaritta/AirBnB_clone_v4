$(document).ready(function () {
  const apiURL = 'http://' + window.location.hostname;
  const placesAPI = `${apiURL}:5001/api/v1/places_search/`;

  // Function to update API status
  function updateAPIStatus () {
    $.get(`${apiURL}:5001/api/v1/status/`, function (response) {
      const apiStatusDiv = $('DIV#api_status');
      if (response.status === 'OK') {
        apiStatusDiv.addClass('available');
      } else {
        apiStatusDiv.removeClass('available');
      }
    });
  }

  // Function to fetch and display places
  function fetchAndDisplayPlaces () {
    $.ajax({
      url: placesAPI,
      type: 'POST',
      data: '{}',
      contentType: 'application/json',
      dataType: 'json',
      success: function (data) {
        const placesSection = $('SECTION.places');
        placesSection.empty(); // Clear existing content
        data.forEach(place => {
          const article = `<article>
            <div class="title">
              <h2>${place.name}</h2>
              <div class="price_by_night">${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">
                <i class="fa fa-users fa-3x" aria-hidden="true"></i><br>
                ${place.max_guest} Guests
              </div>
              <div class="number_rooms">
                <i class="fa fa-bed fa-3x" aria-hidden="true"></i><br>
                ${place.number_rooms} Bedrooms
              </div>
              <div class="number_bathrooms">
                <i class="fa fa-bath fa-3x" aria-hidden="true"></i><br>
                ${place.number_bathrooms} Bathrooms
              </div>
            </div>
            <div class="description">${place.description}</div>
          </article>`;
          placesSection.append(article);
        });
      }
    });
  }

  // Handle checkbox changes and filter amenities
  const amenities = {};
  $('INPUT[type="checkbox"]').change(function () {
    const dataId = $(this).attr('data-id');
    const dataName = $(this).attr('data-name');
    if ($(this).is(':checked')) {
      amenities[dataId] = dataName;
    } else {
      delete amenities[dataId];
    }
    const amenitiesHeader = $('.amenities H4');
    if (Object.values(amenities).length === 0) {
      amenitiesHeader.html('&nbsp;');
    } else {
      amenitiesHeader.text(Object.values(amenities).join(', '));
    }
  });

  // Initial API status check and place retrieval
  updateAPIStatus();
  fetchAndDisplayPlaces();
});
