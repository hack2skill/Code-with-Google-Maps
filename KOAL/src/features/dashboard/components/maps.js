import React, { useEffect, useMemo, useState } from "react";
import {
  GoogleMap,
  Marker,
  useLoadScript,
  DirectionsService,
  Polyline,
  DirectionsRenderer,
} from "@react-google-maps/api";
import TitleCard from "../../../components/Cards/TitleCard.js";

const Maps = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey:
      process.env.REACT_APP_GOOGLE_API_KEY ||
      "AIzaSyB9GJgoPikGy817TDxyYnUCvo3G4f6LzhQ",
  });

  const customMarker = {
    path: "M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759   c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z    M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713   v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l-2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336   h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805",
    fillColor: "red",
    fillOpacity: 1,
    strokeWeight: 1,
    rotation: -55,
    scale: 1,
  };

  const [directions, setDirections] = useState(null);

  const origin = useMemo(() => ({ lat: 20.8162, lng: 80.405996 }), []);
  const destination = useMemo(() => ({ lat: 20.834064, lng: 80.381616 }), []);
  const distance1 = [
    { lat: 20.817377, lng: 80.405996 },
    { lat: 20.834064, lng: 80.381616 },
  ];

  const mapContainerStyle = {
    height: "78%",
    width: "94%",
    border: "1px solid #CCC",
    backgroundColor: "#f0f0f0",
    position: "absolute",
  };

  useEffect(() => {
    if (isLoaded) {
      const directionsService = new window.google.maps.DirectionsService();

      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: "DRIVING",
          drivingOptions: {
            departureTime: new Date("2023-10-15T15:01:23.045123456Z"),
            trafficModel: "bestguess",
          },
          provideRouteAlternatives: true, // Set to true if you want multiple route alternatives
        },
        (response, status) => {
          if (status === "OK") {
            setDirections(response);
          } else {
            console.error(`Directions request failed: ${status}`);
          }
        }
      );
    }
  }, [isLoaded, origin, destination]);

  return (
    <TitleCard title={"Live Tracking"}>
      <div className="App">
        {!isLoaded ? (
          <h1>Loading...</h1>
        ) : (
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={origin}
            zoom={10}
          >
            <Marker position={origin} icon={customMarker} />
            <Marker position={destination} />
            {directions && (
              <DirectionsRenderer
                directions={directions}
                options={{
                  suppressMarkers: true,
                }}
              />
            )}
            <Polyline
              path={distance1}
              options={{
                strokeColor: "#FF0000",
                strokeOpacity: 1.0,
                strokeWeight: 2,
              }}
            />
          </GoogleMap>
        )}
      </div>
    </TitleCard>
  );
};

export default Maps;
