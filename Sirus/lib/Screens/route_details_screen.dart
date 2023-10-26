import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_polyline_points/flutter_polyline_points.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:tab_container/tab_container.dart';
import 'package:taxiflex/Models/short_route_model.dart';

import '../Helper/secrets.dart';
import '../Utils/utils.dart';
import '../widgets/widgets.dart';

class RouteDetailsScreen extends StatefulWidget {
  final ShortRouteModel routeModel;
  const RouteDetailsScreen(ShortRouteModel shortRouteModel, {
    Key? key, required this.routeModel,
    
  }) : super(key: key);

  @override
  _RouteDetailsScreenState createState() => _RouteDetailsScreenState();
}

class _RouteDetailsScreenState extends State<RouteDetailsScreen>
    with WidgetsBindingObserver {
  final Completer<GoogleMapController> _routeMapController = Completer();
  String? _darkMapStyle;
  String? _lightMapStyle;

  //*Tab Container
  late final TabContainerController _controller;

  //* Polyline route settings
  Map<PolylineId, Polyline> polylines = {};
  List<LatLng> polylineCoordinates = [];
  PolylinePoints polylinePoints = PolylinePoints();

  _addPolyLine() {
    PolylineId id = const PolylineId("poly");
    Polyline polyline = Polyline(
      polylineId: id,
      color: const Color(0xffd48608),
      width: 5,
      points: polylineCoordinates,
    );
    polylines[id] = polyline;
    setState(() {});
  }

  _getPolyline() async {
    PolylineResult result = await polylinePoints.getRouteBetweenCoordinates(
        googleMapsKey,
        PointLatLng(widget.routeModel.startLat, widget.routeModel.startLng),
        PointLatLng(widget.routeModel.endLat, widget.routeModel.endLng),
        travelMode: TravelMode.driving);
    if (result.points.isNotEmpty) {
      result.points.forEach((PointLatLng point) {
        polylineCoordinates.add(LatLng(point.latitude, point.longitude));
      });
    }
    _addPolyLine();
  }

  //* Changing map styles according to theme
  Future _loadMapStyles() async {
    _darkMapStyle = await rootBundle
        .loadString('lib/Assets/map_styles/dark_map_style.json');
    _lightMapStyle = await rootBundle
        .loadString('lib/Assets/map_styles/light_map_style.json');
  }

  //* Setting the map style according to the theme of the users phone
  Future _setMapStyle() async {
    final controller = await _routeMapController.future;
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
    WidgetsBinding.instance.addObserver(this);
    _controller = TabContainerController(length: 2);
    _loadMapStyles();
    _initialPosition = CameraPosition(
      target: LatLng(
        widget.routeModel.startLat,
        widget.routeModel.startLng,
      ),
      zoom: 30,
    );
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
    _controller.dispose();
    super.dispose();
  }

  late CameraPosition _initialPosition;

  @override
  Widget build(BuildContext context) {
    Set<Marker> _markers = {
      Marker(
        markerId: const MarkerId('Start'),
        position: LatLng(
          widget.routeModel.startLat,
          widget.routeModel.startLng,
        ),
      ),
      Marker(
        markerId: const MarkerId('End'),
        position: LatLng(
          widget.routeModel.endLat,
          widget.routeModel.endLng,
        ),
      ),
    };

    // CameraPosition(target: target)
    return Scaffold(
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        leading: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Container(
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              gradient: LinearGradient(
                colors: [Color(0xff60748A), Color(0xff1A2C42)],
                begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              ),
              color: Theme.of(context).primaryColor,
            ),
            child: IconButton(
              icon: Icon(
                Icons.arrow_back,
                color: Theme.of(context).colorScheme.onPrimary,
              ),
              onPressed: () {
                Navigator.pop(context);
              },
            ),
          ),
        ),
      ),
      body: Column(
        children: [
          SizedBox(
            height: MediaQuery.of(context).size.height * 0.5,
            child: GoogleMap(
              compassEnabled: false,
              myLocationButtonEnabled: false,
              initialCameraPosition: _initialPosition,
              markers: Set.from(_markers),
              polylines: Set<Polyline>.of(polylines.values),
              onMapCreated: (controller) {
                _setMapStyle();
                _routeMapController.complete(controller);
                Future.delayed(const Duration(milliseconds: 200), () {
                  controller.animateCamera(
                    CameraUpdate.newLatLngBounds(
                      MapUtils.boundsFromLatLngList(
                        _markers.map((loc) => loc.position).toList(),
                      ),
                      30,
                    ),
                  );
                  _getPolyline();
                });
              },
            ),
          ),

          //TODO probably wrap this in a consumer
          SizedBox(
            height: MediaQuery.of(context).size.height * 0.5,
            child: TabContainer(
              colors: [
                Theme.of(context).colorScheme.primaryContainer,
                Theme.of(context).colorScheme.secondaryContainer
              ],
              children:  [BuySeatTab(routeModel:widget.routeModel), RouteDetailsTab(routeModel:widget.routeModel)],
              tabs: const ["Buy seats", "Route Details"],
              radius: 18,
            ),
          )
        ],
      ),
    );
  }
}
