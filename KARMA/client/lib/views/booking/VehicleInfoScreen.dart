import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:http/http.dart';
import 'package:intl/intl.dart';
import 'package:sih_app/api/api.dart';
import 'package:sih_app/helpers/navigator_helper.dart';
import 'package:sih_app/utils/components/flut_toast.dart';
import 'package:sih_app/views/map/MapLocationPage.dart';

class BookingDetailsPage extends StatefulWidget {
  final Marker marker;
  final int startTime;
  final int endTime;

  BookingDetailsPage({
    required this.marker,
    required this.startTime,
    required this.endTime,
  });

  @override
  _BookingDetailsPageState createState() => _BookingDetailsPageState();
}

class _BookingDetailsPageState extends State<BookingDetailsPage> {
  String vehicleNumber = '';
  int vehicleType = 0; // Default to small (0)

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Booking Details'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Booking Details for ${widget.marker.markerId.value}',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 20),
            Text(
              'Start Time:',
              style: TextStyle(fontSize: 16),
            ),
            Text(
              formatEpochTime(widget.startTime),
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 20),
            Text(
              'End Time:',
              style: TextStyle(fontSize: 16),
            ),
            Text(
              formatEpochTime(widget.endTime),
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 20),
            Text(
              'Vehicle Number:',
              style: TextStyle(fontSize: 16),
            ),
            TextField(
              onChanged: (value) {
                setState(() {
                  vehicleNumber = value;
                });
              },
            ),
            SizedBox(height: 20),
            Text(
              'Vehicle Type:',
              style: TextStyle(fontSize: 16),
            ),
            DropdownButton<int>(
              value: vehicleType,
              onChanged: (value) {
                setState(() {
                  vehicleType = value!;
                });
              },
              items: [
                DropdownMenuItem(
                  value: 0,
                  child: Text('Small'),
                ),
                DropdownMenuItem(
                  value: 1,
                  child: Text('Medium'),
                ),
                DropdownMenuItem(
                  value: 2,
                  child: Text('Large'),
                ),
              ],
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () async {
                print(widget.endTime);
                final Response response = await API().bookingDatasend(
                    endtime: widget.endTime,
                    starttime: widget.startTime,
                    vehicle_no: vehicleNumber,
                    vehicle_type: vehicleType,
                    myid: widget.marker.markerId.value);
                print(response.statusCode);
                if (response.statusCode == 200) {
                  showToast("Successfully booked");
                  print(widget.marker.position.latitude);
                  print(widget.marker.position.longitude);
                  NavigationHelper.navigateToSecondRoute(
                      context,
                      MapPage(
                          destinationLatitude: widget.marker.position.latitude,
                          destinationLongitude:
                              widget.marker.position.longitude));
                } else {
                  showToast("Booking failed");
                }

                // Handle booking details here
                print('Vehicle Number: $vehicleNumber');
                print('Vehicle Type: $vehicleType');
                // You can save or send this data as needed.
              },
              child: Text('Submit'),
            ),
          ],
        ),
      ),
    );
  }

  String formatEpochTime(int epochMilliseconds) {
    final formattedDate = DateFormat('yyyy-MM-dd HH:mm:ss').format(
        DateTime.fromMillisecondsSinceEpoch(epochMilliseconds, isUtc: true));
    return formattedDate;
  }
}
