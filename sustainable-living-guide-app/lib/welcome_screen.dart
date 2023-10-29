// Importing necessary packages
import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:geolocator/geolocator.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:path_provider/path_provider.dart';
import 'dart:io';
import 'AI_support.dart';
import 'community_forum_screen.dart';
import 'sustainable_news_screen.dart';
import 'profile_screen.dart';

// Defining a stateful widget for the welcome screen
class WelcomeScreen extends StatefulWidget {
  const WelcomeScreen({super.key});

  @override
  _WelcomeScreenState createState() => _WelcomeScreenState();
}

// Defining the state for the welcome screen
class _WelcomeScreenState extends State<WelcomeScreen> {
  // Initializing variables for current position, Google Map controller, username and markers set.
  late Position _currentPosition;
  late GoogleMapController mapController;
  String userName = '';
  final Set<Marker> _markers = {};

  @override
  void initState() {
    super.initState();
    // Requesting permission, getting current location and asking user name when widget is initialized
    _requestPermission().then((_) {
      _getCurrentLocation();
    });
    _askUserName();
  }

  // Function to request location permission from the user
  _requestPermission() async {
    PermissionStatus status = await Permission.location.request();
    if (status.isDenied) {}
  }

  // Function to get the current location of the user
  _getCurrentLocation() async {
    Position position = await Geolocator.getCurrentPosition(
        desiredAccuracy: LocationAccuracy.best);

    final response = await http.post(
      Uri.parse(
          'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCFRmmWXEvFZSTsIt9j398LXuO5LSOiOnA'),
      body: jsonEncode({
        'considerIp': true,
      }),
      headers: {'Content-Type': 'application/json'},
    );

    if (response.statusCode == 200) {
      Map<String, dynamic> responseBody = jsonDecode(response.body);
      position = Position(
        latitude: responseBody['location']['lat'],
        longitude: responseBody['location']['lng'],
        timestamp: DateTime.now(),
        accuracy: position.accuracy,
        altitude: position.altitude,
        heading: position.heading,
        speed: position.speed,
        speedAccuracy: position.speedAccuracy,
        altitudeAccuracy: position.altitudeAccuracy,
        headingAccuracy: position.headingAccuracy,
      );
    }

    setState(() {
      _currentPosition = position;
      _markers.add(Marker(
        markerId: const MarkerId('userLocation'),
        position: LatLng(_currentPosition.latitude, _currentPosition.longitude),
        infoWindow: const InfoWindow(title: "Your Location"),
      ));
    });

    // Call the method to get nearby recycling centres
    _getNearbyRecyclingCentres();
  }

  // Function to get nearby recycling centres from Google Places API
  void _getNearbyRecyclingCentres() async {
    final response = await http.get(
      Uri.parse(
        'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${_currentPosition.latitude},${_currentPosition.longitude}&radius=5000&type=recycling&key=AIzaSyD6otfJJukGu2r5lC38F4FQCyAU2rp5s5s',
      ),
    );

    if (response.statusCode == 200) {
      Map<String, dynamic> responseBody = jsonDecode(response.body);
      List results = responseBody['results'];

      for (var result in results) {
        double lat = result['geometry']['location']['lat'];
        double lng = result['geometry']['location']['lng'];

        setState(() {
          _markers.add(Marker(
            markerId: MarkerId(result['id']),
            position: LatLng(lat, lng),
            icon:
                BitmapDescriptor.defaultMarkerWithHue(BitmapDescriptor.hueBlue),
            infoWindow: InfoWindow(title: result['name']),
          ));
        });
      }
    }
  }

  // Function to handle map creation
  void _onMapCreated(GoogleMapController controller) {
    mapController = controller;
  }

  // Function to animate camera to go to current location of the user
  void _goToCurrentLocation() async {
    mapController.animateCamera(CameraUpdate.newCameraPosition(CameraPosition(
      target: LatLng(_currentPosition.latitude, _currentPosition.longitude),
      zoom: 14.0,
    )));
  }

  // Function to ask user name from a dialog box and save it in a local file
  void _askUserName() async {
    final directory = await getApplicationDocumentsDirectory();
    final file = File('${directory.path}/user_name.txt');
    bool fileExists = await file.exists();

    if (fileExists && await file.readAsString() != '') {
      userName = await file.readAsString();
    } else {
      await showDialog<String>(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: const Text('Enter your name'),
            content: TextField(
              onChanged: (value) {
                userName = value;
              },
              decoration:
                  const InputDecoration(hintText: "Enter your name here"),
            ),
            actions: <Widget>[
              TextButton(
                onPressed: () async {
                  Navigator.pop(context, 'OK');
                  await file.writeAsString(userName);
                },
                child: const Text('OK'),
              ),
            ],
          );
        },
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: Builder(
          builder: (BuildContext context) {
            return IconButton(
              icon: const Icon(Icons.menu),
              onPressed: () {
                Scaffold.of(context).openDrawer();
              },
            );
          },
        ),
      ),
      drawer: Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: <Widget>[
            const DrawerHeader(
              decoration: BoxDecoration(
                color: Colors.green,
              ),
              child: Text('Sustainable Living Guide'),
            ),
            ListTile(
              leading: const Icon(Icons.assignment),
              title: const Text('Community Forum'),
              onTap: () {
                Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) => CommunityForumScreen()));
              },
            ),
            ListTile(
              leading: const Icon(Icons.person),
              title: const Text('Profile'),
              onTap: () {
                Navigator.push(context,
                    MaterialPageRoute(builder: (context) => ProfileScreen()));
              },
            ),
            ListTile(
              leading: const Icon(Icons.article),
              title: const Text('Sustainable News'),
              onTap: () {
                Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) => SustainableNewsScreen()));
              },
            ),
            ListTile(
              leading: const Icon(Icons.computer),
              title: const Text('AI Support'),
              onTap: () {
                Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) => const AIChatScreen()));
              },
            ),
          ],
        ),
      ),
      body: Stack(children: [
        GoogleMap(
          initialCameraPosition: CameraPosition(
              target:
                  LatLng(_currentPosition.latitude, _currentPosition.longitude),
              zoom: 10),
          markers: _markers,
          onMapCreated: _onMapCreated,
        ),
        Positioned(
            bottom: 10.0,
            right: 10.0,
            child: FloatingActionButton(
                onPressed: _goToCurrentLocation,
                child: const Icon(Icons.my_location)))
      ]),
    );
  }
}
