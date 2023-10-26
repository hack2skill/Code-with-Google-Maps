import { useState } from "react";
import PlacesAutocomplete from "./combobox";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import LocationCard from "./location_info_card";

const Sidebar = ({
    setLat,
    setLng,
    setCircleColor,
    setRoute,
}) => {

    const [routeMode, setRouteMode] = useState(false);

    /* Source and destination
    {
        latlng:(lat, lng),
        data: our api response,
        info: data from google maps

    } */

    const [source, setSource] = useState(null);
    const [destination, setDestination] = useState(null);

    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');

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
                        data: data
                    }

                    isSource ?
                        setSource(locationData) : setDestination(locationData);

                    if (data.locationObject.totalRating && data.locationObject.totalRating <= 2) {
                        console.log(data.locationObject);
                        setCircleColor('red');
                    }
                    else {
                        setCircleColor('green');
                    }

                })
                .catch((error) => {
                    console.error("Error fetching details from the API:", error);
                });
        });
    }

    const findRoute = async () => {
        if (source && destination) {
            console.log(source, destination);
            const directionsService = new google.maps.DirectionsService();
            const results = await directionsService.route({
                origin: source.latlng,
                destination: destination.latlng,
                travelMode: google.maps.TravelMode.DRIVING,
            });

            const directionsRenderer = new google.maps.DirectionsRenderer();
            directionsRenderer.setDirections({ routes: [] })

            setRoute(results);
            setDistance(results.routes[0].legs[0].distance.text);
            setDuration(results.routes[0].legs[0].duration.text);
            directionsRenderer.setDirections({ routes: [] })
        }
    }

    return (
        <div className={`${routeMode || source ? 'min-h-screen bg-gray-100  shadow-md max-h-screen overflow-y-scroll' : ''} h-full w-full p-4`}>
            <PlacesAutocomplete
                source
                onAddressSelect={(address) => handleAddressSelect(address, true)}
                onDirectionChoice={() => setRouteMode(route => !route)}
            />

            {
                routeMode && (
                    <div>
                        <PlacesAutocomplete
                            onAddressSelect={(address) => handleAddressSelect(address, false)}
                            onDirectionChoice={() => setRouteMode(route => !route)}
                        />
                        <button className="bg-blue-500 text-white m-2  px-4 py-2 rounded-lg" onClick={findRoute}>Find Route</button>
                    </div>
                )
            }

            <div>
                {source && (
                    <LocationCard locationData={source} isSource={true} routeMode={routeMode} />
                )}

                {
                    (destination && routeMode) && (
                        <LocationCard locationData={destination} isSource={false} routeMode={routeMode} />
                    )
                }

            </div>

            {
                routeMode && (

                    (duration && duration) && (
                        <><p>Duration: {duration}</p><p>Distance: {distance}</p></>
                    )
                )
            }

        </div>
    );
}

export default Sidebar;