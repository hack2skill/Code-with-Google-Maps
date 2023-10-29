// Importing necessary packages
import 'package:flutter/material.dart';
import 'package:path_provider/path_provider.dart';
import 'dart:io';

// Defining a stateful widget for the profile screen
class ProfileScreen extends StatefulWidget {
  @override
  _ProfileScreenState createState() => _ProfileScreenState();
}

// Defining the state for the profile screen
class _ProfileScreenState extends State<ProfileScreen> {
  String userName = ''; // Initializing a string to store the username

  @override
  void initState() {
    super.initState();
    _getUserName(); // Fetching the username when the widget is initialized
  }

  // Function to get the username from a local file
  Future<void> _getUserName() async {
    final directory = await getApplicationDocumentsDirectory();
    final file = File('${directory.path}/user_name.txt');
    bool fileExists = await file.exists();

    if (fileExists) {
      String name = await file.readAsString(); // Reading the file here
      setState(() {
        userName = name; // Then updating the state with the read username here
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Profile')),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          Spacer(flex: 2),
          Center(
              child: Text('Welcome, $userName!',
                  style: TextStyle(
                      fontSize: 24))), // Displaying the user's name here
          Spacer(flex: 3),
        ],
      ),
    );
  }
}
