import 'dart:async';

import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:users_app/asistants/asistant_methods.dart';
import 'package:users_app/authentication/login_screeen.dart';
import 'package:users_app/widget/my_drawer.dart';

import '../global/global.dart';

class MainScreen extends StatefulWidget {
  const MainScreen({Key? key}) : super(key: key);

  @override
  
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {

  final Completer<GoogleMapController> _controllerGoogleMap =
  Completer<GoogleMapController>();

  GoogleMapController? newgoogleMapController;

  static const CameraPosition _kGooglePlex = CameraPosition(         //cordinates for initial location on google maps
    target: LatLng(37.42796133580664, -122.085749655962),
    zoom: 14.4746,
  );

  GlobalKey<ScaffoldState> sKey =GlobalKey<ScaffoldState>();//FOR DRAWER OPERATIONS
  double searchLocationContainerHeight=260.0;      //height of the animmated bottom drawer

  Position ?userCurrentPosition;
  var geoLocator = Geolocator();

  LocationPermission? _locationPermission;

  blackThemedGoogleMap(){
    newgoogleMapController?.setMapStyle('''
                    [
                      {
                        "elementType": "geometry",
                        "stylers": [
                          {
                            "color": "#242f3e"
                          }
                        ]
                      },
                      {
                        "elementType": "labels.text.fill",
                        "stylers": [
                          {
                            "color": "#746855"
                          }
                        ]
                      },
                      {
                        "elementType": "labels.text.stroke",
                        "stylers": [
                          {
                            "color": "#242f3e"
                          }
                        ]
                      },
                      {
                        "featureType": "administrative.locality",
                        "elementType": "labels.text.fill",
                        "stylers": [
                          {
                            "color": "#d59563"
                          }
                        ]
                      },
                      {
                        "featureType": "poi",
                        "elementType": "labels.text.fill",
                        "stylers": [
                          {
                            "color": "#d59563"
                          }
                        ]
                      },
                      {
                        "featureType": "poi.park",
                        "elementType": "geometry",
                        "stylers": [
                          {
                            "color": "#263c3f"
                          }
                        ]
                      },
                      {
                        "featureType": "poi.park",
                        "elementType": "labels.text.fill",
                        "stylers": [
                          {
                            "color": "#6b9a76"
                          }
                        ]
                      },
                      {
                        "featureType": "road",
                        "elementType": "geometry",
                        "stylers": [
                          {
                            "color": "#38414e"
                          }
                        ]
                      },
                      {
                        "featureType": "road",
                        "elementType": "geometry.stroke",
                        "stylers": [
                          {
                            "color": "#212a37"
                          }
                        ]
                      },
                      {
                        "featureType": "road",
                        "elementType": "labels.text.fill",
                        "stylers": [
                          {
                            "color": "#9ca5b3"
                          }
                        ]
                      },
                      {
                        "featureType": "road.highway",
                        "elementType": "geometry",
                        "stylers": [
                          {
                            "color": "#746855"
                          }
                        ]
                      },
                      {
                        "featureType": "road.highway",
                        "elementType": "geometry.stroke",
                        "stylers": [
                          {
                            "color": "#1f2835"
                          }
                        ]
                      },
                      {
                        "featureType": "road.highway",
                        "elementType": "labels.text.fill",
                        "stylers": [
                          {
                            "color": "#f3d19c"
                          }
                        ]
                      },
                      {
                        "featureType": "transit",
                        "elementType": "geometry",
                        "stylers": [
                          {
                            "color": "#2f3948"
                          }
                        ]
                      },
                      {
                        "featureType": "transit.station",
                        "elementType": "labels.text.fill",
                        "stylers": [
                          {
                            "color": "#d59563"
                          }
                        ]
                      },
                      {
                        "featureType": "water",
                        "elementType": "geometry",
                        "stylers": [
                          {
                            "color": "#17263c"
                          }
                        ]
                      },
                      {
                        "featureType": "water",
                        "elementType": "labels.text.fill",
                        "stylers": [
                          {
                            "color": "#515c6d"
                          }
                        ]
                      },
                      {
                        "featureType": "water",
                        "elementType": "labels.text.stroke",
                        "stylers": [
                          {
                            "color": "#17263c"
                          }
                        ]
                      }
                    ]
                ''');
  }          //used to apply black theme
  @override

  checkIfPermissionAllowed()async{
    _locationPermission=await Geolocator.requestPermission();                //THIS HELPS US TO REQUEST PERMISSION FOR SWITCHING ON THE LOCATION OF THE MOBILE
    if(_locationPermission==LocationPermission.denied){                    //IF DENIED WE ASK AGAIN FOR THE PERMISSION
      _locationPermission=await Geolocator.requestPermission();
    }
  }    //Asking permission for location

  locateUserPosition() async{
    Position current_Position=await Geolocator.getCurrentPosition(desiredAccuracy: LocationAccuracy.high);     //getting user location from mobile
    userCurrentPosition=current_Position;                                       // assign it to usercurrentPostion

    LatLng latlangPosition=LatLng(userCurrentPosition!.latitude, userCurrentPosition!.longitude);   //convert positionn into latitiude and longitude
    CameraPosition cameraPosition=CameraPosition(target: latlangPosition,zoom: 14); //assign it to camera position so that we can display on google maps

    newgoogleMapController?.animateCamera(CameraUpdate.newCameraPosition(cameraPosition)); //now update the google controller with the new cordinates

  }

  void initState(){
    super.initState();
    checkIfPermissionAllowed();
    AssistantMethods.readCurrentOnlineUserInfo();                  //WE CAN SEE ON CONSOLE WHO IS THE CUREEMT USER
  }
  Widget build(BuildContext context) {
    return Scaffold(
      key: sKey,  //IT IS USED FOR CLOSING THE DRAWER WHEN WE TAP ON AREA OUTSIDE THE DRAWER
      drawer: Container(
        width: 260,
        child: Theme(
          data: Theme.of(context).copyWith(
            canvasColor: Colors.black,
          ),
          child: MyDrawer(                        //a DRAWER IS A SIDE WINDOW WHICH OPENS ON CLICK OF A BUTTON AND WE CAM SHOW THE USER INFORMATION ON THE SAME
            name: userModelCurrentInfo?.name,
            email: userModelCurrentInfo?.email,
          ),
        ),
      ),
      body: Stack(                   //Used to overlap the widget on the page
        children: [
          GoogleMap(
            mapType: MapType.normal,
            myLocationEnabled: true,
            zoomGesturesEnabled: true,
            zoomControlsEnabled: true,
            initialCameraPosition:_kGooglePlex,
            onMapCreated: (GoogleMapController controller){
              _controllerGoogleMap.complete(controller);
              newgoogleMapController=controller;

              //for black theme google map
              blackThemedGoogleMap();  //black theme

              locateUserPosition();   //Updating the location of user
            },
          ),
          //CUSTOM HAMBURGER BUTTON FOR DRAWER
          Positioned(                    //The drawer is postioned using this and we can customise the postion and the theme of the button and add on click
            top: 38,
            left: 16,
            child: GestureDetector(
              onTap: (){
                  sKey.currentState!.openDrawer();             //opens the drawer
              },
              child: const CircleAvatar(         //theme of button
                backgroundColor: Colors.lightBlue,
                  child: Icon(
                    Icons.menu,
                    color: Colors.grey,
                  ),
              ),
            )
          ),

          //We are going to implemeent location

          Positioned(
            bottom: 0,
            left: 0,
            right: 0,
            child: AnimatedSize(
              curve: Curves.easeIn,
              duration: const Duration(milliseconds: 120),
              child: Container(
                height:searchLocationContainerHeight ,
                decoration: const BoxDecoration(
                  color: Colors.black54,
                  borderRadius: BorderRadius.only(
                    topRight: Radius.circular(20),
                    topLeft: Radius.circular(20),
                  )
                ),

                child: Column(
                  children: [
                    SizedBox(height: 10,),
                    //From
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children:[
                        const SizedBox(width: 12.0,),
                        const Icon(Icons.add_location_alt_outlined, color: Colors.grey),
                        const SizedBox(width: 12.0,),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children:[
                            const Text(
                            "From",
                            style: TextStyle(
                              color: Colors.grey,
                              fontSize: 12,
                            ),
                          ),
                            //CURRENT LOCATION
                            Text("your current location",style: TextStyle(
                              color: Colors.grey,
                              fontSize: 12,
                            ),)
                      ],
                        )
                ],
                    ),
                    const SizedBox(height: 10,),
                    Divider(
                      height: 1,
                      thickness: 1,
                      color: Colors.grey,
                    ),
                    const SizedBox(height: 10,),
                    //TO
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children:[
                        const SizedBox(width: 12.0,),
                        const Icon(Icons.add_location_alt_outlined, color: Colors.grey),
                        const SizedBox(width: 12.0,),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children:[
                            const Text(
                              "To",
                              style: TextStyle(
                                color: Colors.grey,
                                fontSize: 12,
                              ),
                            ),
                            //CURRENT LOCATION
                            Text("Destination",style: TextStyle(
                              color: Colors.grey,
                              fontSize: 12,
                            ),)
                          ],
                        )
                      ],
                    ),
                    const SizedBox(height: 10,),
                    const Divider(
                      height: 1,
                      thickness: 1,
                      color: Colors.grey,
                    ),
                    const SizedBox(height: 10,),

                    ElevatedButton(onPressed: (){

                    },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.green,
                        textStyle: const TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                        )
                      ),
                      child: const Text(
                      "Request a Ride"),
                    )],
                ),
              ),
            ),
          )
        ],
      ),
    );
  }
}
