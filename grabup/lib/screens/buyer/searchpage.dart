import "package:flutter/material.dart";
import "package:grabup/helpers/shared_prefs.dart";
import "package:grabup/utils/AppConstants.dart";
import "package:grabup/widgets/PredictionTile.dart";
import "package:latlong2/latlong.dart";
import "package:mapbox_search/mapbox_search.dart";

class SearchPage extends StatefulWidget {
  const SearchPage({Key? key}) : super(key: key);

  @override
  State<SearchPage> createState() => _SearchPageState();
}

class _SearchPageState extends State<SearchPage> {
  var focusNode = FocusNode();
  LatLng latLng = getLatLngFromSharedPrefs();

  List<MapBoxPlace> searchPlaces = [];

  Future<void> main(String place) async {
    String apiKey =
        AppConstants.mapBoxAccessToken; //Set up a test api key before running

    await placesSearch(apiKey, place).catchError(print);
  }

  Future placesSearch(String apiKey, String place) async {
    var placesService = PlacesSearch(
      apiKey: apiKey,
      country: "IN",
      limit: 9,
    );

    var places = await placesService.getPlaces(
      place,
      proximity: Location(
        lat: latLng.latitude,
        lng: latLng.longitude,
      ),
    );
    if (places!.length >= 1) {
      setState(() {
        searchPlaces = places!;
      });
      print(places);
    }
  }

  bool focus = false;

  void setFocus() {
    if (!focus) {
      FocusScope.of(context).requestFocus(focusNode);
      focus = true;
    }
  }

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    setFocus();
    return Scaffold(
      body: Column(
        children: [
          Container(
            height: 170,
            decoration: BoxDecoration(
              color: Colors.white,
              boxShadow: [
                BoxShadow(
                  color: Colors.black12,
                  blurRadius: 5.0,
                  spreadRadius: 0.5,
                  offset: Offset(0.7, 0.7),
                )
              ],
            ),
            child: Padding(
              padding:
                  EdgeInsets.only(left: 24, top: 48, right: 24, bottom: 20),
              child: Column(
                children: [
                  SizedBox(
                    height: 5,
                  ),
                  Stack(
                    children: [
                      GestureDetector(
                          onTap: () {
                            Navigator.pop(context);
                          },
                          child: Icon(Icons.arrow_back)),
                      Center(
                        child: Text(
                          "Search Scrap",
                          style:
                              TextStyle(fontSize: 20, fontFamily: "Brand-Bold"),
                        ),
                      ),
                    ],
                  ),
                  SizedBox(
                    height: 18,
                  ),
                  Row(
                    children: [
                      Icon(
                        Icons.share_location,
                        color: Colors.green.shade400,
                      ),
                      SizedBox(
                        width: 12,
                      ),
                      Expanded(
                        child: Container(
                          decoration: BoxDecoration(
                              color: Colors.grey.shade300,
                              borderRadius: BorderRadius.circular(4)),
                          child: Padding(
                            padding: EdgeInsets.all(2.0),
                            child: TextField(
                              onChanged: (value) {
                                main(value);
                              },
                              focusNode: focusNode,
                              decoration: InputDecoration(
                                hintText: "Find scrap locations",
                                fillColor: Colors.grey.shade300,
                                filled: true,
                                border: InputBorder.none,
                                isDense: true,
                                contentPadding: EdgeInsets.only(
                                    left: 10, top: 8, bottom: 8),
                              ),
                            ),
                          ),
                        ),
                      ),
                    ],
                  )
                ],
              ),
            ),
          ),
          (searchPlaces.length > 0)
              ? Expanded(
                  child: Padding(
                    padding:
                        const EdgeInsets.symmetric(vertical: 8, horizontal: 16),
                    child: ListView.separated(
                      padding: EdgeInsets.all(0),
                      itemBuilder: (context, index) {
                        return PredictionTile(
                          searchPlace: searchPlaces[index],
                        );
                      },
                      separatorBuilder: (context, index) {
                        return Divider();
                      },
                      itemCount: searchPlaces.length,
                      shrinkWrap: true,
                      physics: ClampingScrollPhysics(),
                    ),
                  ),
                )
              : Container()
        ],
      ),
    );
  }
}
