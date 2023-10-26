import 'dart:async';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_barcode_scanner/flutter_barcode_scanner.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:marker_icon/marker_icon.dart';
import 'package:provider/provider.dart';
import 'package:taxiflex/Screens/screens.dart';
import 'package:unicons/unicons.dart';
import 'package:we_slide/we_slide.dart';

import '../Services/services.dart';
import '../Utils/utils.dart';
import 'checkout_page.dart';

class MapScreen extends StatefulWidget {
  const MapScreen({super.key});

  @override
  State<MapScreen> createState() => _MapScreenState();
}

class _MapScreenState extends State<MapScreen> with WidgetsBindingObserver {
  final GlobalKey<ScaffoldState> _key = GlobalKey();

  //* Google maps stuff
  final Completer<GoogleMapController> _mapController = Completer();
  Map<MarkerId, Marker> markers = <MarkerId, Marker>{};
  String? _darkMapStyle;
  String? _lightMapStyle;
  Set<Marker> startMarkers = {};

  //* Changing map styles according to theme
  Future _loadMapStyles() async {
    _darkMapStyle = await rootBundle
        .loadString('lib/Assets/map_styles/dark_map_style.json');
    _lightMapStyle = await rootBundle
        .loadString('lib/Assets/map_styles/light_map_style.json');
  }

  //* Setting the map style according to the theme of the users phone
  Future _setMapStyle() async {
    final controller = await _mapController.future;
    final theme = WidgetsBinding.instance.window.platformBrightness;
    if (theme == Brightness.dark) {
      controller.setMapStyle(_darkMapStyle);
    } else {
      controller.setMapStyle(_lightMapStyle);
    }
  }

  //*Initialising map styles
  @override
  void initState() {
    super.initState();
    fetchStarts();
    WidgetsBinding.instance.addObserver(this);
    _loadMapStyles();
  }

  @override
  void didChangePlatformBrightness() {
    setState(() {
      _setMapStyle();
    });
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    super.dispose();
  }

  //* Adding markers to start locations
  void fetchStarts() async {
    var document = await FirebaseFirestore.instance.collection("starts").get();
    final allStarts = document.docs.map((doc) => doc.data()).toList();
    for (int i = 0; i < allStarts.length; i++) {
      final MarkerId markerId = MarkerId(allStarts[i]['start_ID']);
      final Marker marker = Marker(
        markerId: markerId,
        position: LatLng(allStarts[i]['lat'], allStarts[i]['lng']),
        icon: await MarkerIcon.svgAsset(
            assetName: "lib/Assets/pin.svg", context: context, size: 60),
        infoWindow: InfoWindow(title: allStarts[i]['start_location']),
      );
      if (mounted) {
        setState(() {
          markers[markerId] = marker;
        });
      }
    }
  }

  //* QR Scanning initialisation and execution
  String _scanBarcode = 'Unknown';

  Future<void> scanQR() async {
    String barcodeScanRes;
    // Platform messages may fail, so we use a try/catch PlatformException.
    try {
      barcodeScanRes = await FlutterBarcodeScanner.scanBarcode(
          '#ff6666', 'Cancel', true, ScanMode.QR);
      print(barcodeScanRes);
    } on PlatformException {
      barcodeScanRes = 'Failed to get platform version.';
    }
    if (!mounted) return;
    setState(() {
      _scanBarcode = barcodeScanRes;
    });
  }

  @override
  Widget build(BuildContext context) {
    const double panelMinSize = 60.0;
    final double panelMaxSize = MediaQuery.of(context).size.height * 0.70;
    final slideController = WeSlideController();
    final sp = context.watch<SignInProvider>();

    return Scaffold(
      key: _key,
      extendBodyBehindAppBar: true,
      extendBody: true,
      drawer: Drawer(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(height: 46),
            Text(" Welcome back,\n ${sp.name}",style: TextStyle(fontSize: 24),),
                        Divider(),


            ListTile(
              onTap: () {
              },
              title: const Text("Payment"),
              trailing: const Icon(UniconsLine.card_atm),
            ),ListTile(
              onTap: () {
              },
              title: const Text("Promotions"),
              trailing: const Icon(UniconsLine.tag),
            ),ListTile(
              onTap: () {
              },
              title: const Text("Support"),
              trailing: const Icon(UniconsLine.question_circle),
            ),
            ListTile(
              onTap: () {
              },
              title: const Text("About"),
              trailing: const Icon(UniconsLine.info_circle),
            ),
            Divider(),
            const Spacer(),
            ListTile(
              onTap: () {
                sp.userSignOut();
                nextScreenReplace(context, const LandingScreen());
              },
              title: const Text("Sign Out"),
              trailing: const Icon(Icons.logout_outlined),
              tileColor: Theme.of(context).colorScheme.errorContainer,
            ),
          ],
        ),
      ),
      floatingActionButton: Padding(
        padding: const EdgeInsets.only(bottom: 60),
        child: FloatingActionButton(
          onPressed: (() => scanQR().then(
                (value) {
                  var dataList = _scanBarcode.split('ZAR');
                  String driverID = dataList[0];
                  String Cost = dataList[1];
                  Rapyd rapyd = Rapyd(double.parse(Cost));
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => CheckOutScreen(
                          rapyd: rapyd,
                          cost: double.parse(Cost),
                          driverID: driverID),
                    ),
                  );
                },
              )),
          elevation: 10,
          child: Icon(UniconsLine.qrcode_scan),
          tooltip: "This initiates the QR Scanning process",
        ),
      ),
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        leading: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Container(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [Color(0xff60748A), Color(0xff1A2C42)],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              shape: BoxShape.circle,
              color: Theme.of(context).primaryColor,
            ),
            child: IconButton(
              icon: Icon(
                UniconsLine.bars,
                color: Theme.of(context).colorScheme.onPrimary,
              ),
              onPressed: () {
                _key.currentState!.openDrawer();
              },
            ),
          ),
        ),
        actions: [
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Container(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [Color(0xff60748A), Color(0xff1A2C42)],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                shape: BoxShape.circle,
                color: Theme.of(context).primaryColor,
              ),
              child: IconButton(
                icon: Icon(
                  UniconsLine.bell,
                  color: Theme.of(context).colorScheme.onPrimary,
                ),
                onPressed: () => Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (_) => const NotificationScreen(),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
      body: WeSlide(
        panelBorderRadiusEnd: 15,
        hideFooter: true,
        footerHeight: 0,
        isDismissible: true,
        panelMinSize: panelMinSize,
        panelMaxSize: panelMaxSize,
        controller: slideController,
        //* The map view is here,represented by a stack with other widgets on top
        footer: Container(
          height: 0,
          color: Colors.red,
        ),
        body: Stack(
          children: [
            SizedBox(
              height: MediaQuery.of(context).size.height,
              width: MediaQuery.of(context).size.width,
              child: GoogleMap(
                zoomControlsEnabled: true,
                mapType: MapType.normal,
                initialCameraPosition: const CameraPosition(
                    target: LatLng(-26.236141931462093, 27.90543208051695),
                    zoom: 12),
                onMapCreated: (GoogleMapController controller) {
                  _mapController.complete(controller);
                  _setMapStyle();
                },
                markers: Set<Marker>.of(markers.values),
              ),
            ),
          ],
        ),
        //* This is the full sheet with start and end select
        panel: PlanTripPanel(slideController: slideController),
        //* This represents the navigation bar type widget at the bottom pf the page
        panelHeader: GestureDetector(
          onTap: () {
            slideController.show();
          },
          child: Container(
            alignment: Alignment.center,
            height: 60,
            color: Theme.of(context).canvasColor,
            child: Padding(
                padding: const EdgeInsets.all(8.0),
                child: TextButton.icon(
                  onPressed: () => slideController.show(),
                  icon: const Icon(Icons.search),
                  label: const Text("Search for destination"),
                )),
          ),
        ),
      ),
    );
  }
}
