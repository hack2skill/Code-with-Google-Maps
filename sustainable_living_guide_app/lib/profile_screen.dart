import 'package:flutter/material.dart';
import 'package:path_provider/path_provider.dart';
import 'dart:io';

class ProfileScreen extends StatefulWidget {
  @override
  _ProfileScreenState createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  String userName = '';

  @override
  void initState() {
    super.initState();
    _getUserName();
  }

  Future<void> _getUserName() async {
    final directory = await getApplicationDocumentsDirectory();
    final file = File('${directory.path}/user_name.txt');
    bool fileExists = await file.exists();

    if (fileExists) {
      String name = await file.readAsString(); // Read the file here
      setState(() {
        userName = name; // Then use the result here
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
                  style: TextStyle(fontSize: 24))), // Display the user's name
          Spacer(flex: 3),
        ],
      ),
    );
  }
}
