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
        })
    }, [])
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyCLl4vXNus3Wf4McGMt3gGpwap_kzGIMHk",
        libraries: ['places'],
    })
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
                }}
                onLoad={map => setMap(map)}
            >
                <Marker
                    position={center}
                    onDragEnd={(e) => {
                        props.setMarkerPosition(e.latLng.toJSON());
                    }}
                    draggable={true}
                />
            </GoogleMap>
        </div>
    );
};

export default MapContainer;
