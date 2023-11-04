$(document).ready(function () {
  const checked = {};
  $('input[type="checkbox"]').on('change', function () {
    const amenityID = $(this).data('id');
    $(this).is(':checked') ? checked[amenityID] = true : delete checked[amenityID];
    $('.amenities h4').text(Object.keys(checked).join(', '));
  });
});
