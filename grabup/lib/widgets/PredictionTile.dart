import 'package:flutter/material.dart';
import 'package:grabup/dataprovider/appdata.dart';
import 'package:grabup/dataprovider/destination.dart';
import 'package:mapbox_search/mapbox_search.dart';
import 'package:provider/provider.dart';

class PredictionTile extends StatelessWidget {
  final MapBoxPlace searchPlace;
  PredictionTile({required this.searchPlace});

  @override
  Widget build(BuildContext context) {
    return TextButton(
      onPressed: () {
        double? long = searchPlace.geometry!.coordinates?.elementAt(0);
        double? lat = searchPlace.geometry!.coordinates?.elementAt(1);
        print("$lat, $long");
        Destination dest = Destination(latitude: lat, longitude: long);
        Provider.of<AppData>(context, listen: false)
            .updateDestinationAddress(dest);
        Navigator.pop(context, "getDirection");
      },
      child: Container(
        child: Container(
          child: Column(
            children: [
              SizedBox(
                height: 8,
              ),
              Row(
                children: [
                  Icon(Icons.location_on_outlined),
                  SizedBox(
                    width: 12,
                  ),
                  Flexible(
                    child: Container(
                      padding: new EdgeInsets.only(right: 13.0),
                      child: Text(
                        searchPlace.placeName as String,
                        style: TextStyle(fontSize: 16),
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
