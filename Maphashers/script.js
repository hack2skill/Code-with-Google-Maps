// Initialize the Google Map
function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 0, lng: 0 }, // Set the initial map center
        zoom: 8, // Set the initial zoom level
    });

    // Adding a marker to the map
    const marker = new google.maps.Marker({
        position: { lat: 0, lng: 0 }, // Set the marker's position
        map: map,
        title: "Green Space",
    });

    // Adding an info window to the marker
    const infowindow = new google.maps.InfoWindow({
        content: "This is a green space.",
    });

    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });

}


// Load the Google Maps JavaScript API
function loadGoogleMapsScript() {
    const script = document.createElement('script');
    script.src = `http://maps.google.com/maps/api/js?sensor=false`;
    script.defer = true;
    script.async = true;
    document.head.appendChild(script);
}

// Load the Google Maps API when the page loads
window.addEventListener('load', loadGoogleMapsScript);

document.addEventListener('DOMContentLoaded', function () {
    const getCurrentLocationButton = document.getElementById('getCurrentLocation');
    const iframe = document.getElementById('gmap_canvas');

    getCurrentLocationButton.addEventListener('click', function () {
        // Check if the Geolocation API is available in the user's browser
        if ("geolocation" in navigator) {
            // Get the user's current position
            navigator.geolocation.getCurrentPosition(function (position) {
                // Construct the new Google Maps URL with the user's latitude and longitude
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const newMapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&z=13&ie=UTF8&iwloc=&output=embed`;

                // Update the iframe's src with the new map URL
                iframe.src = newMapUrl;

                // Display an alert to the user
                alert("Map updated with your current location.");
            });
        } else {
            alert("Geolocation is not available in your browser.");
        }
    });
});

function updateMapWithSearchLocation() {
    const placeInput = document.getElementById('placeInput');
    const searchButton = document.getElementById('searchButton');
    const iframe = document.getElementById('gmap_canvas');
    const geocoder = new google.maps.Geocoder();

    searchButton.addEventListener('click', () => {
        const placeName = placeInput.value;

        geocoder.geocode({ address: placeName }, (results, status) => {
            if (status === 'OK' && results[0]) {
                const location = results[0].geometry.location;
                const latitude = location.lat();
                const longitude = location.lng();
                
                alert(`Coordinates: Latitude - ${latitude}, Longitude - ${longitude}`);
                const newMapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&z=13&ie=UTF8&iwloc=&output=embed`;
                iframe.src = newMapUrl;
                alert("Map updated with your current location.");
            
            } else {
                alert('Location not found');
            }
        });
    });
}

function initMap() {
    navigator.geolocation.getCurrentPosition(function (position) {
        // Construct the new Google Maps URL with the user's latitude and longitude
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: latitude, lng: longitude }, // Set your current location's coordinates
            zoom: 15, // Adjust the zoom level as needed
        });

        // Create a circle with a 500-meter radius around the center
        const circle = new google.maps.Circle({
            map: map,
            center: map.getCenter(),
            radius: 500, 
            fillColor: '#00FF00', 
            fillOpacity: 0.2, 
            strokeColor: '#00FF00', 
            strokeOpacity: 0.8, 
            strokeWeight: 2, 
        });
    });
}

// Load the Google Maps API when the page loads
function loadGoogleMapsScript() {
    const script = document.createElement('script');
    script.src = `http://maps.google.com/maps/api/js?sensor=false`;
    script.defer = true;
    script.async = true;
    document.head.appendChild(script);
}

window.addEventListener('load', loadGoogleMapsScript);

// if ("geolocation" in navigator) {
//     navigator.geolocation.getCurrentPosition(function (position) {
//         const latitude = position.coords.latitude;
//         const longitude = position.coords.longitude;
//         const newMapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&z=13&ie=UTF8&iwloc=&output=embed`;

//         iframe.src = newMapUrl;
//         alert("Map updated with your current location.");
//     });
// } else {
//     alert("Geolocation is not available in your browser.");
// }


const getSearchLocationButton = document.getElementById('searchButton');
getSearchLocationButton.addEventListener('click', updateMapWithSearchLocation);

// // Function to get directions using Google Maps Directions API
// function getDirections() {
//     const directionsService = new google.maps.DirectionsService();
//     const directionsDisplay = new google.maps.DirectionsRenderer();
//     directionsDisplay.setMap(map);

//     const request = {
//         origin: 'Starting Location',
//         destination: 'Ending Location',
//         travelMode: 'DRIVING' // You can choose different travel modes
//     };

//     directionsService.route(request, function (response, status) {
//         if (status === 'OK') {
//             directionsDisplay.setDirections(response);
//         } else {
//             alert('Directions request failed');
//         }
//     });
// }

// // Function to search for places using Google Maps Places API
// function searchPlaces() {
//     const placesService = new google.maps.places.PlacesService(map);

//     const request = {
//         location: { lat: 0, lng: 0 }, // Specify a location for nearby search
//         radius: 1000, // Specify the search radius in meters
//         keyword: 'restaurant' // Specify a keyword to search for
//     };

//     placesService.nearbySearch(request, function (results, status) {
//         if (status === google.maps.places.PlacesServiceStatus.OK) {
//             // Handle the list of places in the results
//         } else {
//             alert('Places request failed');
//         }
//     });
// }

// // Function to get elevation data using Google Maps Elevation API
// function getElevation() {
//     const elevator = new google.maps.ElevationService();

//     const locations = [
//         { location: { lat: 0, lng: 0 } }, // Add coordinates for elevation data
//     ];

//     elevator.getElevationForLocations({ locations }, function (results, status) {
//         if (status === 'OK') {
//             // Handle elevation data in the results
//         } else {
//             alert('Elevation request failed');
//         }
//     });
// }

// // Function to get traffic data using Google Maps Traffic Layer
// function getTraffic() {
//     const trafficLayer = new google.maps.TrafficLayer();
//     trafficLayer.setMap(map);
// }


