import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_polyline_points/flutter_polyline_points.dart';
import 'package:flutter_rating_stars/flutter_rating_stars.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:location/location.dart';
import 'package:sizer/sizer.dart';
import 'package:tripn/constants.dart';

const LatLng currentLocationlatlong = LatLng(10.072406, 76.309342);

class MapSample extends StatefulWidget {
  const MapSample({super.key, this.pointMap});
  final pointMap;
  @override
  State<MapSample> createState() => MapSampleState();
}

class MapSampleState extends State<MapSample> {
  final Completer<GoogleMapController> _controller =
      Completer<GoogleMapController>();

  static const CameraPosition _kGooglePlex = CameraPosition(
      target: currentLocationlatlong,
      tilt: 59.440717697143555,
      zoom: 19.151926040649414);

  static const CameraPosition _kLake = CameraPosition(
      bearing: 192.8334901395799,
      target: LatLng(10.072406, 76.309342),
      tilt: 59.440717697143555,
      zoom: 19.151926040649414);

  List<LatLng> polyLineCordinates = [];
  LocationData? currentLocation;

 

  void getPolyPoints() async {
    PolylinePoints polylinePoints = PolylinePoints();
    PolylineResult result = await polylinePoints.getRouteBetweenCoordinates(
      googleApiKey,
      travelMode: TravelMode.driving,
      PointLatLng(currentLocation!.latitude!, currentLocation!.longitude!),
      PointLatLng(
          places[places.length - 1]["lat"], places[places.length - 1]["lng"]),
    );
    if (result.points.isNotEmpty) {
      for (var point in result.points) {
        polyLineCordinates.add(
          LatLng(point.latitude, point.longitude),
        );
      }
      setState(() {});
    }
  }

  List places = [
    {
      "address": "272F+6MH, Queens Walkway, Mulavukad, Kochi, Ernakulam",
      "description":
          "A scenic fishing spot with a stunning view of Queens Walkway in Mulavukad, Kochi, Ernakulam.",
      "etime": 10.512,
      "lat": 10.0005704,
      "lng": 76.27423689999999,
      "name": "Fishing & View Point",
      "pic": null,
      "rating": 5,
      "stime": 10.0,
      "ttime": "0.512",
      "type": "travel"
    },
    {
      "address":
          "273G+W5F, Safdar Hashmi Ln, Shanmugapuram Colony, Pachalam, Kochi, Ernakulam",
      "description":
          "Fishland273G+W5F is a seafood restaurant located in Shanmugapuram Colony, Kochi, offering a delightful culinary experience.",
      "etime": 11.536000000000001,
      "lat": 10.0047437,
      "lng": 76.2754405,
      "name": "Fishland",
      "pic":
          "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=AcJnMuFfXMa1o8y2xI9K9TNpxAK_PjjcsLXbCL9W1wD2DEFFfRLK9gtBmXIss9VyPTwyyebb8bRtra2J4Lvdjev3XbP_lspkDtQO4RIGTGZ3f0SwQLs-5B2WT34a3IAWBZ3fW_mUjJ3bxeudWyPJK75N-TjDE85X708r01BooR8Qi9EN6G4K&key=AIzaSyD1eYmck8n38D1TdPRc52RCtg-HnpU0B9U",
      "rating": 5,
      "stime": 11.024000000000001,
      "ttime": "0.512",
      "type": "travel"
    },
    {
      "address": "X7XF+H5G, Goshree Chathiyath Rd, Pachalam, Ernakulam",
      "description":
          "Queen's Walkway is a scenic pathway located in Pachalam, Ernakulam, offering a delightful stroll along Goshree Chathiyath Road.",
      "etime": 12.061000000000002,
      "lat": 9.9989255,
      "lng": 76.27296249999999,
      "name": "Queen's Walkway",
      "pic":
          "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=AcJnMuFN68Msk5-8MZ7cLEVNA-4eKJC3JZIc6OvPqIK6xhYPXwnWdVMPyE1fh4JEKw3G9OfXrrGDZK1QeOdhrtgv9BmesGMCUAz9dN5Y2S-faVP7LuPH2GK6vZenRU8qZuUuyIVbbQm1tki0NQgNd8netwTPVtm7YVHgHRTZtUTuKAs01FIu&key=AIzaSyD1eYmck8n38D1TdPRc52RCtg-HnpU0B9U",
      "rating": 4.6,
      "stime": 11.536000000000001,
      "ttime": "0.525",
      "type": "travel"
    },
    {
      "address": "High Court Junction, Marine Drive, Kochi, Ernakulam",
      "description":
          "Kochi water metroHigh Court Junction, Marine Drive, Kochi, Ernakulam: A scenic and convenient mode of transportation to explore the beautiful waterways of Kochi.",
      "etime": 12.592000000000002,
      "lat": 9.983779199999999,
      "lng": 76.27395059999999,
      "name": "Kochi water metro",
      "pic":
          "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=AcJnMuH4RO5wHgVphzYTBCsmElfLXZK7G1DDB3s60e7bCplZt22Jpsttro33rH_NvWGJiA5vSk9JoaCGt-D5JOhZ_HNeO_xk8yg4QDNsHfhwusl_YZS5EsgPz27hwCGKOCks-WDPAVrhzD8jaBBn7uGV88us32435kLZjKIswgWb-q4AnwUJ&key=AIzaSyD1eYmck8n38D1TdPRc52RCtg-HnpU0B9U",
      "rating": 4.5,
      "stime": 12.061000000000002,
      "ttime": "0.531",
      "type": "travel"
    },
    {
      "address": "Abdul Kalam Marg, Marine Drive, Kochi, Ernakulam",
      "description":
          "New Marine Drive in Kochi offers a scenic coastal promenade with stunning views of the Arabian Sea.",
      "name": "New Marine Drive",
      "pic":
          "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=AcJnMuHxjo0UaSZMOR7ChrqANZnV2GJR08C4MaK4uLBzcsNW9wXXMrWbqhPCBZNJHMMYEfSDy7SjOGdb7PZnC_TfIHrjPRNFYSohRqUqIHmIYXAVBmBUDrFCpnsMCd7m7blhlCOeRxklTLUvo3ljouBa1sML0CtLTZlyyq502vgK8RCpLF5-&key=AIzaSyD1eYmck8n38D1TdPRc52RCtg-HnpU0B9U",
      "rating": 4.5,
      "stime": 12.592000000000002,
      "ttime": "0.393",
      "type": "travel"
    }
  ];
  @override
  void initState() {
   
    getPolyPoints();
    places = widget.pointMap["result"];
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: currentLocation == null
            ? const Center(child: CircularProgressIndicator())
            : Stack(
                children: [
                  GoogleMap(
                    mapType: MapType.normal,
                    myLocationButtonEnabled: true,
                    zoomControlsEnabled: true,
                    zoomGesturesEnabled: true,
                    polylines: {
                      Polyline(
                        polylineId: const PolylineId("route"),
                        points: polyLineCordinates,
                        color: Colors.green,
                        width: 10,
                      )
                    },
                    markers: {
                      Marker(
                        markerId: const MarkerId("current locaton"),
                        position: LatLng(currentLocation!.latitude!,
                            currentLocation!.longitude!),
                      ),
                      Marker(
                        markerId: const MarkerId("source"),
                        position: LatLng(places[0]["lat"], places[0]["lng"]),
                      ),
                      Marker(
                        markerId: const MarkerId("destination"),
                        position: LatLng(places[places.length - 1]["lat"],
                            places[places.length - 1]["lng"]),
                      ),
                    },
                    initialCameraPosition: _kGooglePlex,
                    onMapCreated: (GoogleMapController controller) {
                      _controller.complete(controller);
                    },
                  ),
                  DraggableScrollableSheet(
                    initialChildSize: 0.35, // Set the initial size as needed.
                    minChildSize: 0.25, // Set the minimum size as needed.
                    maxChildSize: 0.9, // Set the maximum size as needed.
                    builder: (BuildContext context,
                        ScrollController scrollController) {
                      return Container(
                          decoration: BoxDecoration(
                              boxShadow: [
                                BoxShadow(
                                    color: Colors.grey.shade600,
                                    spreadRadius: 1,
                                    blurRadius: 7)
                              ],
                              color: const Color.fromARGB(255, 248, 246, 246),
                              borderRadius: BorderRadius.circular(25)),
                          child: SingleChildScrollView(
                            controller: scrollController,
                            child: Column(
                              children: [
                                Icon(
                                  Icons.remove,
                                  size: 40.sp,
                                ),
                                Padding(
                                  padding:
                                      EdgeInsets.symmetric(horizontal: 2.2.h),
                                  child: Row(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.center,
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceBetween,
                                    children: [
                                      Column(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          Text(
                                            'Today\'s Trip',
                                            style: GoogleFonts.poppins(
                                                fontSize: 24.sp,
                                                fontWeight: FontWeight.w600,
                                                color: Colors.black87),
                                          ),
                                          Text(
                                            'Starting Time: ${places[0]["stime"].floor().toString()} pm',
                                            style: GoogleFonts.poppins(
                                                fontSize: 11.sp,
                                                fontWeight: FontWeight.w400,
                                                color: Colors.black54),
                                          ),
                                          MaterialButton(
                                            onPressed: () {},
                                            elevation: 0,
                                            color: Colors.green[800],
                                            child: Text(
                                              'Start Trip',
                                              style: GoogleFonts.poppins(
                                                  fontSize: 15.sp,
                                                  fontWeight: FontWeight.w600,
                                                  color: Colors.white),
                                            ),
                                          )
                                        ],
                                      ),
                                      Column(
                                        children: [
                                          Text(
                                            '3',
                                            style: GoogleFonts.poppins(
                                                fontSize: 20.sp,
                                                fontWeight: FontWeight.bold,
                                                color: Colors.green[900]),
                                          ),
                                          Text(
                                            'hrs',
                                            style: GoogleFonts.poppins(
                                                fontSize: 9.sp,
                                                fontWeight: FontWeight.w400,
                                                color: Colors.black54),
                                          )
                                        ],
                                      )
                                    ],
                                  ),
                                ),
                                SizedBox(
                                  height: double.maxFinite,
                                  child: ListView.builder(
                                      physics: const BouncingScrollPhysics(),
                                      itemCount: places.length,
                                      itemBuilder: (context, index) {
                                        return triPlan(places, index);
                                      }),
                                ),
                              ],
                            ),
                          ));
                    },
                  )
                ],
              )
        // floatingActionButton: FloatingActionButton.extended(
        //   onPressed: _goToTheLake,
        //   label: const Text('To the lake!'),
        //   icon: const Icon(Icons.directions_boat),
        // ),
        );
  }

  Column triPlan(places, index) {
    String timetake = places[index]["ttime"];
    double doubleValue = double.parse(timetake);
    double inMinutes = doubleValue * 60;
    return Column(
      children: [
        const Divider(),
        Padding(
          padding: EdgeInsets.all(1.1.h),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Padding(
                padding: EdgeInsets.only(left: 1.2.h),
                child: Container(
                  height: 12.h,
                  width: 12.h,
                  decoration: BoxDecoration(
                    image: DecorationImage(
                      fit: BoxFit.fill,
                      image: NetworkImage(
                        places[index]["pic"] ??
                            'https://images.pexels.com/photos/5359389/pexels-photo-5359389.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                      ),
                    ),
                    borderRadius: BorderRadius.circular(10),
                  ),
                ),
              ),
              Padding(
                padding: EdgeInsets.only(left: 1.h),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    SizedBox(
                      width: 50.w,
                      child: Text(
                        places[index]["name"],
                        style: GoogleFonts.poppins(
                            fontWeight: FontWeight.w600,
                            color: Colors.green[800],
                            fontSize: 13.sp,
                            textStyle: const TextStyle(
                                overflow: TextOverflow.ellipsis)),
                      ),
                    ),
                    Row(
                      children: [
                        Text(
                          '${places[index]["stime"].toStringAsFixed(1)} pm',
                          style: GoogleFonts.poppins(
                            fontSize: 11.sp,
                            fontWeight: FontWeight.w500,
                            color: Colors.grey[700],
                          ),
                        ),
                        SizedBox(
                          width: 1.w,
                        ),
                        RatingStars(
                          starSize: 10.sp,
                          value: places[index]["rating"].toDouble(),
                          valueLabelColor: Colors.green,
                        ),
                      ],
                    ),
                    SizedBox(
                      width: 50.w,
                      child: Text(
                        places[index]["description"],
                        style: GoogleFonts.poppins(
                          fontSize: 8.sp,
                          color: Colors.black54,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              Padding(
                padding: EdgeInsets.symmetric(horizontal: 2.w),
                child: Column(
                  children: [
                    Image.network(
                        'https://img.icons8.com/metro/26/646464/car.png'),
                    Text(
                      inMinutes.toStringAsFixed(1),
                      style: GoogleFonts.poppins(
                          fontSize: 12.sp,
                          fontWeight: FontWeight.bold,
                          color: Colors.black87),
                    ),
                    Text(
                      'min',
                      style: GoogleFonts.poppins(
                          fontSize: 9.sp,
                          fontWeight: FontWeight.w500,
                          color: Colors.black54),
                    )
                  ],
                ),
              )
            ],
          ),
        ),
        const Divider()
      ],
    );
  }

  Future<void> _goToTheLake() async {
    final GoogleMapController controller = await _controller.future;
    await controller.animateCamera(CameraUpdate.newCameraPosition(_kLake));
  }
}
