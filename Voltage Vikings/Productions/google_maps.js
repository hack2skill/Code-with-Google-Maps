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
            url: 'https://lh3.googleusercontent.com/pw/AJFCJaV_V4kG0TGtt-joloe4Feo-m9bsB0VuudeW7LYQJAv7_KHZ19XJidWDEnQUSKqO83EmZ8ocM1QFvRkOzq-gS2Qo64O3CZLBGigT3BXK9B3yiDxEGgT6W1YaSi6DWDgSVmid5Lg_-cLkksZWCytwz9iIkIGyKyI4639Ch6vk43-tr6eJgOuNxXPFsW_KH_h2-Io2dNSJu4ecWTZ7zX1vUbV1uc52dYZnbszTMSexxaWU_p16L0LNfMTLXxTVZvy_4TXIUP-5L4k1cKaIyjiGzeQdEfLjpGc6IOs5NrgXVWRily5qm9NX7Hegev3ogomO5ED-7IFcKEi81KkDa1laeTjjmRCeVHC8BgPm55DgUArL3d0qQeDyRwcVBis-D1mW5fZl9vUC5foaGzXW4p2uMpJcwKJj1jjsQPg7f0uGs6Rout79tY_hsof1-rgDWCwI-AjqxTq64DG2qmEMf0RD-7rsXVlLUZqILIM0GOGrtCCHKDfA9TwbCF3x2WZYHHXxRcuQ3Eb9wvEpAqL_sOPZ98XJD9jb4gw_L7xSiocMt5rZao6JxX3F-5Z39_a0L_LLj_PPxqt_b0UT2flmtc_Ah_zh3tnAYgL4ngzavCTAqxz0qoFpuLtwnEsbYySiKMpTgH2rVfHaUQBa5h_l9MCMYA9CxEAdnCicB4Py_eIdHQEWaA24PWKvWjuuw2EzlMtQ3v-44na7HbrkLzDPbjyW0X83ljCSwde5e8SiTfgfaK76Uee_J-8mRiIdkIozuMRi4c3p-C_omcVBPD8VhHMorp9nGTQLh9DIntjWkDMvSmvRuoj6RYSd-g2IHxFk-KL_epfEqlaaMM1CMcSQZRLaTzGlE880EJJJXONvGsPuZLraoe3A-F61vtlCy9KT-AeHtrSXaZW9aP49Dabgc7dEJiQnHrgI7K-jRDSZl2Z94liVBgrJ8HEsdG6h8oU0-WP_Mr9XYdafM-AftA_th7jwAxqoM13Xz57uVJ5nsOHR3fk4doXwZLZFWFSxAZ_C39ktdZxIIgsAJe7kG6dTEURPS41VELHyXzhKAWalypJp=w512-h512-s-no?authuser=0', // Replace with the URL to your custom start marker icon
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

