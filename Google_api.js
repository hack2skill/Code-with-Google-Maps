import React, { useState, useEffect } from 'react';
import { GoogleMap, GoogleApiWrapper, Marker } from '@react-google-maps/api';
import { Places } from '@googlemaps/react-wrapper';

const App = () => {
  const [womanLocation, setWomanLocation] = useState(null);
  const [nearestPatrollingOfficer, setNearestPatrollingOfficer] = useState(null);
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    // Get the woman's location using the Geocoding API
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: 'YOUR_ADDRESS_HERE' }, (results, status) => {
      if (status === 'OK') {
        setWomanLocation(results[0].geometry.location);
      } else {
        console.log('Error geocoding address:', status);
      }
    });
  }, []);

  useEffect(() => {
    // Find the nearest patrolling officer using the Places API
    const places = new Places();
    places.nearbySearch({
      location: womanLocation,
      radius: 5000,
      type: 'police_station',
    }).then((response) => {
      setNearestPatrollingOfficer(response.results[0]);
    }).catch((error) => {
      console.log('Error finding nearest patrolling officer:', error);
    });
  }, [womanLocation]);

  useEffect(() => {
    // Calculate the route from the woman's location to the nearest patrolling officer using the Directions API
    const directionsService = new google.maps.DirectionsService();
    directionsService.route({
      origin: womanLocation,
      destination: nearestPatrollingOfficer.geometry.location,
      travelMode: 'driving',
    }).then((response) => {
      setDirections(response.routes[0]);
    }).catch((error) => {
      console.log('Error calculating directions:', error);
    });
  }, [womanLocation, nearestPatrollingOfficer]);

  return (
    <div>
      <GoogleMap
        center={womanLocation}
        zoom={15}
      >
        <Marker position={womanLocation} icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png" />
        <Marker position={nearestPatrollingOfficer.geometry.location} icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/police_station.png" />
        {directions && (
          <DirectionsRenderer directions={directions} />
        )}
      </GoogleMap>
    </div>
  );
};

export default App;
