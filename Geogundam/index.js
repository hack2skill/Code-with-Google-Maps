let map, directionsService, directionsRenderer;
let sourceAutocomplete, destAutocomplete;
let count = 0;
let marker_overlay = [];

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");  
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  
  //console.log("hello")
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
    //console.log("hello");
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
    if (status == 'OK') {
      for(var i = 0, len = result.routes.length; i < len; i++){
        console.log("I" + i);
        let temp = findPotholes(result.routes[i]);
        console.log(temp);
        if(temp < min)
        {
          console.log("This is" + temp);
          min = temp;
          index = i;
        }
      }
      
      // Assume this script is run after the DOM has fully loaded
      // Assume this script is run after the DOM has fully loaded
      const criteriaSelect = document.getElementById('criteria-select');
      const selectedValue = criteriaSelect.value;

      if (selectedValue === 'min_distance') {
          index = 0;
          // Additional code to handle minimum distance selection
      } 

      document.getElementById('output').textContent = "";
      //console.log(result);

      //let arr = ["red", "green", "blue"];
      //for(var i = 0, len = result.routes.length; i < len; i++)
      //{
          var directionsRenderer = new google.maps.DirectionsRenderer({
          map: map,
          directions: result,
          routeIndex: index,
          polylineOptions: {strokeColor: "red"}
        });
        directionsRenderers.push(directionsRenderer);
      //}
    }
    else{
      document.getElementById('output').textContent = "Error!, route not found";

    }
  });
}

let markers = [];
const geojson_callback = function (results) {
  //let collisionBehavior = google.maps.CollisionBehavior.OPTIONAL_AND_HIDES_LOWER_PRIORITY;
  //console.log("yoo");
  //let collisionBehavior = google.maps.CollisionBehavior.OPTIONAL_AND_HIDES_LOWER_PRIORITY;
  //console.log(results.features.length);
  for (let i = count; i < results.features.length; i++) {
    const coords = results.features[i].geometry.coordinates;
    //console.log(coords)

    var temp = [];
    //console.log(markers);
    runSnapToRoad(coords).then(data => {
      temp[0] = data.latitude;
      temp[1] = data.longitude;
      console.log(coords + " ===== " + temp);
      //console.log(temp[0]);

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
      //console.log(markers.size);
    }); 
  }
};

function runSnapToRoad(path) {
  // Return a fetch promise
  return fetch('https://roads.googleapis.com/v1/snapToRoads?interpolate=true&key=' + "AIzaSyBt2sNGoU8GFDWF5suxhY2VDPrpY5gr-0o" + '&path=' + path)
    .then(response => response.json())  // Parse the JSON from the response
    .then(data => {
      data = data.snappedPoints[0].location;
      //console.log("this is" + temp.longitude);
      return data;  // Return the data
    })
    .catch(error => {
      console.error('Error:', error);  // Log any errors
    });
}


window.initMap = initMap;
//window.geojson_callback = geojson_callback;
window.initMap();

////////////////////////////////////////////////////////////////////////////
function findPotholes(result){
  //console.log(result)
  //console.log(result.legs[index].steps[0]);
  //console.log(result);
  //console.log("markers" + markers);
  let countedPotholes = new Set();
  let dummyCoordinates = [];
  //console.log(result.routes[0].overview_path.length);
  for(let steps of result.legs[0].steps) {
    for(let point of steps.lat_lngs)
    {
        //let routePoint = [
        //result.overview_path[i].lat(),
        //result.overview_path[i].lng()
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
  //console.log("size" + dummyCoordinates.length);
  // for (let i = 0; i < dummyCoordinates.length; i++) {
  //     let routePoint = [
  //         //result.overview_path[i].lat(),
  //         //result.overview_path[i].lng()
  //         dummyCoordinates[i][0],
  //         dummyCoordinates[i][1]
  //     ];

  //     for (let pothole of markers) {
  //         if (isWithin200m(routePoint, pothole)) {
  //             countedPotholes.add(pothole);
  //         }
  //     }
  // }

  // //console.log(countedPotholes.size);
  // return countedPotholes.size;
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




