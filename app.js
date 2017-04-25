function displayData(data, locationVal, searchTermVal) {
  $('.resultsHeading').html('Groups in ' + locationVal + ' Related to ' + searchTermVal);

  var meetups = data.data.map(function(meetup) {
    return (
      '<div class="meetup">\
        <h3 class="meetupName">\
          <a href="' + meetup.link + '" target="_blank">' + meetup.name + '</a>\
        </h3>\
      </div>'
    );
  });
  $('.results').html(meetups);
};

function getData(locationVal, searchTermVal) {
  var apiKey = '3534301459421e3859607540312e7c4f';
  var settings = {
    method: 'GET',
    dataType: 'jsonp',
    url: 'https://api.meetup.com/find/groups',
    data: {
      key: apiKey,
      location: locationVal,
      text: searchTermVal
    }
  };
  $.ajax(settings)
    .done(function(data) {
      console.log('data:', data);
      displayData(data, locationVal, searchTermVal);
      clearInputs();
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
  $(selector).html(errorMessage);
  if (!errorMessage) $(selector).hide();
};

function validateSingleInput(inputVal, errorMessageSelector, errorMessage) {
  if (inputVal === '') {
    displayErrorMessage(errorMessageSelector, errorMessage);
    return false;
  } else {
    displayErrorMessage(errorMessageSelector, '');
    return true;
  }
};

function clearInputs() {
  $('.js-input-location').val('');
  $('.js-input-searchTerm').val('');
}

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

function makeCapitalCase(stringValue) {
  var wordsArray = stringValue.toLowerCase().split(' ');
  formattedWordsArray = wordsArray.map(function(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  return formattedWordsArray.join(' ');
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
    locationVal = makeCapitalCase(locationVal);
    var formValid = validateAllInputs(locationVal, searchTermVal);
    if (formValid) {
      getData(locationVal, searchTermVal);
    }
  });
};

/******************************** */
// WIDNOW LOAD
/******************************** */
$(function() {
  listenForFormSubmit();
});