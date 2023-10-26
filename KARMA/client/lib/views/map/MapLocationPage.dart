import 'package:flutter/material.dart';
import 'package:flutter_polyline_points/flutter_polyline_points.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'dart:async';

import 'package:location/location.dart';

class MapPage extends StatefulWidget {
  final double destinationLatitude;
  final double destinationLongitude;

  MapPage(
      {required this.destinationLatitude, required this.destinationLongitude});
  @override
  _MapPageState createState() => _MapPageState();
}

class _MapPageState extends State<MapPage> {
  Completer<GoogleMapController> _controller = Completer();
  Location _location = Location();
  static const LatLng _initialPosition =
      LatLng(30.7649, 76.7868); // San Francisco coordinates

  Set<Marker> _markers = Set<Marker>();
  Set<Polyline> _polylines = Set<Polyline>();

  LatLng? _currentLocation;
  late List<LatLng> polylineCoordinates;

  @override
  void initState() {
    polylineCoordinates = [
      LatLng(30.7649, 76.7868), // Starting point
      LatLng(widget.destinationLatitude,
          widget.destinationLongitude) // Destination
    ];

    // Store the current location
    super.initState();

    _addMarker(_currentLocation ?? LatLng(37.0, 87.0), "Current Location");
    _addMarker(LatLng(widget.destinationLatitude, widget.destinationLongitude),
        "Destination");
    getPolyPoints(polylineCoordinates);
    _getPolylines(polylineCoordinates);

    // Start listening for location updates
    _location.onLocationChanged.listen((LocationData locationData) {
      setState(() {
        _currentLocation =
            LatLng(locationData.latitude!, locationData.longitude!);
        _updatePolylines();
      });
    });
  }

  void _addMarker(LatLng position, String markerId) {
    final MarkerId markerIdVal = MarkerId(markerId);
    final Marker marker = Marker(
      markerId: markerIdVal,
      position: position,
      infoWindow: InfoWindow(title: markerId),
    );
    setState(() {
      _markers.add(marker);
    });
  }

  void _getPolylines(polyLineCoordinates) {
    final PolylineId polylineId = PolylineId('route1');

    final Polyline polyline = Polyline(
      polylineId: polylineId,
      color: Colors.blue,
      width: 5,
      points: polylineCoordinates,
    );

    setState(() {
      _polylines.add(polyline);
    });
  }

  void getPolyPoints(polyLineCoordinates) async {
    _polylines.clear();
    PolylinePoints polylinePoints = PolylinePoints();
    PolylineResult result = await polylinePoints.getRouteBetweenCoordinates(
        'AIzaSyCAYnuFO2kwBTN2qpa22yV51fglehTdnP8',
        PointLatLng(widget.destinationLatitude, widget.destinationLatitude),
        PointLatLng(_currentLocation!.latitude!, _currentLocation!.longitude!));

    if (result.points.isNotEmpty) {
      for (var point in result.points) {
        polylineCoordinates.add(LatLng(point.latitude, point.longitude));
      }
      _getPolylines(polyLineCoordinates);
    }
  }

  void _updatePolylines() {
    // Clear existing polylines
    _polylines.clear();

    // Create a new polyline that includes the current location and the destination
    final PolylineId polylineId = PolylineId('route1');
    final List<LatLng> polylineCoordinates = [
      _currentLocation!, // Current location
      LatLng(widget.destinationLatitude,
          widget.destinationLongitude), // Destination
    ];

    final Polyline polyline = Polyline(
      polylineId: polylineId,
      color: Colors.blue,
      width: 5,
      points: polylineCoordinates,
    );

    setState(() {
      _polylines.add(polyline);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Map Route'),
      ),
      body: GoogleMap(
        mapType: MapType.normal,
        initialCameraPosition: CameraPosition(
          target: _initialPosition,
          zoom: 15.0,
        ),
        onMapCreated: (GoogleMapController controller) {
          _controller.complete(controller);
        },
        markers: _markers,
        polylines: _polylines,
      ),
    );
  }
}
