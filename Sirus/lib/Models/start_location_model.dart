class StartLocationModel {
  double lat;
  double lng;
  String startID;
  String startLocation;

  StartLocationModel.fromJson(Map<String, dynamic> json)
      : lat = json["lat"],
        lng = json["lng"],
        startID = json["start_ID"],
        startLocation = json["start_location"];
}
