import 'package:flutter/material.dart';
import 'package:grouped_list/grouped_list.dart';
import 'package:provider/provider.dart';
import 'package:unicons/unicons.dart';
import 'package:http/http.dart' as http;

import '../Helper/secrets.dart';
import '../Models/models.dart';
import '../Services/services.dart';

class AllRoutesScreen extends StatelessWidget {
   AllRoutesScreen({Key? key}) : super(key: key);
  String apiKey = googleMapsKey;
  String radius = "30";
  double latitude = -26.236141931462093;
  double longitude = 27.90543208051695;

  NearbyPlacesResponse nearbyPlacesResponse = NearbyPlacesResponse();

  @override
  Widget build(BuildContext context) {
    ShortRouteService shortRouteService =
        Provider.of<ShortRouteService>(context);
    return Scaffold(
      backgroundColor: Theme.of(context).backgroundColor,
      appBar: AppBar(
        centerTitle: true,
        title: const Text("Available Routes"),
      ),
      body:
       StreamBuilder(
        stream: shortRouteService.readAllShortRoutes(),
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            return GroupedListView(
              elements: snapshot.data!,
              groupSeparatorBuilder: (value) => Padding(
                padding: const EdgeInsets.all(8.0),
                child: Container(
                  decoration: BoxDecoration(
                      color: Theme.of(context).colorScheme.secondary,
                      borderRadius: BorderRadius.circular(4)),
                  child: Text(
                    value,
                    textAlign: TextAlign.center,
                    style: TextStyle(
                        color: Theme.of(context).colorScheme.onSecondary,
                        fontSize: 16,
                        fontWeight: FontWeight.w600),
                  ),
                ),
              ),
              itemBuilder: (context, element) {
                return Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(12),
                    child: ListTile(
                      contentPadding: const EdgeInsets.all(12),
                      tileColor: Theme.of(context).cardColor,
                      trailing: const Icon(
                    UniconsLine.bookmark,
                      ),
                      leading: const Icon(
                        Icons.circle,
                        color: Colors.green,
                      ),
                      title: Text(element.endLocation),
                    ),
                  ),
                );
              },
              groupBy: (element) => element.startLocation,
            );
          }
          if (!snapshot.hasData) return Container();
          return Container();
        },
      ),
    );
  }
}
