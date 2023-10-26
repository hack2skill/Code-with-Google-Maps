let map;
let backgroundMap;
let autocomplete;
let userMarker;
let hospitalMarker;
let mallMarker;
let trainStationMarker;
let markersArray = [];

const apiKey = "YOUR_API_KEY_HERE"; 


function initMap() {
    const bounds = new google.maps.LatLngBounds();
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 55.53, lng: 9.4 },
        zoom: 10,
        disableDefaultUI: true,
    });
    backgroundMap = new google.maps.Map(document.getElementById("backgroundMap"), {
        center: { lat: 55.53, lng: 9.4 },
        zoom: 10,
        disableDefaultUI: false,
    });

//centre the map based on given location

function updateBackgroundMap(location) {
        map.setCenter(location);
    }

function updateBackgroundMap(location) {
const backgroundBounds = new google.maps.LatLngBounds(location);
backgroundMap.fitBounds(backgroundBounds);
}

//geocode the address 
function geocodeAddress(geocoder, address, callback) {
        geocoder.geocode({ address: address }, (results, status) => {
            if (status === "OK" && results[0]) {
                const location = {
                    lat: results[0].geometry.location.lat(),
                    lng: results[0].geometry.location.lng(),
                };
                callback(location);

            // Update the background map 
                updateBackgroundMap(location);
            } else {
                callback(null);
            }
        });
    }

    const geocoder = new google.maps.Geocoder();
    const service = new google.maps.DistanceMatrixService();


    //creating  an autocomplete object
    const input = document.getElementById("address");
    autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo("bounds", map);

    document.getElementById("getProximityGrading").addEventListener("click", () => {
        const address = input.value;
        geocodeAddress(geocoder, address, (location) => {
            if (location) {
                userMarker = new google.maps.Marker({
                    position: location,
                    map: backgroundMap,
                    title: "Your Location"
                });

                findClosestBigHospital(location);
                findNearestShoppingMall(location);
                findNearestTrainStation(location);
                calculateTransitAndRetailProximity(location);
                fetchAirQuality(location);
            } else {
                document.getElementById("response").innerText = "Address not found. Please enter a valid address.";
            }
        });
    });

}


function findClosestBigHospital(location) {
    const request = {
        location,
        rankBy: google.maps.places.RankBy.DISTANCE, //this finds the closest hospital
        types: ["hospital"],
    };

    const service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
            const closestHospital = results[0];
            if (closestHospital) {
                const closestHospitalName = closestHospital.name;
                const proximityScore = calculateProximityScore(location, closestHospital.geometry.location);
                const distance = calculateDistance(location, closestHospital.geometry.location);

                // Emergency Services Proximity Score box with the hospital name, distance, and proximity score
                document.getElementById("proximity-score").innerText =

                    "Hospital Name: " + closestHospitalName +
                    "\nDistance: " + distance.toFixed(2) + " km" +
                    "\nProximity Score: " + proximityScore.toFixed(2);

                // we can marker for the hospital
                hospitalMarker = new google.maps.Marker({
                    position: closestHospital.geometry.location,
                    map: backgroundMap,
                    title: closestHospitalName
                });
            } else {
                document.getElementById("proximity-score").innerText = "No big hospitals found within the specified radius.";
            }
        } else {
            document.getElementById("proximity-score").innerText = "No big hospitals found within the specified radius.";
        }
    });
}

function findNearestShoppingMall(location) {
    const request = {
        location,
        rankBy: google.maps.places.RankBy.DISTANCE,
        types: ["shopping_mall"],
    };

    const service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
            const nearestMall = results[0];
            if (nearestMall) {
                const mallName = nearestMall.name;
                const proximityScore = calculateProximityScore(location, nearestMall.geometry.location);
                const distance = calculateDistance(location, nearestMall.geometry.location);

                if (mallMarker) {
                    mallMarker.setMap(null);
                }
                mallMarker = new google.maps.Marker({
                    position: nearestMall.geometry.location,
                    map: backgroundMap,
                    title: mallName
                });
            }
        }
    });
}

function findNearestTrainStation(location) {
    const request = {
        location,
        rankBy: google.maps.places.RankBy.DISTANCE,
        types: ["train_station"],
    };

    const service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
            const nearestStation = results[0];
            if (nearestStation) {
                const stationName = nearestStation.name;
                const proximityScore = calculateProximityScore(location, nearestStation.geometry.location);
                const distance = calculateDistance(location, nearestStation.geometry.location);

      
                if (trainStationMarker) {
                    trainStationMarker.setMap(null);
                }
                trainStationMarker = new google.maps.Marker({
                    position: nearestStation.geometry.location,
                    map: backgroundMap,
                    title: stationName
                });
            }
        }
    });
}

function calculateProximityScore(userLocation, location) {
    const distance = (1-calculateDistance(userLocation, location)/100)*100;

    return distance;
}

//using the haversine formula, we can calculate distance
function calculateDistance(userLocation, location) {
    const rad = Math.PI / 180;
    const lat1 = userLocation.lat;
    const lon1 = userLocation.lng;
    const lat2 = location.lat();
    const lon2 = location.lng();

    const earthRadius = 6371; 
    const dLat = rad * (lat2 - lat1);
    const dLon = rad * (lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad * lat1) * Math.cos(rad * lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;

    return distance;
}

function calculateTransitAndRetailProximity(userLocation) {
    // we define locations of interest for transit and retail
    const locationsOfInterest = [
        { name: "Train Station", type: "train_station" },
        { name: "Taxi Stand", type: "taxi_stand" },
        { name: "Subway Station", type: "subway_station" },
        { name: "Movie Theatre", type: "movie_theater" },
        { name: "Shopping Mall", type: "shopping_mall" }
    ];

    const numLocations = locationsOfInterest.length;
    let totalNormalizedScore = 0;

    locationsOfInterest.forEach((locationOfInterest) => {
        const request = {
            location: userLocation, // Using user's location as the reference point we find closest similar to the hospital
            rankBy: google.maps.places.RankBy.DISTANCE,
            types: [locationOfInterest.type],
        };

        const service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
                const closestPlace = results[0];
                if (closestPlace) {
                    const proximityScore = calculateProximityScore(userLocation, closestPlace.geometry.location);
                    totalNormalizedScore += proximityScore;

                    // displaying the name and distance of the closest significant place
                    const placeName = closestPlace.name;
                    const placeDistance = calculateDistance(userLocation, closestPlace.geometry.location);
                    document.getElementById("transit-score").innerText +=
                        locationOfInterest.name + ": " +
                        "\nName: " + placeName +
                        "\nDistance: " + placeDistance.toFixed(2) + " km" +
                        "\nProximity Score: " + proximityScore.toFixed(2) +
                        "\n-----------------------";
                }
            }

            // here we calculate the average normalized score and display it
            if (locationsOfInterest.indexOf(locationOfInterest) === numLocations - 1) {
                const averageNormalizedScore = totalNormalizedScore / numLocations;
                document.getElementById("transit-score").innerText =
                    "Transit and Retail Proximity Score" +
                    "\nAverage Normalized Score: " + averageNormalizedScore.toFixed(2) +
                    "\n-----------------------\n" +
                    document.getElementById("transit-score").innerText;
            }
        });
    });
}

function fetchAirQuality(location) {
    const apiUrl = "https://airquality.googleapis.com/v1/currentConditions:lookup?key=" + apiKey;
    const data = {
        location: {
            latitude: location.lat,
            longitude: location.lng,
        },
    };

    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.indexes && data.indexes.length > 0) {
                const airQuality = data.indexes[0].displayName;
                const aqi = data.indexes[0].aqi;
                const dominantPollutant = data.indexes[0].dominantPollutant;
                const dominantPollutantConcentration = data.indexes[0].concentration;

                // we update the result box after getting the AQI score, Pollutant and its concentration
                document.getElementById("quality-score").innerText =
                    "Quality Score" +
                    "\nAir Quality: " + airQuality +
                    "\nAQI: " + aqi +
                    "\nDominant Pollutant: " + dominantPollutant +
                    "\nConcentration: " + dominantPollutantConcentration;
            } else {
                document.getElementById("quality-score").innerText = "Air Quality data not available.";
            }
        })
        .catch((error) => {
            document.getElementById("quality-score").innerText = "Failed to fetch Air Quality data.";
        });
}

window.initMap = initMap;