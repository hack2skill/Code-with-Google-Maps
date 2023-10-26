class ShortRouteModel {
  double startLat;
  double startLng;
  double endLat;
  double endLng;
  String startID;
  double number;
  String startLocation;
  String endLocation;
  String description;
  String openTime;
  String travelTime;
  double price;

  ShortRouteModel.fromJson(Map<String, dynamic> json)
      : startLat = json['start_lat'],
        startLng = json['start_lng'],
        endLat = json['end_lat'],
        endLng = json['end_lng'],
        startID = json['start_ID'],
        number = double.parse(json['number'].toString()),
        startLocation = json['start_location'],
        endLocation = json['end_location'],
        description = json['description'],
        openTime = json['open_time'],
        travelTime = json['travel_time'],
        price = double.parse(json['price'].toString());
}
