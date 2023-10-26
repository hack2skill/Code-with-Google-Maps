import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import {
    GoogleMap,
    HeatmapLayer,
    HeatmapLayerProps,
    HeatmapLayerF
} from "@react-google-maps/api";
import Places from "./places"

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;
type heatMapOptions = google.maps.visualization.HeatmapLayerOptions

export default function Map() {
    const mapRef = useRef<GoogleMap>();
    const center = useMemo<LatLngLiteral>(
        () => ({ lat: 12.9682704, lng: 74.8065197 }),
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
            opacity: 2,
            radius: 100
        }),
        []
    );

    const [businessData, setBusinessData] = useState([]);

    useEffect(() => {
        async function fetchData() {
        try {
            const response = await fetch('/api/popular_times'); // Replace with your actual Flask API endpoint
            if (response.ok) {
                const data = await response.json();
                setBusinessData(data);
            } else {
            console.error('Failed to fetch business data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
        }

        fetchData();
    }, []);

    let heatMapData = [];

    for (let i = 0; i < businessData.length; i++) {
        let data = {
            location: new google.maps.LatLng(businessData[i].coordinates.lat, businessData[i].coordinates.lng),
            weight: businessData[i].weekly_sum
        };
        heatMapData.push(data);
    }
    console.log(heatMapData)

    const [business, setBusiness] = useState<LatLngLiteral>();
    // const onLoad = useCallback((map) => (mapRef.current = map), []);
    return (
        <div className="container">
            <div className="controls">
                <h1>Business Type?</h1>
                <Places setBusiness={
                    (position) => {
                        setBusiness(position);
                        mapRef.current?.panTo(position)
                    }
                } />
            </div>
            <div id="map" className="map">
                <GoogleMap
                    zoom={10}
                    center={center}
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