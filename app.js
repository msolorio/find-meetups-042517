function getData(locationVal, searchTermVal) {
  var apiKey = '3534301459421e3859607540312e7c4f';
  var settings = {
    // method or type
    type: 'GET',
    dataType: 'json',
    url: 'https://api.meetup.com/find/groups',
    data: {
      key: apiKey,
      location: locationVal,
      text: searchTermVal
    },
    headers: {
      
    }
  };
  $.ajax(settings)
    .done(function(data) {
      console.log('data:', data);
    })
    .fail(function(error) {
      console.error('error:', error);
    })
    .always(function() {
      console.log('http GET request complete');
    });
};

function displayErrorMessage(selector, errorMessage) {
  console.log('displaying error for:', selector, errorMessage);
};

function validateSingleInput(inputVal, errorMessageSelector, errorMessage) {
  if (inputVal === '') {
    displayErrorMessage(errorMessageSelector, errorMessage);
    return false;
  } else {
    return true;
  }
};

function validateAllInputs(locationVal, searchTermVal) {
  var allInputsValid = true;
  if (!validateSingleInput(locationVal, '.js-message-location', 'Please provide a city or town.')) {
    allInputsValid = false;
  }
  if (!validateSingleInput(searchTermVal, '.js-message-searchTerm', 'Please provide a search term.')) {
    allInputsValid = false;
  }
  return allInputsValid;
};

function getInputVals() {
  var locationVal = $('.js-input-location').val().trim();
  var searchTermVal = $('.js-input-searchTerm').val().trim();
  return [locationVal, searchTermVal];
};

/******************************** */
// EVENT LISTENERS
/******************************** */
function listenForFormSubmit() {
  $('.js-form').submit(function(event) {
    event.preventDefault();
    
    var [locationVal, searchTermVal] = getInputVals();
    var formValid = validateAllInputs(locationVal, searchTermVal);
    if (formValid) getData(locationVal, searchTermVal);
  });
};

/******************************** */
// WIDNOW LOAD
/******************************** */
$(function() {
  listenForFormSubmit();
});