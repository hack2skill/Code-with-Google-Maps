import 'dart:convert';
import 'dart:io';

import 'package:sih_app/modal/login_response.dart';
import 'package:sih_app/modal/rest_response.dart';
import 'package:http/http.dart' as http;

var client = http.Client();

class API {
  var client = http.Client();
  static const baseUrl = "https://testsihlogin-chaitanyakanhar2004.b4a.run/";
  static const userSignUP = "${baseUrl}register/";
  static const userSignIn = "${baseUrl}login/";
  static const booking = "${baseUrl}booking";
  static const AllParkings = "${baseUrl}allparkings"; // live
  //static const apiKey = "Replace your API key";
  Future<RestResponse> signup({email, pass, username}) async {
    var data =
        jsonEncode({"username": username, "email": email, "password": pass});
    final response = await client.post(
      Uri.parse(userSignUP),
      body: data,
    );

    print(response.body);
    return RestResponse.fromJson(response.body);
  }

  Future<LoginResponse> signin({token}) async {
    final response = await http.post(
      Uri.parse(userSignIn),
      body: jsonEncode({"token": token}),
    );
    //final responseJson = jsonDecode(response.body);
    print(response.body);
    return LoginResponse.fromJson(response.body);
  }

  Future bookingDatasend(
      {myid, starttime, endtime, vehicle_no, vehicle_type}) async {
    final response = await http.post(
      Uri.parse(booking),
      body: jsonEncode({
        "vehicle_number": vehicle_no,
        "vehicle_type": vehicle_type,
        "start_time": starttime,
        "end_time": endtime,
        "parking_id": myid
      }),
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
    );

    print(response.statusCode);
    return response;
  }

  Future getAllParkings() async {
    final response = await http.get(Uri.parse(AllParkings));

    //final responseJson = jsonDecode(response.body);
    print(response.body);
    return response.body;
  }
}
