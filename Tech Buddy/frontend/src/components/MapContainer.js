import React, { useEffect, useState } from "react";
// import { Map, GoogleApiWrapper, Marker } from "@react-google-maps/api";
import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    Autocomplete,
    DirectionsRenderer,
} from '@react-google-maps/api'
import { SkeletonText } from "@chakra-ui/react";

const MapContainer = (props) => {
    const [center, setCenter] = useState({ lat: 48.8584, lng: 2.2945 });
    const [map, setMap] = useState(/** @type google.maps.Map */(null))
    // const [markerPosition, setMarkerPosition] = useState(null);
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
        libraries: ['places'],
    })
    async function snapToNearestRoad({lat,lng}) {
        // console.log(lat)

        // eslint-disable-next-line no-undef
        const latlng = new google.maps.LatLng(lat, lng);
        // eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService()
        const results = await directionsService.route({
          origin: latlng,
          destination: latlng,
          // eslint-disable-next-line no-undef
          travelMode: google.maps.TravelMode.DRIVING,
        })
        setCenter(results.routes[0].legs[0].start_location)
      }
  
    


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(posi => {
            setCenter({
                lat: posi.coords.latitude,
                lng: posi.coords.longitude
            })
            props.setMarkerPosition({
                lat: posi.coords.latitude,
                lng: posi.coords.longitude
            })
            snapToNearestRoad({
                lat: posi.coords.latitude,
                lng: posi.coords.longitude
            });
        })
        
    }, [])
   
    if (!isLoaded) {
        return <SkeletonText />
    }
    return (
        <div style={{ width: '100%', height: '400px' }}>
            <GoogleMap
                center={center}
                zoom={15}
                mapContainerStyle={{ width: '100%', height: '100%' }}
                options={{
                    zoomControl: false,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                    draggingCursor:false,
                    draggableCursor:false,
                    draggable: false
                }}
                onLoad={map => setMap(map)}
            >
                <Marker
                    position={center}
                    onDragEnd={(e) => {
                        props.setMarkerPosition(e.latLng.toJSON());
                        snapToNearestRoad(e.latLng.toJSON())
                    }}
                    draggable={true}
                />
            </GoogleMap>
        </div>
    );
};

export default MapContainer;


