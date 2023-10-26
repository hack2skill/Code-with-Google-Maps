import { useState, useMemo, useCallback, useRef } from "react";
import {
    GoogleMap,
} from "@react-google-maps/api";

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

export default function Map() {
    const mapRef = useRef<GoogleMap>();
    const center = useMemo<LatLngLiteral>(
        () => ({ lat: 43.45, lng: -80.49 }),
        []
    );
    const options = useMemo<MapOptions>(
        () => ({
            mapId: "5e7d266a88c0cf9",
            disableDefaultUI: true,
            clickableIcons: false,
        }),
        []
    );
    const heatMapData = {
        positions: [
            { lat: 55.5, lng: 34.56 },
            { lat: 34.7, lng: 28.4 },
        ],
        options: {
            radius: 20,
            opacity: 0.6,
        }
    }
    const onLoad = useCallback((map) => (mapRef.current = map), []);
    return (
        <div className="container">
            <div className="controls"><h1>Business Type?</h1></div>
            <div className="map">
                <GoogleMap
                    zoom={10}
                    center={center}
                    heatmapLibrary={true}
                    heatmap={heatMapData}
                    mapContainerClassName="map-container"
                    options={options}
                    onLoad={onLoad}
                ></GoogleMap>
            </div>
        </div>
    )
}