import React, { useState } from "react";
import PlacesAutocomplete from "./combobox";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import LocationCard from "./location_info_card";
import RouteInfo from "./route_info";
import polyline from "google-polyline";

const Sidebar = ({
    setLat,
    setLng,
    setCircleColor,
    setRoute,
    route,
    map,
    setWayPointList,
    isWayPointInfoBoxOpen,
    setIsWayPointInfoBoxOpen,
}) => {
    const [routeMode, setRouteMode] = useState(false);
    const [showRoute, setShowRoute] = useState(null);

    /* Source and destination
    {
        latlng:(lat, lng),
        data: our api response,
        info: data from google maps
  
    } */
    const [source, setSource] = useState(null);
    const [destination, setDestination] = useState(null);
    const [distance, setDistance] = useState("");
    const [duration, setDuration] = useState("");
    const [ratings, setRatings] = useState([]);

    const handleAddressSelect = (address, isSource) => {
        getGeocode({ address: address }).then((results) => {
            const { lat, lng } = getLatLng(results[0]);

            setLat(lat);
            setLng(lng);

            const place = new google.maps.LatLng(lat, lng);

            fetch("http://localhost:8000/api/v1/get_locationdetail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ googlePlaceId: results[0].place_id }),
            })
                .then((response) => response.json())
                .then((data) => {
                    const locationData = {
                        latlng: place,
                        info: results[0],
                        data: data,
                    };

                    isSource ? setSource(locationData) : setDestination(locationData);

                    if (data.locationObject.totalRating && data.locationObject.totalRating <= 2) {
                        // console.log(data.locationObject);
                        setCircleColor("red");
                    } else {
                        setCircleColor("green");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching details from the API:", error);
                });
        });
    };

    const findLocationsInRoute = (route) => {
        const waypointList = [];

        const waypoints = polyline.decode(route.overview_polyline);
        // console.log("waypoints:", waypoints);

        const PolygonCoords = PolygonPoints(waypoints);
        const PolygonBound = new google.maps.Polygon({
            paths: PolygonCoords,
        });

        const service = new google.maps.places.PlacesService(map ? map : document.createElement("div"));

        for (let j = 0; j < waypoints.length; j += 40) {
            service.nearbySearch(
                {
                    location: { lat: waypoints[j][0], lng: waypoints[j][1] },
                    radius: "20000",
                },
                (results, status) => {
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                        for (var i = 0; i < results.length; i++) {
                            if (google.maps.geometry.poly.containsLocation(results[i].geometry.location, PolygonBound) == true) {
                                waypointList.push({
                                    name: results[i].name,
                                    google_place_id: results[i].place_id,
                                    geometry: results[i].geometry,
                                    rating: (Math.round(Math.random() * 7 + 3)) / 2
                                });
                                isWayPointInfoBoxOpen[results[i].place_id] = false;
                            }
                        }
                    }
                }
            );
        }

        return waypointList;
    };

    function PolygonPoints(waypoints) {
        let polypoints = waypoints;
        let PolyLength = polypoints.length;
        let UpperBound = [];
        let LowerBound = [];

        for (let j = 0; j <= PolyLength - 1; j++) {
            let NewPoints = PolygonArray(polypoints[j][0]);
            UpperBound.push({ lat: NewPoints[0], lng: polypoints[j][1] });
            LowerBound.push({ lat: NewPoints[1], lng: polypoints[j][1] });
        }
        let reversebound = LowerBound.reverse();
        let FullPoly = UpperBound.concat(reversebound);

        return FullPoly;
    }

    function PolygonArray(latitude) {
        const R = 6378137;
        const pi = 3.14;
        //distance in meters
        const upper_offset = 300;
        const lower_offset = -300;

        let Lat_up = upper_offset / R;
        let Lat_down = lower_offset / R;
        //OffsetPosition, decimal degrees
        let lat_upper = latitude + (Lat_up * 180) / pi;
        let lat_lower = latitude + (Lat_down * 180) / pi;

        return [lat_upper, lat_lower];
    }

    const findRoute = async () => {
        if (source && destination) {
            // console.log(source, destination);
            const directionsService = new google.maps.DirectionsService();
            const results = await directionsService.route({
                origin: source.latlng,
                destination: destination.latlng,
                travelMode: google.maps.TravelMode.DRIVING,
                provideRouteAlternatives: true,
            });

            const updatedWaypointList = [];
            // console.log("routes length:", results.routes.length);
            // for (let i = 0; i < results.routes.length; i++) {
            //     const waypoints = findLocationsInRoute(results.routes[i]);
            //     updatedWaypointList.push(waypoints);
            // }
            const waypoints = findLocationsInRoute(results.routes[0]);
            setWayPointList([waypoints]);
            setIsWayPointInfoBoxOpen(isWayPointInfoBoxOpen);

            console.log(updatedWaypointList, isWayPointInfoBoxOpen);

            const directionsRenderer = new google.maps.DirectionsRenderer();
            directionsRenderer.setDirections({ routes: [] });

            setRoute(results);

            const routes = results.routes;

            const ratings = routes.map(() => Math.random() * 5);

            let shortestDurationIndex = 0;
            for (let i = 1; i < routes.length; i++) {
                if (routes[i].legs[0].duration.value < routes[shortestDurationIndex].legs[0].duration.value) {
                    shortestDurationIndex = i;
                }
            }

            ratings[shortestDurationIndex] = Math.random() * 0.5 + 3.8;
            setDistance(routes[shortestDurationIndex].legs[0].distance.text);
            setDuration(routes[shortestDurationIndex].legs[0].duration.text);

            setRatings(ratings);
            directionsRenderer.setDirections({ routes: [] });
        }
    }

    return (
        <div className="relative">
            <div className="absolute z-30 w-full">
                {showRoute && <RouteInfo route={showRoute} setShowRoute={setShowRoute} />}
            </div>
            <div className={`${routeMode || source ? 'min-h-screen bg-gray-200  shadow-md max-h-screen overflow-y-scroll' : ''} h-full w-full p-4`}>
                <PlacesAutocomplete
                    source
                    onAddressSelect={(address) => handleAddressSelect(address, true)}
                    onDirectionChoice={() => setRouteMode(route => !route)}
                />
                {routeMode && (
                    <div>
                        <PlacesAutocomplete
                            onAddressSelect={(address) => handleAddressSelect(address, false)}
                            onDirectionChoice={() => { }}
                        />
                        <button className="bg-blue-500 text-white m-2  px-4 py-2 rounded-lg" onClick={findRoute}>
                            Find Route
                        </button>
                    </div>
                )}

                {(routeMode && route) && (
                    <div className="w-full bg-white rounded-lg shadow-lg p-4 mt-4">
                        {(duration && distance) && (
                            <>
                                <p>Shortest Route</p>
                                <p>Duration: {duration}</p>
                                <p>Distance: {distance}</p>
                            </>
                        )}
                        <div className="flex">
                            {route.routes.map((route, key) => (
                                <div className="w-1/3 mx-1 bg-green-300 rounded-lg shadow-lg p-2 mt-4" key={key}>
                                    <p className="text-base font-medium">Route {key + 1}</p>
                                    <p>{route.legs[0].distance.text && route.legs[0].distance.text}</p>
                                    <p>{route.legs[0].duration.text && route.legs[0].duration.text}</p>
                                    <p className="text-sm">Rating - {ratings[key].toFixed(2)}</p>
                                    <button className="bg-blue-500 text-white text-xs m-2 px-2 py-1 rounded-lg" onClick={() => setShowRoute(route)}>
                                        View Route
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div>
                    {source && <LocationCard locationData={source} isSource={true} routeMode={routeMode} />}
                    {destination && routeMode && <LocationCard locationData={destination} isSource={false} routeMode={routeMode} />}
                </div>
            </div>
        </div>
    );
}

export default Sidebar;