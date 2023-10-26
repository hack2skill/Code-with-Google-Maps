import 'package:flutter/material.dart';

class ParkingBookingPage extends StatefulWidget {
  @override
  _ParkingBookingPageState createState() => _ParkingBookingPageState();
}

class _ParkingBookingPageState extends State<ParkingBookingPage> {
  DateTime selectedDate = DateTime.now();
  TimeOfDay selectedTime = TimeOfDay.now();
  String vehicleType = 'Car';

  Future<void> _selectDate(BuildContext context) async {
    final DateTime? pickedDate = await showDatePicker(
      context: context,
      initialDate: selectedDate,
      firstDate: DateTime.now(),
      lastDate: DateTime(DateTime.now().year + 1),
    );

    if (pickedDate != null && pickedDate != selectedDate) {
      setState(() {
        selectedDate = pickedDate;
      });
    }
  }

  Future<void> _selectTime(BuildContext context) async {
    final TimeOfDay? pickedTime = await showTimePicker(
      context: context,
      initialTime: selectedTime,
    );

    if (pickedTime != null && pickedTime != selectedTime) {
      setState(() {
        selectedTime = pickedTime;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Parking Booking'),
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Text(
                'Select Date and Time:',
                style: TextStyle(fontSize: 18),
              ),
              SizedBox(height: 10),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: <Widget>[
                  ElevatedButton(
                    onPressed: () => _selectDate(context),
                    child: Text('Select Date'),
                  ),
                  ElevatedButton(
                    onPressed: () => _selectTime(context),
                    child: Text('Select Time'),
                  ),
                ],
              ),
              SizedBox(height: 20),
              Text(
                'Vehicle Type:',
                style: TextStyle(fontSize: 18),
              ),
              DropdownButton<String>(
                value: vehicleType,
                onChanged: (String? newValue) {
                  setState(() {
                    vehicleType = newValue!;
                  });
                },
                items: <String>['Car', 'Motorcycle', 'Bicycle']
                    .map<DropdownMenuItem<String>>((String value) {
                  return DropdownMenuItem<String>(
                    value: value,
                    child: Text(value),
                  );
                }).toList(),
              ),
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: () {
                  // Implement booking logic here
                  // You can use selectedDate, selectedTime, and vehicleType
                  // to book the parking slot.
                  // Add your booking functionality here.
                },
                child: Text('Book Parking Slot'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
