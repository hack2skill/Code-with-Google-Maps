import 'dart:async';
import 'dart:typed_data';

import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:location/location.dart';
import 'package:geolocator/geolocator.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: 'Emergency Ambulance Tracking',
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          primarySwatch: Colors.red,
        ),
        //home: MyHomePage(title: 'Realtime Ambulance Tracking'),
        home: HomePage2());
  }
}

class HomePage2 extends StatefulWidget {
  @override
  _HomePage2State createState() => _HomePage2State();
}

class _HomePage2State extends State<HomePage2> {
  StreamSubscription _locationSubscription;
  Location _locationTracker = Location();
  Marker marker;
  List trafficMarks = new List();
  List<GeoPoint> dynamicTrafficMarks = new List();
  Circle circle;
  GoogleMapController _controller;
  DocumentReference reference;

  bool isNearTrafficSignal = false;
  bool someVariable = false;
  bool viewerMode = false;
  double lat;
  double lng;

  //double trafficLat1 = 16.799417;
  //double trafficlng1 = 75.717465;
  static final CameraPosition initialLocation = CameraPosition(
    target: LatLng(37.42796133580664, -122.085749655962),
    zoom: 10,
  );

  // ignore: missing_return
  Future<Uint8List> getTrafficMarker() async {
    if (isNearTrafficSignal) {
      ByteData byteData =
          await DefaultAssetBundle.of(context).load("assets/green_light.png");
      return byteData.buffer.asUint8List();
    } else if (!isNearTrafficSignal) {
      ByteData byteData =
          await DefaultAssetBundle.of(context).load("assets/red_light.png");
      return byteData.buffer.asUint8List();
    }
  }

  Future<Uint8List> getMarker() async {
    ByteData byteData =
        await DefaultAssetBundle.of(context).load("assets/ambulance.png");
    return byteData.buffer.asUint8List();
  }

  void updateMarkerAndCircle(LocationData newLocalData, Uint8List imageData) {
    LatLng latlng = LatLng(newLocalData.latitude, newLocalData.longitude);
    this.setState(() {
      marker = Marker(
          markerId: MarkerId("home"),
          position: latlng,
          rotation: newLocalData.heading,
          draggable: false,
          zIndex: 2,
          flat: true,
          anchor: Offset(0.5, 0.5),
          icon: BitmapDescriptor.fromBytes(imageData));
      //trafficMarks[0] = marker;
      circle = Circle(
          circleId: CircleId("ambulance"),
          radius: 30,
          zIndex: 1,
          strokeWidth: 5,
          strokeColor: (isNearTrafficSignal || someVariable)
              ? Colors.redAccent
              : Colors.blue,
          center: latlng,
          fillColor: (isNearTrafficSignal || someVariable)
              ? Colors.red.withAlpha(70)
              : Colors.blue.withAlpha(70));
    });
  }

  void getCurrentLocation() async {
    if (trafficMarks.length == 0) {
      if (dynamicTrafficMarks != null) {
        print('links are not null');
        dynamicTrafficMarks.forEach((f) {
          print('added to the List');

          print('Traffic mark added ${trafficMarks.toList()}');
        });
      } else {
        print('null documents');
      }
    }
    try {
      Uint8List imageData = await getMarker();
      var location = await _locationTracker.getLocation();

      updateMarkerAndCircle(location, imageData);

      if (_locationSubscription != null) {
        _locationSubscription.cancel();
      }

      _locationSubscription =
          _locationTracker.onLocationChanged.listen((newLocalData) async {
        print(
            'The new data is ${newLocalData.latitude} \t ${newLocalData.longitude}');
        double distanceInMeter1;
        double distanceInMeter2;
        double distanceInMeter3;
        distanceInMeter1 = await Geolocator().distanceBetween(
          newLocalData.latitude,
          newLocalData.longitude,
          dynamicTrafficMarks[0].latitude,
          dynamicTrafficMarks[0].longitude,
        );
        distanceInMeter2 = await Geolocator().distanceBetween(
          newLocalData.latitude,
          newLocalData.longitude,
          dynamicTrafficMarks[1].latitude,
          dynamicTrafficMarks[1].longitude,
        );
        distanceInMeter3 = await Geolocator().distanceBetween(
          newLocalData.latitude,
          newLocalData.longitude,
          dynamicTrafficMarks[2].latitude,
          dynamicTrafficMarks[2].longitude,
        );
        if (distanceInMeter1 < 100) {
          setState(() {
            isNearTrafficSignal = true;
          });
          print('break applied');
        } else {
          setState(() {
            isNearTrafficSignal = false;
          });
        }
        if (distanceInMeter2 < 100 && isNearTrafficSignal != true) {
          setState(() {
            isNearTrafficSignal = true;
          });
          print('break applied');
        } else {
          setState(() {
            isNearTrafficSignal = false;
          });
        }
        if (distanceInMeter3 < 100 && isNearTrafficSignal != true) {
          setState(() {
            isNearTrafficSignal = true;
          });
          print('break applied');
        } else {
          setState(() {
            isNearTrafficSignal = false;
          });
        }

        if (_controller != null) {
          if (viewerMode == true) {
            Firestore.instance
                .collection('in-the-traffic-zone-ambulances')
                .document('ambulance1')
                .get()
                .then((value) async {
              GeoPoint point = value.data['location-data'];
              double distanceInMeter = await Geolocator().distanceBetween(
                point.latitude,
                point.longitude,
                dynamicTrafficMarks[1].latitude,
                dynamicTrafficMarks[1].longitude,
              );

              if (distanceInMeter < 100) {
                setState(() {
                  isNearTrafficSignal = true;
                });
              } else {
                setState(() {
                  isNearTrafficSignal = false;
                });
              }
            });
          } else {
            Map<String, dynamic> data = {
              "trafic-signal-name": "traffic-signal1",
              "location-data":
                  GeoPoint(newLocalData.latitude, newLocalData.longitude),
            };
            reference = Firestore.instance
                .collection('in-the-traffic-zone-ambulances')
                .document('ambulance1');
            reference.setData(data, merge: true);
            _controller.animateCamera(CameraUpdate.newCameraPosition(
                new CameraPosition(
                    bearing: 192.8334901395799,
                    target:
                        LatLng(newLocalData.latitude, newLocalData.longitude),
                    tilt: 0,
                    zoom: 18.00)));
            updateMarkerAndCircle(newLocalData, imageData);
          }
        }
      });
    } on Exception catch (e) {
      // ignore: unrelated_type_equality_checks
      if (e == 'PERMISSION_DENIED') {
        debugPrint("Permission Denied");
      }
    }
  }

  @override
  void initState() {
    // TODO: implement initState

    getTrafficPoints();
    // getCurrentLocation();
    super.initState();
  }

  Future<void> getTrafficPoints() async {
    print('getting traffic marks');

    await Firestore.instance
        .collection('/trafic_signals')
        .getDocuments()
        .then((value) {
      print('Got the ${value.documents.length}');
      value.documents.forEach((d) async {
        Uint8List imageData = await getTrafficMarker();
        GeoPoint point = d.data['latLng'];
        dynamicTrafficMarks.add(point);
        trafficMarks.add(Marker(
            markerId: MarkerId("${d.documentID}"),
            position: LatLng(point.latitude, point.longitude),
            draggable: false,
            zIndex: 2,
            flat: true,
            anchor: Offset(0.5, 0.5),
            icon: BitmapDescriptor.fromBytes(imageData)));
      });
    });
  }

  @override
  void dispose() {
    if (_locationSubscription != null) {
      _locationSubscription.cancel();
    }
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    //getTrafficPoints();
//    if (dynamicTrafficMarks.length != 0) {
//      print(dynamicTrafficMarks.first.longitude);
//      trafficMarks.forEach((f) {
//        print('the traffic $f');
//      });
//    }
    return Scaffold(
      appBar: AppBar(
        title: Text("Realtime Ambulance Tracking"),
        actions: <Widget>[
          IconButton(
            icon: Icon(Icons.person),
            onPressed: () {
              viewerMode = false;
            },
          )
        ],
      ),
      body: GoogleMap(
        mapType: MapType.hybrid,
        initialCameraPosition: initialLocation,
        markers: Set.of((marker != null) ? [marker, trafficMarks[2]] : []),
        circles: Set.of((circle != null) ? [circle] : []),
        onMapCreated: (GoogleMapController controller) {
          _controller = controller;
        },
      ),
      floatingActionButton: FloatingActionButton(
          child: Icon(Icons.location_searching),
          onPressed: () {
            //viewerMode = true;
            getCurrentLocation();
          }),
    );
  }
}

class TrafficMark {
  final GeoPoint;

  final String name;

  TrafficMark({this.GeoPoint, this.name});
}
