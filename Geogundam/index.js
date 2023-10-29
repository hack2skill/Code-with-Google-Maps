let map, directionsService, directionsRenderer;
let sourceAutocomplete, destAutocomplete;
let count = 0;
let marker_overlay = [];
let printt;

let distanceElement;
let durationElement;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");  
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  
  map = new Map(document.getElementById("map"), {
    center: { lat: 30.356483, lng: 76.367790 },
    zoom: 12,
    mapId: "2461aa22738bca68"
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        map.setCenter(initialLocation);
    });
}

  window.AdvancedMarkerElement = AdvancedMarkerElement;

  const script = document.createElement("script");
  script.src = "http://localhost:8050/final_coordinates.js";
  document.getElementsByTagName("head")[0].appendChild(script);
  setInterval(loadData, 3000);

  document
    .getElementById("show-markers")
    .addEventListener("click", showMarkers);
  document
    .getElementById("hide-markers")
    .addEventListener("click", hideMarkers);

  sourceAutocomplete = new google.maps.places.Autocomplete(
    document.getElementById('from')
  );
  destAutocomplete = new google.maps.places.Autocomplete(
    document.getElementById('to')
  );

  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);


  function loadData(){
    // Find the first script element in the head tag
    const firstScript = document.querySelector("head script");
  
    // Check if a script element was found
    if (firstScript) {
      // Remove the found script element
      firstScript.parentNode.removeChild(firstScript);
    }
  
    const script = document.createElement("script");
    script.src = "http://localhost:8050/final_coordinates.js";
    document.getElementsByTagName("head")[0].appendChild(script);
  }

}

// Removes the markers from the map, but keeps them in the array.
function hideMarkers() {
  console.log("hello");
  for(let i = 0; i < marker_overlay.length; i++){
    marker_overlay[i].setMap(null);
  }
  
}

function showMarkers() {
  for(let i = 0; i < marker_overlay.length; i++){
    marker_overlay[i].setMap(map);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const hideMarkersButton = document.getElementById("hide-markers");
  const showMarkersButton = document.getElementById("show-markers");
  const submitButton = document.querySelector(".input-btn");

  // Function to change the background color of a button temporarily
  function changeButtonBackgroundColor(button, newColor, duration) {
    const originalColor = button.style.backgroundColor;
    button.style.backgroundColor = newColor;
    setTimeout(function () {
      button.style.backgroundColor = originalColor;
    }, duration);
  }

  hideMarkersButton.addEventListener("click", function () {
    // Change the background color temporarily to indicate an action
    changeButtonBackgroundColor(hideMarkersButton, "green", 100); // Change the duration and color as needed

  });

  showMarkersButton.addEventListener("click", function () {
    // Change the background color temporarily to indicate an action
    changeButtonBackgroundColor(showMarkersButton, "green", 100); // Change the duration and color as needed

  });

  submitButton.addEventListener("click", function () {
    // Change the background color of the submit button temporarily
    changeButtonBackgroundColor(submitButton, "yellow", 100); // Change the duration and color as needed

  });

});



///////////////////////////////////////////////
var directionsRenderers = [];
function calcRoute() {
  for (var i = 0; i < directionsRenderers.length; i++) {
    directionsRenderers[i].setMap(null);
  }

  var start = document.getElementById('from').value;
  var end = document.getElementById('to').value;
  var request = {
    origin: start,
    destination: end,
    travelMode: 'DRIVING',
    provideRouteAlternatives: true
  };
  
  let min = Number.MAX_SAFE_INTEGER;
  let index = 0;
  directionsService.route(request, function(result, status) {
    printt=result;
    if (status == 'OK') {
      for(var i = 0, len = result.routes.length; i < len; i++){
        //console.log("I" + i);
        let temp = findPotholes(result.routes[i]);
        console.log(temp);
        if(temp < min)
        {
          console.log("This is" + temp);
          min = temp;
          index = i;
        }
      }
      
      const criteriaSelect = document.getElementById('criteria-select');
      const selectedValue = criteriaSelect.value;
      

      if (selectedValue === 'min_distance') {
          index = 0;
      } 

      console.log("hi does this work" + index);

      displayDistanceAndDuration(result.routes[index].legs[0].distance.text, result.routes[index].legs[0].duration.text)

      document.getElementById('output').textContent = "";
      
          var directionsRenderer = new google.maps.DirectionsRenderer({
          map: map,
          directions: result,
          routeIndex: index,
          polylineOptions: {strokeColor: "red"}
        });
        directionsRenderers.push(directionsRenderer);
      
    }
    else{
      document.getElementById('output').textContent = "Error!, route not found";

    }
  });
}

function displayDistanceAndDuration(distance, duration) {
  distanceElement = document.getElementById("distance");
  durationElement = document.getElementById("duration");

  distanceElement.textContent = "Distance: " + distance;
  durationElement.textContent = "Duration: " + duration;
}

function clearRoute() {
  document.getElementById("from").value = "";
  document.getElementById("to").value = "";
  document.getElementById("output").textContent = "";
  for (var i = 0; i < directionsRenderers.length; i++) {
    directionsRenderers[i].setMap(null);
  }

  distanceElement = document.getElementById("distance");
  durationElement = document.getElementById("duration");

  distanceElement.textContent = "Distance:";
  durationElement.textContent = "Duration:";


}

let markers = [];
const geojson_callback = function (results) {
  for (let i = count; i < results.features.length; i++) {
    const coords = results.features[i].geometry.coordinates;

    var temp = [];
    runSnapToRoad(coords).then(data => {
      temp[0] = data.latitude;
      temp[1] = data.longitude;
      console.log(coords + " ===== " + temp);

      const latLng = new google.maps.LatLng(temp[0], temp[1]);
      count = results.features.length;

      const advancedMarker = new AdvancedMarkerElement({
        position: latLng,
        map: map,
        collisionBehavior: google.maps.CollisionBehavior.REQUIRED,
        //collisionBehavior: google.maps.CollisionBehavior.OPTIONAL_AND_HIDES_LOWER_PRIORITY,
      });
      marker_overlay.push(advancedMarker);
      markers.push([temp[0], temp[1]]);
    }); 
  }
};

function runSnapToRoad(path) {
  // Return a fetch promise
  return fetch('https://roads.googleapis.com/v1/snapToRoads?interpolate=true&key=' + "AIzaSyBt2sNGoU8GFDWF5suxhY2VDPrpY5gr-0o" + '&path=' + path)
    .then(response => response.json())  // Parse the JSON from the response
    .then(data => {
      data = data.snappedPoints[0].location;
      return data;  // Return the data
    })
    .catch(error => {
      console.error('Error:', error);  // Log any errors
    });
}


window.initMap = initMap;
window.initMap();


function findPotholes(result){
  let countedPotholes = new Set();
  let dummyCoordinates = [];
  for(let steps of result.legs[0].steps) {
    for(let point of steps.lat_lngs)
    {
        dummyCoordinates.push([
        point.lat(),
        point.lng()
      ]);
    }
  }

  for(let point of dummyCoordinates)
  {
    let routePoint = [point[0], point[1]];
    for (let pothole of markers) {
      if (isWithin200m(routePoint, pothole)) {
          countedPotholes.add(pothole);
      }
    }
  }
  return countedPotholes.size;
}

function isWithin200m(point1, point2) {
  let distance = calculateDistance(point1, point2);
  distance = distance * 1000
  return distance <= 25;
}

function calculateDistance(point1, point2) {
  var lat1 = point1[0];
  var lon1 = point1[1];
  var lat2 = point2[0];
  var lon2 = point2[1];

  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(degrees) {
  return degrees * (Math.PI / 180);
}




