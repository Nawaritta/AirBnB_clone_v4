const apiURL = 'http://' + window.location.hostname;
const placesAPI = `${apiURL}:5001/api/v1/places_search/`;
const states = {};
const cities = {};
const amenities = {};

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

// Function to update the location filter
function updateLocationFilter () {
  const locations = Object.assign({}, states, cities);
  const locationsHeader = $('.locations H4');
  if (Object.values(locations).length === 0) {
    locationsHeader.html('&nbsp;');
  } else {
    locationsHeader.text(Object.values(locations).join(', '));
  }
}

// Handle checkbox changes for states
$('.locations > UL > H2 > INPUT[type="checkbox"]').change(function () {
  const dataId = $(this).attr('data-id');
  const dataName = $(this).attr('data-name');
  if ($(this).is(':checked')) {
    states[dataId] = dataName;
  } else {
    delete states[dataId];
  }
  updateLocationFilter();
});

// Handle checkbox changes for cities
$('.locations > UL > UL > LI INPUT[type="checkbox"]').change(function () {
  const dataId = $(this).attr('data-id');
  const dataName = $(this).attr('data-name');
  if ($(this).is(':checked')) {
    cities[dataId] = dataName;
  } else {
    delete cities[dataId];
  }
  updateLocationFilter();
});

// Handle checkbox changes for amenities
$('.amenities INPUT[type="checkbox"]').change(function () {
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

// Handle the search button click
$('BUTTON').click(function () {
  $.ajax({
    url: placesAPI,
    type: 'POST',
    data: JSON.stringify({
      states: Object.keys(states),
      cities: Object.keys(cities),
      amenities: Object.keys(amenities)
    }),
    contentType: 'application/json',
    dataType: 'json',
    success: appendPlaces
  });
});

// Initial API status check and place retrieval
updateAPIStatus();
fetchAndDisplayPlaces();

// Function to fetch and display places
function fetchAndDisplayPlaces () {
  $.ajax({
    url: placesAPI,
    type: 'POST',
    data: '{}',
    contentType: 'application/json',
    dataType: 'json',
    success: appendPlaces
  });
}

// Function to append places to the section
function appendPlaces (data) {
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
        <div class "number_bathrooms">
          <i class="fa fa-bath fa-3x" aria-hidden="true"></i><br>
          ${place.number_bathrooms} Bathrooms
        </div>
      </div>
      <div class="description">${place.description}</div>
    </article>`;
    placesSection.append(article);
  });
}
