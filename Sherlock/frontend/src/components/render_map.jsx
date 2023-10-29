import { useMemo } from "react";
import {
  GoogleMap,
  MarkerF,
  CircleF,
  DirectionsRenderer,
  InfoWindowF,
} from '@react-google-maps/api';

export default function Map({
  lat,
  long,
  circleColor,
  route: routesResponse,
  wayPointList,
  isWayPointInfoBoxOpen,
  setIsWayPointInfoBoxOpen,
  setMap,
}) {

  const mapCenter = useMemo(() => ({ lat: lat, lng: long }), [lat, long]);

  const mapOptions = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: true,
    }),
    []
  );

  const renderRoutes = () => {
    if (!routesResponse.routes || routesResponse.routes.length === 0) return null;

    const directionsRenderers = [];

    for (var x = 0; x < routesResponse.routes.length; x++) {

      const route = JSON.parse(JSON.stringify(routesResponse));
      route.routes = route.routes.slice(x);
      // console.log(route, routesResponse);

      const directionsRenderer = new google.maps.DirectionsRenderer({
        directions: route,
        routeIndex: x
      });

      directionsRenderers.push(directionsRenderer);

    }

    return directionsRenderers.map((renderer, index) => (
      <DirectionsRenderer
        key={index}
        directions={renderer.getDirections()}
      />
    ));
  }

  const renderWayPoints = () => {

    return wayPointList.map((wayPoints) => {
      return wayPoints.map((waypoint, idx) => (
        <MarkerF
          key={idx}
          position={waypoint.geometry.location}
          title={waypoint.name}
          // onLoad={() => console.log('Marker Loaded')}
          onClick={() => {
            setIsWayPointInfoBoxOpen(value=>{
              value[waypoint.google_place_id] = true;
              return value;
            });
          }}
        >
          {
            isWayPointInfoBoxOpen[waypoint.google_place_id] && (
              <InfoWindowF
                position={waypoint.geometry.location}
                onCloseClick={() => {
                  setIsWayPointInfoBoxOpen(value=>{
                    value[waypoint.google_place_id] = false;
                    return value;
                  });
                }}
              >
                <>
                  <p>{waypoint.name}</p>
                  <p>{waypoint.rating}</p>
                </>
              </InfoWindowF>
            )
          }
        </MarkerF>
      ))
    });
  }

  return (
    <GoogleMap
      options={mapOptions}
      zoom={14}
      center={mapCenter}
      mapTypeId={"roadmap"}
      mapContainerStyle={{ width: '100%', height: '100vh' }}
      onLoad={(map) => setMap(map)}
    >
      <MarkerF
        position={mapCenter}
        // onLoad={() => console.log('Marker Loaded')}
      />
      {
        routesResponse ?
          (
            <div>
              {renderRoutes(routesResponse)}
              {renderWayPoints()}
            </div>
          ) :
          (
            <CircleF
              center={mapCenter}
              radius={500}
              // onLoad={() => console.log('Circle Load...')}
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