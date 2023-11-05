$(document).ready(function () {
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

    $('.amenities H4').text(Object.values(amenities).join(', '));
  });
});
