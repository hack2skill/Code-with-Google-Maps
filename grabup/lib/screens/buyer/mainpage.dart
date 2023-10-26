import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:grabup/dataprovider/address.dart';
import 'package:grabup/dataprovider/appdata.dart';
import 'package:grabup/dataprovider/scrap_marker_model.dart';
import 'package:grabup/helpers/dio_exceptions.dart';
import 'package:grabup/helpers/shared_prefs.dart';
import 'package:grabup/screens/buyer/searchpage.dart';
import 'package:grabup/utils/AppConstants.dart';
import 'package:latlong2/latlong.dart';
import 'package:provider/provider.dart';
import 'package:url_launcher/url_launcher.dart';

class MainPage extends StatefulWidget {
  const MainPage({Key? key}) : super(key: key);
  static const String id = 'mainpage';

  @override
  State<MainPage> createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> with TickerProviderStateMixin {
  LatLng latLng = getLatLngFromSharedPrefs();
  late var markers = <Marker>[];
  bool isDestination = false;
  var item;

  final pageController = PageController();
  int selectedIndex = 0;

  // late CameraPosition _initialCameraPosition;
  // late final MapboxMapController controller;
  // late MapboxMap map;

  TextEditingController sourceController = TextEditingController();
  TextEditingController destinationController = TextEditingController();
  late final MapController controller;
  Dio _dio = Dio();

  @override
  void initState() {
    super.initState();
    // _initialCameraPosition = CameraPosition(target: latLng, zoom: 15);
    // print("lol${latLng}");
    controller = MapController();
    getAddress();
  }

  // _onMapCreated(MapboxMapController controller) async {
  //   Future.delayed(Duration(seconds: 5), () {
  //     this.controller = controller;
  //   });
  // }

  Future getReverseGeocodingUsingMapbox() async {
    String url =
        "https://api.mapbox.com/geocoding/v5/mapbox.places/${latLng.longitude},${latLng.latitude}.json?access_token=${AppConstants.mapBoxAccessToken}";
    try {
      _dio.options.contentType = Headers.jsonContentType;
      final responseData = await _dio.get(url);
      return responseData.data;
    } catch (e) {
      final errorMessage = DioExceptions.fromDioError(e as DioError).toString();
      debugPrint(errorMessage);
    }
  }

  Future getAddress() async {
    final response = await getReverseGeocodingUsingMapbox();
    if (response != Null) {
      double latitude = response["features"][0]["center"][0];
      double longitude = response["features"][0]["center"][1];
      String address = response["features"][0]["context"][0]["text"] +
          ", " +
          response["features"][0]["place_name"];
      Address currentAddress =
          Address(placeName: address, latitude: latitude, longitude: longitude);
      Provider.of<AppData>(context, listen: false)
          .updateCurrentAddress(currentAddress);
      print(currentAddress);
    }
  }

  void addMarker() {
    double? lat1 =
        Provider.of<AppData>(context, listen: false).destination!.latitude;
    double? long1 =
        Provider.of<AppData>(context, listen: false).destination!.longitude;
    LatLng latLng1 = LatLng(lat1!, long1!);
    print("yoyoyo $latLng1");
    Marker marker = Marker(
        width: 40.0,
        height: 40.0,
        point: latLng1,
        builder: (ctx) => Container(
              key: Key('green'),
              child: new Tab(
                icon: new Image.asset("assets/images/destmarker.png"),
              ),
            ));
    setState(() {
      markers.add(marker);
      var newMarkers = <Marker>[
        for (int i = 0; i < mapMarkers.length; i++)
          Marker(
            width: 40.0,
            height: 40.0,
            point: mapMarkers[i].location ?? AppConstants.myLocation,
            builder: (_) {
              return GestureDetector(
                onTap: () {
                  pageController.animateToPage(
                    i,
                    duration: const Duration(milliseconds: 500),
                    curve: Curves.easeIn,
                  );
                  selectedIndex = i;
                  // LatLng tempLatLng = mapMarkers[i].location ??
                  //     latLng1;
                  // _animatedMapMove(tempLatLng, 17);
                  setState(() {});
                },
                child: AnimatedScale(
                  duration: const Duration(milliseconds: 500),
                  scale: 1,
                  child: AnimatedOpacity(
                    duration: const Duration(milliseconds: 500),
                    opacity: 1,
                    child: new Tab(
                      icon: new Image.asset(
                        "assets/images/r3.png",
                        height: 200,
                        width: 200,
                      ),
                    ),
                  ),
                ),
                // child: new Tab(icon: new Image.asset("images/poi.png")),
              );
            },
          )
      ];
      markers.addAll(newMarkers);
    });
    print(markers.length);
    controller.move(latLng1, 17);
  }

  @override
  Widget build(BuildContext context) {
    markers = <Marker>[
      Marker(
        width: 40.0,
        height: 40.0,
        point: latLng,
        builder: (ctx) => Container(
          key: Key('blue'),
          child: new Tab(icon: new Image.asset("assets/images/poi.png")),
        ),
      )
    ];

    if (isDestination) {
      addMarker();
    }

    return Scaffold(
      body: Stack(
        children: [
          FlutterMap(
            mapController: controller,
            options: MapOptions(
              minZoom: 5,
              maxZoom: 18,
              zoom: 17,
              center: AppConstants.myLocation,
            ),
            children: [
              TileLayer(
                urlTemplate:
                    "https://api.mapbox.com/styles/v1/mrkcr707/{mapStyleId}/tiles/256/{z}/{x}/{y}@2x?access_token={accessToken}",
                additionalOptions: {
                  'mapStyleId': AppConstants.mapBoxStyleId,
                  'accessToken': AppConstants.mapBoxAccessToken,
                },
              ),
              MarkerLayer(markers: markers),
            ],
          ),
          Positioned(
            bottom: 0,
            right: 0,
            left: 0,
            child: GestureDetector(
              onTap: () async {
                var res = await Navigator.push(context,
                    MaterialPageRoute(builder: (context) => SearchPage()));
                if (res == "getDirection") {
                  setState(() {
                    isDestination = true;
                  });
                }
              },
              child: !isDestination
                  ? Container(
                      height: 210,
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.only(
                            topLeft: Radius.circular(15),
                            topRight: Radius.circular(15)),
                        boxShadow: [
                          BoxShadow(
                              color: Colors.black26,
                              blurRadius: 15.0,
                              spreadRadius: 0.5,
                              offset: Offset(0.7, 0.7)),
                        ],
                      ),
                      child: Padding(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 24, vertical: 18),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: <Widget>[
                            SizedBox(
                              height: 5,
                            ),
                            Text(
                              'Make this world a better place together!',
                              style: TextStyle(fontSize: 10),
                            ),
                            Text(
                              'Where you want to find scrap?',
                              style: TextStyle(
                                  fontSize: 18, fontFamily: "Brand-Bold"),
                            ),
                            SizedBox(
                              height: 20,
                            ),
                            Container(
                              decoration: BoxDecoration(
                                color: Colors.white,
                                borderRadius: BorderRadius.circular(4),
                                boxShadow: [
                                  BoxShadow(
                                    color: Colors.black26,
                                    blurRadius: 5.0,
                                    spreadRadius: 0.5,
                                    offset: Offset(0.7, 0.7),
                                  ),
                                ],
                              ),
                              child: Padding(
                                padding: const EdgeInsets.all(12.0),
                                child: Row(
                                  children: <Widget>[
                                    Icon(
                                      Icons.search,
                                      color: Colors.green,
                                    ),
                                    SizedBox(
                                      width: 10,
                                    ),
                                    Text("Find scrap")
                                  ],
                                ),
                              ),
                            ),
                            SizedBox(
                              height: 15,
                            ),
                            Row(
                              children: <Widget>[
                                Icon(
                                  Icons.home,
                                  color: Colors.grey.shade400,
                                ),
                                SizedBox(
                                  width: 12,
                                ),
                                Flexible(
                                  child: Container(
                                    child: Column(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      children: [
                                        Text(
                                          (Provider.of<AppData>(context)
                                                      .currentLocation
                                                      ?.placeName !=
                                                  null)
                                              ? Provider.of<AppData>(context)
                                                  .currentLocation
                                                  ?.placeName as String
                                              : "Add Location",
                                          textAlign: TextAlign.left,
                                          overflow: TextOverflow.ellipsis,
                                        ),
                                        SizedBox(
                                          height: 6,
                                        ),
                                        Text(
                                          'Your current address',
                                          style: TextStyle(
                                              fontSize: 11,
                                              color: Colors.grey.shade700),
                                        )
                                      ],
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                    )
                  : Container(),
            ),
          ),
          isDestination
              ? Positioned(
                  left: 0,
                  right: 0,
                  bottom: 2,
                  height: MediaQuery.of(context).size.height * 0.3,
                  child: PageView.builder(
                    controller: pageController,
                    itemCount: mapMarkers.length,
                    itemBuilder: (_, index) {
                      item = mapMarkers[index];
                      return Padding(
                        padding: const EdgeInsets.all(15.0),
                        child: Card(
                          elevation: 5,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(10),
                          ),
                          color: Colors.white,
                          child: Row(
                            children: [
                              const SizedBox(width: 10),
                              Expanded(
                                child: Column(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    SizedBox(
                                      height: 8,
                                    ),
                                    Expanded(
                                      flex: 2,
                                      child: Column(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        mainAxisAlignment:
                                            MainAxisAlignment.start,
                                        children: [
                                          SizedBox(
                                            height: 20,
                                          ),
                                          Text(
                                            item.title ?? '',
                                            style: const TextStyle(
                                              fontSize: 20,
                                              fontWeight: FontWeight.bold,
                                            ),
                                          ),
                                          const SizedBox(height: 20),
                                          TextButton(
                                            onPressed: () async {
                                              Uri phoneno = Uri.parse(
                                                  'tel:+916755654544');
                                              if (await launchUrl(phoneno)) {
                                                //dialer opened
                                              } else {
                                                //dailer is not opened
                                              }
                                            },
                                            child: Container(
                                              color: Colors.green,
                                              padding:
                                                  const EdgeInsets.symmetric(
                                                      vertical: 10,
                                                      horizontal: 20),
                                              child: const Text(
                                                'Hit the deal',
                                                style: TextStyle(
                                                    color: Colors.white,
                                                    fontSize: 13.0),
                                              ),
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                              const SizedBox(width: 5),
                              Expanded(
                                child: Padding(
                                  padding: const EdgeInsets.all(1.0),
                                  child: ClipRRect(
                                    borderRadius: BorderRadius.circular(10),
                                    child: Container(
                                      height: 130,
                                      child: Image.asset(
                                        item.image ?? '',
                                        fit: BoxFit.fitHeight,
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                              const SizedBox(width: 10),
                            ],
                          ),
                        ),
                      );
                    },
                    onPageChanged: (value) {
                      _animatedMapMove(item.location, 17);
                    },
                  ),
                )
              : Container(),
        ],
      ),
    );
  }

  void _animatedMapMove(LatLng destLocation, double destZoom) {
    // Create some tweens. These serve to split up the transition from one location to another.
    // In our case, we want to split the transition be<tween> our current map center and the destination.
    final latTween = Tween<double>(
        begin: controller.center.latitude, end: destLocation.latitude);
    final lngTween = Tween<double>(
        begin: controller.center.longitude, end: destLocation.longitude);
    final zoomTween = Tween<double>(begin: controller.zoom, end: destZoom);

    // Create a animation controller that has a duration and a TickerProvider.
    var mapController = AnimationController(
        duration: const Duration(milliseconds: 1000), vsync: this);
    // The animation determines what path the animation will take. You can try different Curves values, although I found
    // fastOutSlowIn to be my favorite.
    Animation<double> animation =
        CurvedAnimation(parent: mapController, curve: Curves.easeIn);

    mapController.addListener(() {
      controller.move(
        LatLng(latTween.evaluate(animation), lngTween.evaluate(animation)),
        destZoom,
      );
    });

    mapController.addListener(() {
      controller.move(
        LatLng(latTween.evaluate(animation), lngTween.evaluate(animation)),
        zoomTween.evaluate(animation),
      );
    });

    animation.addStatusListener((status) {
      if (status == AnimationStatus.completed) {
        mapController.dispose();
      } else if (status == AnimationStatus.dismissed) {
        mapController.dispose();
      }
    });

    mapController.forward();
  }
}
