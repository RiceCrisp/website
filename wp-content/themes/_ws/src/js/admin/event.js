// Datepicker
jQuery('#event-meta-inside #event-start-date, #event-meta-inside #event-end-date').datepicker({
  dateFormat: "mm/dd/yy"
  // minDate: 0
});
jQuery('#event-meta-inside #event-start-date').on('change', function() {
  jQuery('#event-meta-inside #event-end-date').datepicker('option', 'minDate', getDate(this));
});
jQuery('#event-meta-inside #event-end-date').on('change', function() {
  jQuery('#event-meta-inside #event-start-date').datepicker('option', 'maxDate', getDate(this));
});
jQuery('#event-meta-inside #event-start-date, #event-meta-inside #event-start-time').on('change', function() {
  var dateArray = jQuery('#event-meta-inside #event-start-date').val().split('/');
  var time = jQuery('#event-meta-inside #event-start-time').val();
  var hours = Number(time.match(/^(\d+)/)[1]);
  var minutes = Number(time.match(/:(\d+)/)[1]);
  var AMPM = time.match(/\s(.*)$/)[1];
  if (AMPM == "PM" && hours < 12) hours = hours + 12;
  if (AMPM == "AM" && hours == 12) hours = hours - 12;
  var sHours = hours.toString();
  var sMinutes = minutes.toString();
  if (hours < 10) sHours = "0" + sHours;
  if (minutes < 10) sMinutes = "0" + sMinutes;
  jQuery('#event-meta-inside #event-sortable-start').val(Number(dateArray[2]+dateArray[0]+dateArray[1]+sHours+sMinutes));
  jQuery('#event-meta-inside #event-json-start').val(Number(dateArray[2]+'-'+dateArray[0]+'-'+dateArray[1]+'T'+sHours+':'+sMinutes));
});
jQuery('#event-meta-inside #event-end-date, #event-meta-inside #event-end-time').on('change', function() {
  var dateArray = jQuery('#event-meta-inside #event-end-date').val().split('/');
  var time = jQuery('#event-meta-inside #event-end-time').val();
  var hours = Number(time.match(/^(\d+)/)[1]);
  var minutes = Number(time.match(/:(\d+)/)[1]);
  var AMPM = time.match(/\s(.*)$/)[1];
  if (AMPM == "PM" && hours < 12) hours = hours + 12;
  if (AMPM == "AM" && hours == 12) hours = hours - 12;
  var sHours = hours.toString();
  var sMinutes = minutes.toString();
  if (hours < 10) sHours = "0" + sHours;
  if (minutes < 10) sMinutes = "0" + sMinutes;
  jQuery('#event-meta-inside #event-sortable-end').val(Number(dateArray[2]+dateArray[0]+dateArray[1]+sHours+sMinutes));
  jQuery('#event-meta-inside #event-json-end').val(Number(dateArray[2]+'-'+dateArray[0]+'-'+dateArray[1]+'T'+sHours+':'+sMinutes));
});

function getDate(element) {
  var date;
  try {
    date = jQuery.datepicker.parseDate('mm/dd/yy', element.value);
  }
  catch(error) {
    date = null;
  }
  return date;
}

function initMap() {
  var map = new google.maps.Map(document.getElementById('event-map'), {
    center: {lat: 37.09, lng: -95.71},
    scrollwheel: false,
    zoom: 4
  });
  var input = document.getElementById('event-location');
  var locId = document.getElementById('event-location-id');
  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);
  var infowindow = new google.maps.InfoWindow();
  var marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29)
  });
  var service = new google.maps.places.PlacesService(map);

  var changePlace = function() {
    infowindow.close();
    marker.setVisible(false);
    var place = autocomplete.getPlace();
    if (!place && locId.value) {
      service.getDetails({placeId: locId.value}, function(place2, status) {
        place = place2;
        changeLoc();
      });
    } else if (place) {
      changeLoc();
    }

    function changeLoc() {
      if (!place.geometry) {
        event.preventDefault();
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(15);
      }
      marker.setIcon(/** @type {google.maps.Icon} */({
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(35, 35)
      }));
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);
      var address = '';
      if (place.address_components) {
        var number = '', street = '', room = '', city = '', state = '', zip = '', country = '';
        for (var i = 0; i < place.address_components.length; i++) {
          var addressType = place.address_components[i].types[0];
          if (addressType == 'street_number') {
            number = place.address_components[i].short_name;
          } else if (addressType == 'route') {
            street = place.address_components[i].short_name;
          } else if (addressType == 'subpremise') {
            room = '#' + place.address_components[i].long_name;
          } else if (addressType == 'locality') {
            city = place.address_components[i].long_name;
          } else if (addressType == 'administrative_area_level_1') {
            state = place.address_components[i].short_name;
          } else if (addressType == 'postal_code') {
            zip = place.address_components[i].short_name;
          } else if (addressType == 'country') {
            country = place.address_components[i].short_name;
          }
        }
        address = number + ' ' + street + ' ' + room + '<br>' + city + ', ' + state + ' ' + zip;
      }
      infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
      infowindow.open(map, marker);
      document.getElementById('event-location-id').value = place.place_id;
      document.getElementById('event-location-name').value = place.name;
      document.getElementById('event-location-street').value = number + ' ' + street + ' ' + room;
      document.getElementById('event-location-city').value = city;
      document.getElementById('event-location-state').value = state;
      document.getElementById('event-location-zip').value = zip;
      document.getElementById('event-location-country').value = country;
      document.getElementById('event-location-lat').value = place.geometry.location.lat.call(this);
      document.getElementById('event-location-lng').value = place.geometry.location.lng.call(this);
      document.getElementById('event-location-readable').value = address;
    }
  };
  autocomplete.addListener('place_changed', changePlace);
  // Show place when page loads
  google.maps.event.addListenerOnce(map, 'idle', changePlace);
}
