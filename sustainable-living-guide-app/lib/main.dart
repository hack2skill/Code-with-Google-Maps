// Importing necessary packages
import 'package:flutter/material.dart';
import 'loading_screen.dart';

void main() {
  runApp(MyApp()); // Running the app here
}

// Defining a stateless widget for the app
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sustainable Living Guide', // Setting the title of the app here
      theme: ThemeData(
        primarySwatch:
            Colors.green, // Setting the primary color of the app theme here
      ),
      home:
          LoadingScreen(), // Setting the loading screen as the home screen of the app here
    );
  }
}
