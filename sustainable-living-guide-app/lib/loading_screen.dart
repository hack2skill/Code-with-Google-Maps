// Importing necessary packages
import 'package:flutter/material.dart';
import 'package:flutter/services.dart' show rootBundle;
import 'dart:math';
import 'welcome_screen.dart';

// Defining a stateful widget for the loading screen
class LoadingScreen extends StatefulWidget {
  @override
  _LoadingScreenState createState() => _LoadingScreenState();
}

// Defining the state for the loading screen
class _LoadingScreenState extends State<LoadingScreen> {
  String _quote = ''; // Initializing a string to store the quote

  @override
  void initState() {
    super.initState();
    loadQuote().then((value) {
      // Loading a quote when the widget is initialized
      setState(() {
        _quote = value; // Then updating the state with the loaded quote here
      });
    });
    Future.delayed(Duration(seconds: 10), () {
      // Navigating to the welcome screen after 10 seconds
      Navigator.pushReplacement(
          context, MaterialPageRoute(builder: (context) => WelcomeScreen()));
    });
  }

  // Function to load a random quote from a text file
  Future<String> loadQuote() async {
    String text = await rootBundle.loadString(
        'assets/quotes.txt'); // Loading the quotes from a text file here
    List<String> quotes =
        text.split('\n'); // Splitting the text into individual quotes here
    return quotes[
        Random().nextInt(quotes.length)]; // Returning a random quote here
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          Expanded(
            child: Center(
              child: Container(
                height: 200.0,
                child: Image.asset(
                    'assets/images/logo.jpeg'), // Displaying the logo here
              ),
            ),
          ),
          Text(_quote), // Displaying the quote here

          CircularProgressIndicator(), // Displaying a progress indicator here

          SizedBox(height: 20.0),
        ],
      ),
    );
  }
}
