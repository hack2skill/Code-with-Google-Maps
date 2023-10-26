import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:search_choices/search_choices.dart';
import 'package:taxiflex/Models/short_route_model.dart';
import 'package:taxiflex/Screens/route_details_screen.dart';
import 'package:we_slide/we_slide.dart';

import '../Services/services.dart';

class PlanTripPanel extends StatefulWidget {
  PlanTripPanel({
    Key? key,
    required this.slideController,
  }) : super(key: key);

  final WeSlideController slideController;

  @override
  State<PlanTripPanel> createState() => _PlanTripPanelState();
}

class _PlanTripPanelState extends State<PlanTripPanel> {
  var start;
  var shortRoute;
  late ShortRouteModel route;

  var setDefaultStart = true, setDefaultRoute = true;

  @override
  Widget build(BuildContext context) {
    //*Providers
    ShortRouteService shortRouteService =
        Provider.of<ShortRouteService>(context);
    StartLocationService startLocationService =
        Provider.of<StartLocationService>(context);
    /* ShortRouteSelectService shortRouteSelectService =
        Provider.of<ShortRouteSelectService>(context);*/
    return Container(
      width: double.maxFinite,
      padding: const EdgeInsets.only(top: 20, left: 20, right: 20),
      color: Theme.of(context).cardColor,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              IconButton(
                  onPressed: () {
                    widget.slideController.hide();
                  },
                  icon: const Icon(Icons.close)),
              const SizedBox(width: 60),
              const Text(
                "Your Trip",
                style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800),
              )
            ],
          ),
          const Divider(),
          const Padding(
            padding: EdgeInsets.symmetric(vertical: 8),
            child: Text(
              "Choose a start location",
            ),
          ),
          //* Choose a start location selector
          StreamBuilder(
            stream: startLocationService.readAllStarts(),
            builder: (context, snapshot) {
              if (!snapshot.hasData) return Container();
              if (setDefaultStart) {
                start = snapshot.data![0].startLocation;
              }
              return SearchChoices.single(
                isExpanded: true,
                value: start,
                items: snapshot.data!.map((value) {
                  return DropdownMenuItem(
                    value: value.startLocation,
                    child: Text(value.startLocation),
                  );
                }).toList(),
                onChanged: (value) {
                  setState(() {
                    start = value;
                    setDefaultStart = false;
                    setDefaultRoute = false;
                  });
                },
              );
            },
          ),

          const SizedBox(
            height: 20,
          ),
          const Padding(
            padding: EdgeInsets.symmetric(vertical: 8),
            child: Text(
              "Choose a destination",
            ),
          ),
          //* Set a destination
          start != null
              ? StreamBuilder(
                  stream: shortRouteService.readShortRoutesByID(startID: start),
                  builder: (context, snapshot) {
                    if (!snapshot.hasData) {
                      return const Text("No data available");
                    }
                    if (setDefaultRoute) {
                      shortRoute = snapshot.data![0].endLocation;
                    }
                    return SearchChoices.single(
                      isExpanded: true,
                      value: shortRoute,
                      hint: const Text("Search for destination"),
                      items: snapshot.data!.map((value) {
                        return DropdownMenuItem(
                          value: value.number,
                          child: Text(value.endLocation),
                        );
                      }).toList(),
                      onChanged: (chosenValue) {
                        setState(() {
                          shortRoute = chosenValue;
                          setDefaultRoute = false;
                        });
                      },
                    );
                  },
                )
              : const Text("There is no destination available"),
          const SizedBox(height: 20),
          Align(
            alignment: Alignment.center,
            child: ElevatedButton.icon(
              onPressed: shortRoute != null
                  ? () async {
                      ShortRouteModel? currentRoute;
                      var qs = await FirebaseFirestore.instance
                          .collection("shortRoutes")
                          .where("number", isEqualTo: shortRoute)
                          .get();
                      for (var snapshot in qs.docs) {
                        route = ShortRouteModel.fromJson(
                          snapshot.data(),
                        );
                      }
                      setState(() {
                        currentRoute = route;
                      });
                      if (!mounted) return;
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => RouteDetailsScreen(
                           route, routeModel: route,
                          ),
                        ),
                      );
                    }
                  : null,
              icon: const Icon(Icons.route_outlined),
              label: const Text("See Taxi & Route details"),
            ),
          )
        ],
      ),
    );
  }
}
