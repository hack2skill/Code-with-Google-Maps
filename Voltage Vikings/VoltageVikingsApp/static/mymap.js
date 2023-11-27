var map;
var directionsService;
var directionsDisplay;
var startMarker;
var endMarker;
var intervalId,intervalId1;
var currentZoom;
var currentCenter;
var f = 0;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center:origin,
    zoom: 45
  });
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
  directionsDisplay.setMap(map);
  updateMapWithCurrentLocation();
  startJourney();
}
function updateMapWithCurrentLocation() {
    if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position) {
        var currentLocation = {
            lat: position.coords.latitude,
          lng: position.coords.longitude
        };

    var updatedRequest = {
        origin: currentLocation,
        destination:destination,
        travelMode: 'DRIVING'
    };
    directionsService.route(updatedRequest, function (result, status) {
        if (status == 'OK') {
            directionsDisplay.setDirections(result);
            startMarker = new google.maps.Marker({
                position: result.routes[0].legs[0].start_location,
                map: directionsDisplay.getMap(),
                icon: {
                    url: src_url,
                    scaledSize: new google.maps.Size(50, 50),
                    labelOrigin: new google.maps.Point(120, 25)
                },
                label: {
                    text: 'You are here now!!',
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: '16px'
                }
            });
            var endMarker = new google.maps.Marker({
                position: result.routes[0].legs[0].end_location,
                map: directionsDisplay.getMap(),
                icon: {
                    url: des_url,
                    scaledSize: new google.maps.Size(50, 50),
                    labelOrigin: new google.maps.Point(110, 25)
                },
                label: {
                    text: 'Your destination!!',
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: '16px'
                }
            });

                        var route = directionsDisplay.getDirections().routes[0];
                        var nextInstruction = route.legs[0].steps[0].instructions;
                        var remainingDistance = route.legs[0].distance.value - route.legs[0].steps[0].distance.value;
                        if (remainingDistance < 50) {
                           var confirmed = confirm("You Reached Your Destination");
                           reached(confirmed);
                        }
                        if (remainingDistance < 1000) {
                            remainingDistance = remainingDistance + " meters";
                        } else {
                            remainingDistance = (remainingDistance / 1000).toFixed(1) + " km";
                        }
                        console.log(remainingDistance);

                         document.getElementById("distance_remaining").innerHTML = "Distance Remaining: " + remainingDistance;
                        document.getElementById("myRoute").innerHTML = "Next Direction: " + nextInstruction;

        }
    });
        });
        }
    if (f != 1) {
        startJourney();
        f = 1;
    }
}
function startJourney() {
    intervalId = setInterval(updateMapWithCurrentLocation,120000);
    intervalId1 = setInterval(setc,10000);
}
function back() {
    console.log("Came Herer!!!!!!");
    window.alert("You will be redirected to home page!!!");
}
function setc() {
  map.setZoom(17);
  map.setCenter(startMarker.getPosition());
}
function homeback() {
    var confirmed = confirm("Are you sure!!!\nIf yes then you will be redirected to nearby pages");
    if (confirmed) {
        map = null;
        directionsDisplay.setMap(map);
        clearInterval(intervalId);
        clearInterval(intervalId1);
        directionsService = null;
        directionsDisplay = null;
        history.replaceState(null, null, "/nearbyhome");
        window.addEventListener('popstate', function(event) {
            history.replaceState(null, null, "/nearbyhome");
        });
        window.location.href = "/nearbyhome";
    }
}

function stationback() {
    var confirmed = confirm("Are you sure!!!\nIf yes then you will be redirected to nearby pages");
    if (confirmed) {
        map = null;
        directionsDisplay.setMap(map);
        clearInterval(intervalId);
        clearInterval(intervalId1);
        directionsService = null;
        directionsDisplay = null;
        history.replaceState(null, null, "/nearbystations");
        window.addEventListener('popstate', function(event) {
            history.replaceState(null, null, "/nearbystations");
        });
        window.location.href = "/nearbystations";
    }
}

function reached(confirmed){
 if (confirmed) {
        map = null;
        directionsDisplay.setMap(map);
        clearInterval(intervalId);
        clearInterval(intervalId1);
        directionsService = null;
        directionsDisplay = null;
        if(page){
        history.replaceState(null, null, "/home");
        window.addEventListener('popstate', function(event) {
            history.replaceState(null, null, "/home");
        });
        window.location.href = "/final_pay/"+txn_id;
        }
        else{
        history.replaceState(null, null, "/home");
        window.addEventListener('popstate', function(event) {
            history.replaceState(null, null, "/home");
        });
        window.location.href = "/home";
        }
    }
}


