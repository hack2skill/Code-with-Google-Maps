import React, { useEffect, useRef, useState } from 'react';
import {
    StyleSheet,
    Text,
    Modal,
    View,
    SafeAreaView,
    ScrollView,
    Alert,
    TouchableOpacity,
    Button,
    Image,
    TextInput,
    Easing
} from 'react-native';
import MapView, { Marker, Callout, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import { getAirQualityData } from '../AirVisualAPI';
import axios from 'axios';
import cities from '../utils/cities';
import { Link } from 'expo-router';
import AsyncStorage from "@react-native-async-storage/async-storage"
import StarRating from 'react-native-star-rating';

const getColorForAQI = (aqi) => {
    if (aqi >= 0 && aqi <= 50) return 'rgba(0, 128, 0, 0.5)';
    if (aqi > 50 && aqi <= 100) return 'rgba(255, 255, 0, 0.5)';
    if (aqi > 100 && aqi <= 150) return 'rgba(255, 165, 0, 0.5)';
    if (aqi > 150 && aqi <= 200) return 'rgba(255, 0, 0, 0.5)';
    if (aqi > 200) return 'rgba(128, 0, 128, 0.5)';
    return 'rgba(128, 128, 128, 0.5)';
};

export default function App() {
    const [location, setLocation] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [airQualityData, setAirQualityData] = useState({});
    const [range, setRange] = useState(0);
    const [zoomLevel, setZoomLevel] = useState(null);
    const bottomSheet = useRef();
    const mapViewRef = useRef();
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);

    const [feedbackText, setFeedbackText] = useState('');
    const [feedbackRating, setFeedbackRating] = useState(0);

    const [data, setData] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        const getUser = async () => {
            const token = await AsyncStorage.getItem("token")
            if (token) return setIsLoggedIn(true)
        }
        getUser()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const results = await Promise.all(
                    cities.map(location =>
                        axios.get(`https://api.waqi.info/feed/${location}/?token=${process.env.EXPO_PUBLIC_KEY}`)
                    )
                );

                const rankedData = results
                    .map((result, i) => ({
                        location: cities[i],
                        aqi: result.data.data.aqi,
                    }))
                    .sort((a, b) => b.aqi - a.aqi);

                setData(rankedData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const getUserLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert(
                'Location Permission Denied',
                'This app needs access to your location to show it on the map.',
                [
                    { text: 'Cancel', onPress: () => console.log('Cancel Pressed') },
                    {
                        text: 'GRANT',
                        onPress: async () => {
                            Location.requestBackgroundPermissionsAsync();
                        },
                    },
                ]
            );
            return;
        }

        const l = await Location.getCurrentPositionAsync();
        setLocation({
            latitude: l.coords.latitude,
            longitude: l.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        });

        if (!location) return
        mapViewRef.current.animateCamera({ heading: 60, zoom: 17, center: location, pitch: 0, }, { duration: 2000 })
    };

    useEffect(() => {
        getUserLocation();
    }, []);

    const handleRegionChange = (region) => {
        const newZoomLevel = region.zoom;
        setZoomLevel(newZoomLevel);
        if (newZoomLevel < 10) {
            setRange(0);
        } else if (newZoomLevel < 13) {
            setRange(10000);
        } else {
            setRange(5000);
        }
    };

    const handleLongPress = async (event) => {
        const newMarker = event.nativeEvent.coordinate;
        const locationKey = `${newMarker.latitude},${newMarker.longitude}`;

        try {
            const airData = await getAirQualityData(locationKey);
            const aqi = airData?.data?.current?.pollution?.aqius || -1;

            setAirQualityData((prevData) => ({
                ...prevData,
                [locationKey]: { ...airData, aqi },
            }));

            setMarkers([...markers, { ...newMarker, aqi }]);
        } catch (error) {
            console.error('Error fetching air quality data:', error);
        }
    };

    const handleMarkerRemove = (index) => {
        const updatedMarkers = [...markers];
        updatedMarkers.splice(index, 1);
        setMarkers(updatedMarkers);

        const updatedAirQualityData = { ...airQualityData };
        const removedLocation = `${markers[index].latitude},${markers[index].longitude}`;
        delete updatedAirQualityData[removedLocation];
        setAirQualityData(updatedAirQualityData);
    };

    const handleSearchInputChange = (text) => {
        setSearchInput(text);
    };

    const handleSearch = () => {

        try {
            console.log(searchInput)
            const result = searchLocation(searchInput);
            setSearchInput("")
            if (result) {

                setLocation({
                    latitude: result.latitude,
                    longitude: result.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                });
            } else {

                Alert.alert('Location not found', 'Please try a different location.');
            }
        }
        catch {
            setSearchInput("")
            alert("Something went wrong")
        }
    };

    const submitFeedback = async () => {
        
        if (!isLoggedIn) {
          Alert.alert('Login Required', 'You must be logged in to submit feedback.');
          return;
        }
        const token = await AsyncStorage.getItem('token');
        try {
          const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/api/submitfeedback`, {
            token,
            text: feedbackText,
            rating: feedbackRating,
          });
      
          if (response.data.success) {

            Alert.alert('Feedback Submitted', 'Thank you for your feedback!');
            setFeedbackText('');
            setFeedbackRating(0);
          } else {
            Alert.alert('Submission Error', 'Failed to submit feedback. Please try again.');
          }
        } catch (error) {
          console.error('Error submitting feedback:', error);
          Alert.alert('Submission Error', 'Failed to submit feedback. Please try again.');
        }
      };

      return (
        <SafeAreaView style={styles.container}>
          <MapView
            ref={mapViewRef}
            style={styles.map}
            mapType="hybrid"
            provider="google"
            region={location}
            showsCompass={false}
            showsUserLocation={true}
            compassOffset={{
              position: 'absolute',
              bottom: 50,
              right: 0,
              margin: 10,
            }}
            onLongPress={handleLongPress}
            onRegionChangeComplete={handleRegionChange}
          >
            {markers.map((marker, index) => (
              <Marker
                key={index}
                coordinate={marker}
                onCalloutPress={() => handleMarkerRemove(index)}
                description="Press to remove"
              >
                <Callout>
                  <View>
                    <Text>Air Quality: {airQualityData[`${marker.latitude},${marker.longitude}`]?.aqi || 'N/A'}</Text>
                    <Text>Temperature: {airQualityData[`${marker.latitude},${marker.longitude}`]?.data?.current?.weather?.tp || 'N/A'}°C</Text>
                    <Text>Humidity: {airQualityData[`${marker.latitude},${marker.longitude}`]?.data?.current?.weather?.hu || 'N/A'}%</Text>
                    <Text>Wind Speed: {airQualityData[`${marker.latitude},${marker.longitude}`]?.data?.current?.weather?.ws || 'N/A'} m/s</Text>
                    <Text>Wind Direction: {airQualityData[`${marker.latitude},${marker.longitude}`]?.data?.current?.weather?.wd || 'N/A'}°</Text>
                    <Text>Atmospheric Pressure: {airQualityData[`${marker.latitude},${marker.longitude}`]?.data?.current?.weather?.pr || 'N/A'} hPa</Text>
                  </View>
                </Callout>
              </Marker>
            ))}
            {markers.map((marker, index) => (
              <Circle
                key={index}
                center={marker}
                radius={(marker.aqi + 50) * 30}
                fillColor={getColorForAQI(marker.aqi)}
                strokeColor="transparent"
              />
            ))}
          </MapView>
    
          <View style={styles.searchBarContainer}>
            <TextInput
              style={styles.searchBar}
              placeholder="Search location..."
              onChangeText={handleSearchInputChange}
              value={searchInput}
            />
            <TouchableOpacity style={{ borderRadius: 50, padding: 10, backgroundColor: 'white' }} onPress={handleSearch}>
              <Image source={require("../assets/search.jpeg")} style={{ width: 25, height: 25 }} />
            </TouchableOpacity>
          </View>

    
          <BottomSheet hasDraggableIcon ref={bottomSheet} height={600}>
            <ScrollView>
              <View style={styles.bottomSheetContainer}>
                {data.map((item, index) => (
                  <View key={index} style={[styles.bottomSheetItem, { backgroundColor: getColorForAQI(item.aqi) }]}>
                    <Text style={styles.bottomSheetItemText}>{`${index + 1}. ${item.location}: ${item.aqi}`}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </BottomSheet>
          <TouchableOpacity style={styles.button} onPress={() => { bottomSheet.current.show(); }}>
                    <Text style={styles.buttonText}>Statistics</Text>
                </TouchableOpacity>
    
          <TouchableOpacity style={{ position: 'absolute', bottom: 80, right: 20, backgroundColor: "black", borderRadius: 50 }} onPress={getUserLocation}>
            <Image source={require("../assets/location.png")} style={{ width: 50, height: 50 }} />
          </TouchableOpacity>
    
          {isLoggedIn && (
            <TouchableOpacity style={styles.feedbackButton} onPress={() => setShowFeedbackModal(true)}>
              <Text style={styles.feedbackButtonText}>Feedback</Text>
            </TouchableOpacity>
          )}
    
          <View style={styles.logoutButtonContainer}>
            {isLoggedIn ?
              <TouchableOpacity style={styles.logoutButton} onPress={async () => {
                await AsyncStorage.removeItem("token");
                setIsLoggedIn(false)
              }}>
                <Text style={[styles.logoutButtonText]}>Logout</Text>
              </TouchableOpacity>
              :
              <Link href={'/login'} asChild>
                <TouchableOpacity style={styles.logoutButton} onPress={() => { }}>
                  <Text style={styles.logoutButtonText}>Login</Text>
                </TouchableOpacity>
              </Link>
            }
          </View>
    
          <Modal visible={showFeedbackModal} animationType="slide">
  <View style={styles.feedbackModalContainer}>
    <TouchableOpacity style={styles.closeButton} onPress={() => setShowFeedbackModal(false)}>
      <Text style={styles.closeButtonText}>X</Text>
    </TouchableOpacity>
    <Text style={styles.feedbackLabel}>Provide Feedback</Text>
    <TextInput
      style={styles.feedbackInput}
      placeholder="Your feedback..."
      value={feedbackText}
      onChangeText={setFeedbackText}
      multiline
    />
    <StarRating
      disabled={false}
      maxStars={5}
      rating={feedbackRating}
      selectedStar={(rating) => setFeedbackRating(rating)}
    />
    <TouchableOpacity style={styles.feedbackSubmitButton} onPress={submitFeedback}>
      <Text style={styles.feedbackSubmitText}>Submit Feedback</Text>
    </TouchableOpacity>
  </View>
</Modal>

        </SafeAreaView>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      map: {
        flex: 1,
        width: '100%',
      },
      searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 20,
        width: "95%",
        padding: 10,
        borderRadius: 40,
      },
      searchBar: {
        flex: 1,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 50,
        backgroundColor: 'white',
        marginRight: 10,
        padding: 10,
        paddingHorizontal: 15,
      },
      bottomSheetContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },
      bottomSheetItem: {
        width: '100%',
        padding: 10,
        marginVertical: 2,
      },
      bottomSheetItemText: {
        fontSize: 16,
        color: '#fff',
      },
      feedbackButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        margin: 10,
        position: 'absolute',
        bottom: 20,
        left: 0,
      },
      feedbackButtonText: {
        fontSize: 16,
        color: '#fff',
      },
      logoutButtonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
      },
      logoutButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        margin: 10,
        left: 20,
      },
      logoutButtonText: {
        fontSize: 16,
        color: '#fff',
      },
      feedbackModalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
      },
      closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 50,
      },
      closeButtonText: {
        fontSize: 16,
        color: '#fff',
      },
      feedbackLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      feedbackInput: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        marginBottom: 10,
        padding: 8,
        width: '100%',
      },
      feedbackSubmitButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
      },
      feedbackSubmitText: {
        fontSize: 16,
        color: '#fff',
      },
      button: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        margin: 10,
        position: 'absolute',
        bottom: 20,
        left: 127, 
    },
    });