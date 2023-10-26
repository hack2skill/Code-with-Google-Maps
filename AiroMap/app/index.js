import React, { useEffect, useRef, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    Alert,
    TouchableOpacity,
    Button,
    Image,
    TextInput,
} from 'react-native';
import MapView, { Marker, Callout, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import { getAirQualityData } from '../AirVisualAPI';
import axios from 'axios';
import cities from '../utils/cities';
import { Link } from 'expo-router';

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

    const [data, setData] = useState([]);
    const [searchInput, setSearchInput] = useState(''); // State for search input

    useEffect(() => {
        const fetchData = async () => {
            try {
                const results = await Promise.all(
                    cities.map((location) =>
                        axios.get(`https://api.waqi.info/feed/${location}/?token=79ba560d0f2033a70b9a289a5e1ee7e10daa570b`)
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

        mapViewRef.current.getCamera().then((camera) => {
            setZoomLevel(camera.zoom);
        });
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


        const result = searchLocation(searchInput);

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
    };

    return (
        <SafeAreaView style={styles.container}>
            <MapView
                ref={mapViewRef}
                style={styles.map}
                mapType="hybrid"
                provider="google"
                region={location}
                onLongPress={handleLongPress}
                onRegionChangeComplete={handleRegionChange}
            >
                {location && (
                    <Marker coordinate={location}>
                        <Image source={require('../assets/location.png')} style={{ width: 35, height: 35 }} />
                    </Marker>
                )}
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
                <Button title="Search" onPress={handleSearch} />
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

            <View style={styles.buttonContainer}>
                <Link href={'/login'} asChild>
                    <TouchableOpacity style={styles.button} onPress={() => { }}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </Link>
                <TouchableOpacity style={styles.button} onPress={() => { bottomSheet.current.show(); }}>
                    <Text style={styles.buttonText}>Statistics</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={getUserLocation}>
                    <Text>Get My Location</Text>
                </TouchableOpacity>
            </View>
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
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        margin: 10,
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
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
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchBar: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginRight: 10,
        padding: 8,
    },
});