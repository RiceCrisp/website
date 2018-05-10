// Hours check
jQuery('.site-options #site_hours').on('change', function() {
  hoursCheck();
});
var hoursCheck = (function hoursCheck() {
  if (jQuery('.site-options #site_hours').prop('checked')) {
    jQuery('.site-options .hours').show();
  } else {
    jQuery('.site-options .hours').hide();
  }
  return hoursCheck;
}());

// Site generation
jQuery('.sitemap-options .inline-option .button').on('click', function(e) {
  e.preventDefault();
  jQuery(this).addClass('disabled');
  jQuery.ajax({
    context: this,
    url: locals.ajax_url,
    method: 'post',
    data: {
      action: '_ws_generate_sitemap'
    },
    success: function(res) {
      if (res.success) {
        jQuery('.sitemap-options #last_mod').val(res.data);
        jQuery('.sitemap-options #submit').click();
      }
    }
  });
});

function initMap() {
  if (!document.getElementById('site_map')) {
    return;
  }
  var map = new google.maps.Map(document.getElementById('site_map'), {
    center: {lat: 37.09, lng: -95.71},
    scrollwheel: false,
    zoom: 4
  });
  var input = document.getElementById('site_location');
  var locId = document.getElementById('site_location_id');
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
      document.getElementById('site_location_id').value = place.place_id;
      // document.getElementById('theme_location_name').value = place.name;
      document.getElementById('site_location_street').value = number + ' ' + street + ' ' + room;
      document.getElementById('site_location_city').value = city;
      document.getElementById('site_location_state').value = state;
      document.getElementById('site_location_zip').value = zip;
      document.getElementById('site_location_country').value = country;
      // document.getElementById('theme_location_readable').value = address;
    }
  };
  autocomplete.addListener('place_changed', changePlace);
  // Show place when page loads
  google.maps.event.addListenerOnce(map, 'idle', changePlace);
}
