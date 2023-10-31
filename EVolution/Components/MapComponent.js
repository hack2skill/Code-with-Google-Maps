import React, { useState, useEffect } from "react";
import { Platform, View, StyleSheet, Text, Image, Linking } from "react-native";

import MapView, {
  Circle,
  MapCircle,
  Marker,
  PROVIDER_GOOGLE,
  Callout,
} from "react-native-maps";
import ChargingStationInfo from "./ChargingStationInfo";

import * as Location from "expo-location";
import { registerRootComponent } from "expo";

const MapComponent = () => {
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [chargingStations, setChargingStations] = useState([]);
  const [serviceCenters, setServiceCenters] = useState([]);

  const [selectedChargingStation, setSelectedChargingStation] = useState(null);

  const handleChargingStationClick = (chargingStation) => {
    setSelectedChargingStation(chargingStation);
  };

  const [origin, setOrigin] = useState(null); // User's location
  const [destination, setDestination] = useState(null); // Charging station or service center
  const [directions, setDirections] = useState([]); // Directions from Directions API

  useEffect(() => {
    if (Platform.OS === "web") {
      loadWebMap();
    } else if (Platform.OS === "ios" || Platform.OS === "android") {
      loadNativeMap();
    }

    // Check and request location permissions for iOS, Android, and web using expo
    const checkAndRequestLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        fetchUserLocationWithGeolocationAPI();
      } else {
        console.log("Location permission denied.");
      }
    };

    checkAndRequestLocationPermission();

    // Fetch charging stations within a 5km radius.
    fetchChargingStations();
    fetchServiceCenters();
  }, []);

  const fetchUserLocationWithGeolocationAPI = () => {
    // Uses the Google Maps Platform Geolocation API to fetch the user's location.
    fetch(
      `https://www.googleapis.com/geolocation/v1/geolocate?key=yourapikey`,
      {
        method: "POST",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data && data.location && data.location.lat && data.location.lng) {
          const { location } = data;
          setRegion({
            latitude: location.lat,
            longitude: location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        } else {
          console.error("Invalid or missing data in the API response.");
        }
      })
      .catch((error) => console.error(error));
  };

  const loadWebMap = () => {
    // Load the Google Maps JavaScript API for web
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=yourapikey`;
    script.onload = () => {
      // Initialize and render the map
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: region.latitude, lng: region.latitude },
        zoom: 5,
      });
    };
    document.head.appendChild(script);
  };

  const loadNativeMap = () => {
    // Render the map using react-native-maps on iOS and Android
    // Uses google maps SDK for android on Android devices
    // Uses google maps SDK for iOS on iOS devices
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {/* You can add additional components or markers here if needed */}
        </MapView>
      </View>
    );
  };
  const fetchChargingStations = () => {
    // Use the Google Places API to fetch charging stations within a 5km radius of the user's location.
    fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?location=12.910592%2C77.594624&query=%20Charging%20Station&radius=10000&key=yourapikey`
    )
      .then((response) => response.json())
      .then((data) => {
        setChargingStations(data.results);
        console.log(data.results);
      })
      .catch((error) => console.error(error));
  };

  const fetchServiceCenters = () => {
    // Use the Google Places API to fetch charging stations within a 5km radius of the user's location.
    fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?location=12.910592%2C77.594624&query=%20Service%20Center&radius=10000&key=yourapikey`
    )
      .then((response) => response.json())
      .then((data) => {
        setServiceCenters(data.results);
        console.log(data.results);
      })
      .catch((error) => console.error(error));
  };

  const fetchDirections = () => {
    // Use the Google Maps Directions API to fetch directions from origin to destination.
    fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=yourapikey`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.routes && data.routes.length > 0) {
          setDirections(data.routes[0].legs[0].steps);
        }
      })
      .catch((error) => console.error(error));
  };

  const handleNavigation = () => {
    if (origin && destination) {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}`;
      Linking.openURL(url);
    }
  };

  useEffect(() => {
    if (origin && destination) {
      fetchDirections();
    }
  }, [origin, destination]);

  return (
    <View style={styles.container}>
      {Platform.OS === "web" ? (
        <View id="map" style={styles.mapContainer} />
      ) : (
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          initialRegion={{
            latitude: 12.910592,
            longitude: 77.594624,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03,
          }}
        >
          <Circle
            center={{
              latitude: 12.914592,
              longitude: 77.622624,
            }}
            radius={80}
            fillColor="#4285F4"
            strokeWidth="5"
            strokeColor="rgb(255,255,255)"
          />
          {chargingStations.map((station) => (
            <Marker
              key={station.place_id}
              coordinate={{
                latitude: station.geometry.location.lat,
                longitude: station.geometry.location.lng,
              }}
              title={station.name}
              description={station.vicinity}
              anchor={{ x: 0.1, y: 0.3 }}
              onPress={() => handleChargingStationClick(station)}
            >
              <Image
                source={require("../assets/charging-station.png")}
                style={{ height: 35, width: 35 }}
              />
            </Marker>
          ))}
          {serviceCenters.map((station) => (
            <Marker
              key={station.place_id}
              coordinate={{
                latitude: station.geometry.location.lat,
                longitude: station.geometry.location.lng,
              }}
              title={station.name}
              description={station.vicinity}
              anchor={{ x: 0.1, y: 0.3 }}
            >
              <Image
                source={require("../assets/electric-car.png")}
                style={{ height: 37, width: 37 }}
              />
            </Marker>
          ))}
        </MapView>
      )}
      <ChargingStationInfo location={selectedChargingStation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MapComponent;
