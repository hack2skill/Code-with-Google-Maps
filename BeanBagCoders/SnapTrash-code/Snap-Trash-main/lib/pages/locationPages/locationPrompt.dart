import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:snap_trash/main.dart';
import 'package:snap_trash/properties/colourProp.dart';

class locationPromptPage extends StatefulWidget {
  const locationPromptPage({super.key});

  @override
  State<locationPromptPage> createState() => _locationPromptPageState();
}

class _locationPromptPageState extends State<locationPromptPage> {
  late String lat;
  late String long;
  String? locationMessage;

  // for location to work
  Future<Position> getCurrentLocation() async {
    Position position = await Geolocator.getCurrentPosition(
      desiredAccuracy: LocationAccuracy.high,
    );

    bool serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
      return Future.error('location services are dissabled');
    }

    LocationPermission permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
      if (permission == LocationPermission.denied) {
        return Future.error('location Permission are denied');
      }
    }

    if (permission == LocationPermission.deniedForever) {
      return Future.error(
        'locationpermission denied,  we cannot process request',
      );
    }
    return await Geolocator.getCurrentPosition();
  }

  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;
    double screenheight = MediaQuery.of(context).size.height;

    getCurrentLocation().then(
      (value) {
        lat = '${value.latitude}';
        long = '${value.longitude}';
        setState(() {
          locationMessage = 'latitude: $lat, Longitude: $long';
        });

        print(locationMessage);
      },
    );

    return Dialog(
      shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.all(Radius.circular(25))),
      child: Container(
        height: screenheight * 0.8,
        width: screenWidth * .7,
        decoration: BoxDecoration(
          color: rangPrimary,
          borderRadius: BorderRadius.all(Radius.circular(25)),
        ),
        child: ListView(
          children: [
            Column(
              children: [
                Container(
                  height: screenheight * 0.02,
                ),
                Text(
                  'Thanks for',
                  style: GoogleFonts.montserrat(
                    fontWeight: FontWeight.bold,
                    fontSize: screenheight / 30,
                    color: rangBackground,
                  ),
                ),
                Text(
                  'Reporting Trash !!',
                  style: GoogleFonts.montserrat(
                    fontWeight: FontWeight.bold,
                    fontSize: screenheight / 30,
                    color: rangBackground,
                  ),
                ),
                Container(
                  height: screenheight * 0.05,
                ),
                Container(
                  height: screenheight * 0.3,
                  width: screenWidth * 0.5,
                  decoration: BoxDecoration(
                    color: rang6,
                    borderRadius: BorderRadius.all(
                      Radius.circular(25),
                    ),
                  ),
                  child: Image(
                    image: AssetImage(
                      "assets/images/imageHard.jpg",
                    ),
                    fit: BoxFit.contain,
                  ),
                ),
                Container(
                  height: screenheight * 0.05,
                ),
                Container(
                  height: screenheight * 0.3,
                  width: screenWidth * 0.65,
                  color: rangPrimary,
                  child: Column(
                    children: [
                      Text(
                        'Your Current Location:',
                        style: GoogleFonts.montserrat(
                          // fontWeight: FontWeight.bold,
                          fontSize: screenheight / 40,
                          color: rangBackground,
                        ),
                      ),
                      Container(
                        height: screenheight * 0.02,
                      ),
                      Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Text(
                          locationMessage.toString(),
                          style: GoogleFonts.montserrat(
                            // fontWeight: FontWeight.bold,
                            fontSize: screenheight / 40,
                            color: rangBackground,
                          ),
                        ),
                      ),
                      Container(
                        height: screenheight * 0.05,
                      ),
                      Text(
                        'Report your near by authorities',
                        style: GoogleFonts.montserrat(
                          // fontWeight: FontWeight.bold,
                          fontSize: screenheight / 40,
                          color: rangBackground,
                        ),
                      ),
                      Container(
                        height: screenheight * 0.02,
                      ),
                      Container(
                        height: 20,
                        child: ElevatedButton(
                          child: Text(
                            "     .     ",
                            style: GoogleFonts.montserrat(
                              fontWeight: FontWeight.bold,
                              // fontSize: screenheight / 27,
                              color: rangNeutral,
                            ),
                          ),
                          style: ElevatedButton.styleFrom(
                            shape: RoundedRectangleBorder(
                              borderRadius:
                                  BorderRadius.circular(screenheight * 0.5),
                            ),
                            // elevation: 5,
                            backgroundColor: rang6,
                            foregroundColor: rang6,
                          ),
                          onPressed: () {},
                        ),
                      ),
                    ],
                  ),
                ),
                Container(
                  height: screenheight * 0.05,
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
