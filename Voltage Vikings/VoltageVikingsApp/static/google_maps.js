$.getScript( "https://maps.googleapis.com/maps/api/js?key=" + google_api_key + "&libraries=places")
.done(function( script, textStatus ) {
    google.maps.event.addDomListener(window, "load", initMap)
})
$.getScript( "https://maps.googleapis.com/maps/api/js?key=" + google_api_key + "&libraries=places")
.done(function( script, textStatus ) {
    window.addEventListener("load", initMap);
});
function initMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
    var map = new google.maps.Map(document.getElementById('map-route'), {
        zoom: 7,
        center: {lat: lat_a, lng: long_a}
    });
    directionsDisplay.setMap(map);
    calculateAndDisplayRoute(directionsService, directionsDisplay);

}
function calculateAndDisplayRoute(directionsService, directionsDisplay) {

    directionsService.route({
        origin: origin,
        destination: destination,
        travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
    var startMarker = new google.maps.Marker({
                position: response.routes[0].legs[0].start_location,
                map: directionsDisplay.getMap(),
              icon: {
                 url: src_url,
                 scaledSize: new google.maps.Size(50, 50),
                 labelOrigin: new google.maps.Point(120, 25)
                },
    });
    var endMarker = new google.maps.Marker({
        position: response.routes[0].legs[0].end_location,
        map: directionsDisplay.getMap(),
        icon: {
             url: des_url,
            scaledSize: new google.maps.Size(50, 50),
             labelOrigin: new google.maps.Point(110, 25)// Set the width and height of the marker icon in pixels
        },
    });
    }
   else {
    alert('Directions request failed due to ' + status);
    window.location.assign("/route")
  }
    });
}

