import { useMemo, useRef, useState } from "react";
import {
  GoogleMap,
  MarkerF,
  CircleF,
  DirectionsRenderer,
} from '@react-google-maps/api';

export default function Map({ lat, long, circleColor, route }) {

  const mapCenter = useMemo(() => ({ lat: lat, lng: long }), [lat, long]);

  const mapOptions = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: true,
    }),
    []
  );

  return (
    <GoogleMap
      options={mapOptions}
      zoom={14}
      center={mapCenter}
      mapTypeId={"roadmap"}
      mapContainerStyle={{ width: '100%', height: '100vh' }}
      onLoad={() => console.log('Map Loaded')}
    >
      <MarkerF
        position={mapCenter}
        onLoad={() => console.log('Marker Loaded')}
      />
      {
        route ?
          (
            <DirectionsRenderer directions={route} />
          ) :
          (
            <CircleF
              center={mapCenter}
              radius={500}
              onLoad={() => console.log('Circle Load...')}
              options={{
                fillColor: circleColor,
                strokeColor: circleColor,
                strokeOpacity: 0.8,
              }}
            />
          )

      }
    </GoogleMap>
  );
}