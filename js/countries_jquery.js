
function getRegions(event) {
  var regions = [];
// Create an AJAX request (AJAX shortcut in jQuery)
  $.ajax({
    type: 'GET',
    url: 'https://restcountries.eu/rest/v1/all'
  }).done(function(response) {
    // .done is like the "onreadystatechange thing" + check successful request
    // jQ already does JSON.parse on response so it is an objet => JQUERY OBJECTS ARE ARRAYS!!
    $('#region-select').empty();
    $('#region-select').append('<option value="default"> -- Select region -- </option>')

    $.each(response, function(index, item) {
      if ($.inArray(item.region, regions) == -1 && item.region.length >=1) {
        regions.push(item.region);
        $('#region-select').append('<option value="' + item.region + '">' + item.region + '</option>')
      }
    })
  })
}

function getCountries(event) {
  var regionName = $(this)[0].value // remember jQuery returns an Array !
  $.ajax({
    type: 'GET',
    url: "https://restcountries.eu/rest/v1/region/"+ regionName
  }).done(function(response) {
    $('#country-select').empty();
    $('#country-select').append('<option value="default"> -- Select country -- </option>')

    $.each(response, function(index, item ) {
      $('#country-select').append( '<option value="' + item.name + '">' + item.name + '</option>')
    })
  })
}

function getCountryData() {
  var countryName = $(this)[0].value;
  $.ajax({
    type: 'GET',
    url: 'https://restcountries.eu/rest/v1/name/' + countryName
  }).done(function() {
    $('#results').empty();
    $('#results').append("<h4>" + countryName + "</h4>");
    $('#results').append("<ul id='description'></ul>");
  })
}

$(document).ready(function(){
  console.log('heyyyy');
  $('#get-regions').on('click', getRegions);
  $('#region-select').on('change', getCountries);
  $('#country-select').on('change', getCountryData)
})




