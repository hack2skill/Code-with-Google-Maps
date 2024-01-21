import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:snap_trash/main.dart';
import 'package:snap_trash/pages/locationPages/locationPrompt.dart';
import 'package:snap_trash/properties/colourProp.dart';
import 'package:camera/camera.dart';

class cameraScreen extends StatefulWidget {
  const cameraScreen({
    super.key,
    this.cameraController,
    required this.initCamera,
  });
  final CameraController? cameraController;
  final Future<void> Function({required bool frontCamera}) initCamera;

  @override
  State<cameraScreen> createState() => _cameraScreenState();
}

class _cameraScreenState extends State<cameraScreen> {
  bool _isFrontCamera = true;

  // location
  late String lat;
  late String long;
  late String locationMessage;

  // for location to work
  // Future<Position> _getCurrentLocation() async {
  //   bool serviceEnabled = await Geolocator.isLocationServiceEnabled();
  //   if (!serviceEnabled) {
  //     return Future.error('location services are dissabled');
  //   }

  //   LocationPermission permission = await Geolocator.checkPermission();
  //   if (permission == LocationPermission.denied) {
  //     permission = await Geolocator.requestPermission();
  //     if (permission == LocationPermission.denied) {
  //       return Future.error('location Permission are denied');
  //     }
  //   }

  //   if (permission == LocationPermission.deniedForever) {
  //     return Future.error(
  //         'locationpermission denied,  we cannot process request');
  //   }
  //   return await Geolocator.getCurrentPosition();
  // }

  @override
  Widget build(BuildContext context) {
    // size variable
    double screenWidth = MediaQuery.of(context).size.width;
    double screenheight = MediaQuery.of(context).size.height;

    return Container(
      height: screenheight * 1.1,
      child: Stack(
        clipBehavior: Clip.none,
        alignment: Alignment.bottomCenter,
        children: [
          (widget.cameraController == null)
              ? Container(
                  decoration: BoxDecoration(color: rangPrimary),
                  child: Column(
                    children: [
                      Text(
                        "Start reporting Trash",
                        style: GoogleFonts.montserrat(
                          // fontWeight: FontWeight.bold,
                          fontSize: screenheight / 30,
                          color: rang6,
                        ),
                      ),
                      Text(
                        "Click the button bellow",
                        style: GoogleFonts.montserrat(
                          // fontWeight: FontWeight.bold,
                          fontSize: screenheight / 30,
                          color: rang6,
                        ),
                      ),
                    ],
                  ),
                )
              : GestureDetector(
                  onDoubleTap: () {
                    _isFrontCamera != _isFrontCamera;
                    widget.initCamera(frontCamera: _isFrontCamera);

                    // Navigator.push(
                    //   context,
                    //   MaterialPageRoute(
                    //     builder: (context) => locationPromptPage(),
                    //   ),
                    // );
                    print("DOUBLE TAP");
                  },
                  child: Container(
                    clipBehavior: Clip.none,
                    color: rang6,
                    child: Padding(
                      padding: const EdgeInsets.all(0.0),
                      child: CameraPreview(widget.cameraController!),
                    ),
                  ),
                ),
          Positioned(
            bottom: 30,
            child: Row(
              children: [
                getLocationCoordinates(),
              ],
            ),
          )
        ],
      ),
    );
  }
}
