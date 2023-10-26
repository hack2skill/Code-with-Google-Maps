import { useState, useMemo, useCallback, useRef } from "react";
import {
    GoogleMap,
    HeatmapLayer,
    HeatmapLayerProps,
    HeatmapLayerF
} from "@react-google-maps/api";

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;
type heatMapOptions = google.maps.visualization.HeatmapLayerOptions

export default function Map() {
    const mapRef = useRef<GoogleMap>();
    const center = useMemo<LatLngLiteral>(
        () => ({ lat: 43.45, lng: -80.49 }),
        []
    );
    const onLoad = useCallback((map) => (mapRef.current = map), []);
    const options = useMemo<MapOptions>(
        () => ({
            mapId: "5e7d266a88c0cf9",
            disableDefaultUI: true,
            clickableIcons: false,
        }),
        []
    );
    const heatMapOptions = useMemo<heatMapOptions>(
        () => ({
            gradient: [
                "rgba(0, 255, 255, 0)",
                "rgba(0, 255, 255, 1)",
                "rgba(0, 191, 255, 1)",
                "rgba(0, 127, 255, 1)",
                "rgba(0, 63, 255, 1)",
                "rgba(0, 0, 255, 1)",
                "rgba(0, 0, 223, 1)",
                "rgba(0, 0, 191, 1)",
                "rgba(0, 0, 159, 1)",
                "rgba(0, 0, 127, 1)",
                "rgba(63, 0, 91, 1)",
                "rgba(127, 0, 63, 1)",
                "rgba(191, 0, 31, 1)",
                "rgba(255, 0, 0, 1)",
            ],
            opacity: 2,
            radius: 50
        }),
        []
    );
    var heatMapData = [
        { location: new google.maps.LatLng(37.782, -122.447), weight: 20 },

    ];
    var sanFrancisco = new google.maps.LatLng(37.774546, -122.433523);

    // const onLoad = useCallback((map) => (mapRef.current = map), []);
    return (
        <div className="container">
            <div className="controls"><h1>Business Type?</h1></div>
            <div id="map" className="map">
                <GoogleMap
                    zoom={10}
                    center={sanFrancisco}
                    mapContainerClassName="map-container"
                    options={options}
                    onLoad={onLoad}
                >
                    <HeatmapLayerF
                        data={heatMapData}
                        options={heatMapOptions}

                    />
                </GoogleMap>
            </div>
        </div>
    )
}