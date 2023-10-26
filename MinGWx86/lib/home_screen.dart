import 'dart:developer';
import 'package:url_launcher/url_launcher.dart';

import 'package:charge_on_the_way/svg_creator.dart';
import 'package:firebase_database/firebase_database.dart';
import 'package:flutter/material.dart';
import 'dart:typed_data';
import 'dart:ui';

import 'package:firebase_database/firebase_database.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import 'dart:ui' as ui;

import 'package:google_maps_flutter/google_maps_flutter.dart';

class GoogleMaps extends StatefulWidget {
  const GoogleMaps({super.key});
  static const String id = 'map-screen';

  @override
  State<GoogleMaps> createState() => _GoogleMapsState();
}

class _GoogleMapsState extends State<GoogleMaps> {
  final databaseref = FirebaseDatabase.instance.ref();
  Future<void> _launchUrl(Uri uri) async {
    if (!await launchUrl(uri)) {
      throw Exception('Could not launch $uri');
    }
  }

  Map optionsmap = {"date": DateTime.now().toString().split(" ")[0]};
  Map<MarkerId, Marker> markers = <MarkerId, Marker>{};
  late LatLng currentLocation;
  late GoogleMapController _mapController;
  // Set<Marker> markers = {};
  List<UserMaps> list = [];
  List<UserMaps> lis2 = [];
  Future<Uint8List> getBytesFromAsset(String path, int width) async {
    ByteData data = await rootBundle.load(path);
    ui.Codec codec = await ui.instantiateImageCodec(data.buffer.asUint8List(),
        targetWidth: width);
    ui.FrameInfo fi = await codec.getNextFrame();
    return (await fi.image.toByteData(format: ui.ImageByteFormat.png))!
        .buffer
        .asUint8List();
  }

  void initMarker(UserMaps specify, specifyId) async {
    var markerIdVal = specifyId;
    final MarkerId markerId = MarkerId(markerIdVal);
    final Marker marker = Marker(
        markerId: markerId,
        position: LatLng(specify.lat, specify.long),
        infoWindow: InfoWindow(
          title: '${specify.chargingStation}',
          snippet: 'Available Slots: ${specify.slots}',
          onTap: () => _launchUrl(Uri.parse(
              "https://www.google.com/maps/dir//${specify.lat},${specify.long}")),
        ));
    setState(() {
      markers[markerId] = marker;
    });
  }

  getUsers() async {
    final snapshot = await FirebaseDatabase.instance.ref('locationData').get();

    final map = snapshot.value as Map<dynamic, dynamic>;

    map.forEach((key, value) {
      final user = UserMaps.fromMap(value);

      list.add(user);
    });

    for (int i = 0; i < 2; i++) {
      initMarker(list[i], list[i].userId);
    }

    setState(() {});
  }

  @override
  void initState() {
    getUsers();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    setState(() {
      currentLocation = LatLng(19.2990, 72.8548);
    });

    void onCreated(GoogleMapController controller) {
      setState(() {
        _mapController = controller;
      });
    }

    return Scaffold(
        body: SafeArea(
      child: Stack(children: [
        GoogleMap(
          initialCameraPosition:
              CameraPosition(target: currentLocation, zoom: 14),
          zoomControlsEnabled: false,
          minMaxZoomPreference: MinMaxZoomPreference(1.5, 20.8),
          myLocationEnabled: true,
          markers: Set<Marker>.of(
            markers.values,
          ),
          myLocationButtonEnabled: true,
          mapType: MapType.normal,
          mapToolbarEnabled: true,
          onCameraMove: (CameraPosition position) {},
          onMapCreated: onCreated,
        ),
      ]),
    ));
  }
}

class UserMaps {
  final double lat;
  final double long;

  final String userId;
  final String chargingStation;
  final int slots;

  const UserMaps({
    required this.lat,
    required this.long,
    required this.userId,
    required this.chargingStation,
    required this.slots,
  });

  factory UserMaps.fromMap(Map<dynamic, dynamic> map) {
    return UserMaps(
      lat: map['lat'] ?? '',
      long: map['long'] ?? '',
      userId: map['userid'] ?? '',
      chargingStation: map['name'] ?? '',
      slots: map['slots'] ?? '',
    );
  }
}
