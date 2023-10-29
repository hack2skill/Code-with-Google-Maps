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

interface BusinessDataItem {
    coordinates: {
        lat: number;
        lng: number;
    };
    weekly_sum: number;
}
interface HeatMapDataItem {
    location: google.maps.LatLng;
    weight: number;
}
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
    
    let heatMapData = [];
    const [businessData, setBusinessData] = useState<BusinessDataItem[]>([]);
    // const [heatMapData, setHeatMapData] = useState<HeatMapDataItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/popular_times');
                if (response.ok) {
                    const data = await response.json() as BusinessDataItem[];
                    setBusinessData(data);
                } else {
                    console.error('Failed to fetch business data');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }

        async function setData() {
            // await fetchData();
            console.log(businessData.length)
            let temp: HeatMapDataItem[] = []
            for (let i = 0; i < businessData.length; i++) {
                let data = {
                    location: new google.maps.LatLng(businessData[i].coordinates.lat, businessData[i].coordinates.lng),
                    weight: businessData[i].weekly_sum
                };
                heatMapData.push(data);
            }
            // setHeatMapData(temp);
        }

        async function Loading(){
            await setData();
            setIsLoading(false)
        }
        Loading();

    }, []);
    console.log(businessData.length)
    
    const dataa = [
        {
          "coordinates": {
            "lat": 12.9682704,
            "lng": 74.8065197
          },
          "weekly_sum": 5307
        },
        {
          "coordinates": {
            "lat": 12.9883174,
            "lng": 74.8005921
          },
          "weekly_sum": 3800
        },
        {
          "coordinates": {
            "lat": 13.0223759,
            "lng": 74.8079575
          },
          "weekly_sum": 5655
        },
        {
          "coordinates": {
            "lat": 12.9894559,
            "lng": 74.8015439
          },
          "weekly_sum": 3798
        },
        {
          "coordinates": {
            "lat": 12.9743232,
            "lng": 74.8036651
          },
          "weekly_sum": 4279
        },
        {
          "coordinates": {
            "lat": 12.9815466,
            "lng": 74.8227607
          },
          "weekly_sum": 4314
        },
        {
          "coordinates": {
            "lat": 13.0010366,
            "lng": 74.8260901
          },
          "weekly_sum": 5191
        }
      ]
       
      let heatt = []
      for (let i = 0; i < dataa.length; i++) {
        let data = {
            location: new google.maps.LatLng(dataa[i].coordinates.lat, dataa[i].coordinates.lng),
            weight: dataa[i].weekly_sum
        };
        heatt.push(data);
    }

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
            {(<div id="map" className="map">
                <GoogleMap
                    zoom={10}
                    center={center}
                    mapContainerClassName="map-container"
                    options={options}
                    onLoad={onLoad}
                >
                    <HeatmapLayerF
                        data={heatt}
                        options={heatMapOptions}
                    />
                </GoogleMap>
            </div>)}
        </div>
    )
}