// Open python server python -m SimpleHTTPServer 9000
// Create an AJAX request (AJAX built-in in Javascript)

function ajaxRequest(method, url){
  var request = new XMLHttpRequest();
  request.open(method, url);
  request.send();
  return request;
}
function successfulRequest (request){
  return (request.readyState === 4 && request.statusText == 'OK')
}

function getRegions(event) {
  var regions = [];

  var request = ajaxRequest('GET', 'https://restcountries.eu/rest/v1/all');

// Remember JS is synchronous but we need to wait until the request is fully processed in order to do something
  request.onreadystatechange = function() {
    // console.log(request); => Loads of various request objects, all looking similar (a hash) with long JSON objects, but not all of them have ready-state 4
    if (successfulRequest(request)) {

      regionSelect.innerHTML = ''
      // regionSelect.innerHTML ='<option value="default">-- Select your region --</option' => was much quicker than creating the optionDefault below...

      var response = JSON.parse(request.response)  // is a long JSON string => parse it to get an Array: each array[i] lists infos on a country -> we need the region, and we store it in the regions array

      for (var i=0; i < response.length; i++) {
        // need to avoid duplicate regions
        if (regions.indexOf(response[i].region) === -1  && response[i].region.length > 0) {
          regions.push(response[i].region);
          // now add it to the dropdowm menu: "select" made of "options"
          var optionRegion = document.createElement('option');
          optionRegion.setAttribute('value', response[i].region);
          optionRegion.innerHTML = response[i].region;
          regionSelect.appendChild(optionRegion);
        } 
      }
      // just add a "select region" to the dropdown
      var optionDefault = document.createElement('option');
      optionDefault.setAttribute('value', 'default');
      optionDefault.innerHTML = '-- Select your region --';
      regionSelect.insertBefore(optionDefault, regionSelect.firstChild);
    }
  }
}

function getCountries(event) {
  var regionName = this.value;

  var request = ajaxRequest('GET', "https://restcountries.eu/rest/v1/region/"+ regionName);

  request.onreadystatechange = function() {

    if (successfulRequest(request)) {
      countrySelect.innerHTML = '';
      var response = JSON.parse(request.response);
      
      for (var i=0; i < response.length; i++) {
        var optionCountry = document.createElement('option');
        optionCountry.setAttribute('value', response[i].name);
        optionCountry.innerHTML = response[i].name;
        countrySelect.appendChild(optionCountry);
      }
    }
      var optionDefault = document.createElement('option');
      optionDefault.setAttribute('value', 'default');
      optionDefault.innerHTML = '-- Select your country --';
      countrySelect.insertBefore(optionDefault, countrySelect.firstChild);
  }
}

function getCountryData() {
  countryName = this.value;
  var request = ajaxRequest('GET', 'https://restcountries.eu/rest/v1/name/' + countryName);

  request.onreadystatechange = function() {
    if (successfulRequest(request)) {
      results.innerHTML = '';
      var response = JSON.parse(request.response);
      results.innerHTML = response[0].name + ' ' + response[0].population;
    }
  }
}

var getRegionsButton;
var regionSelect;
var countrySelect;

document.addEventListener('DOMContentLoaded', function() {
  console.log('heyyyy');

// Define our variables
  getRegionsButton = document.getElementById('get-regions');
  regionSelect = document.getElementById('region-select');
  countrySelect = document.getElementById('country-select');
  results = document.getElementById('results');

// Add Event Listeners
  getRegionsButton.addEventListener('click', getRegions);
  regionSelect.addEventListener('change', getCountries);
  countrySelect.addEventListener('change', getCountryData);

});



