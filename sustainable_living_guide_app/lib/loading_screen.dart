import 'package:flutter/material.dart';
import 'package:flutter/services.dart' show rootBundle;
import 'dart:math';
import 'welcome_screen.dart';

class LoadingScreen extends StatefulWidget {
  @override
  _LoadingScreenState createState() => _LoadingScreenState();
}

class _LoadingScreenState extends State<LoadingScreen> {
  String _quote = '';

  @override
  void initState() {
    super.initState();
    loadQuote().then((value) {
      setState(() {
        _quote = value;
      });
    });
    Future.delayed(Duration(seconds: 10), () {
      Navigator.pushReplacement(
          context, MaterialPageRoute(builder: (context) => WelcomeScreen()));
    });
  }

  Future<String> loadQuote() async {
    String text =
        await rootBundle.loadString('assets/quotes.txt'); //quotes location
    List<String> quotes = text.split('\n');
    return quotes[Random().nextInt(quotes.length)];
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
                child: Image.asset('assets/images/logo.jpeg'),
              ),
            ),
          ),
          Text(_quote), // Display the quote here

          CircularProgressIndicator(),

          SizedBox(height: 20.0),
        ],
      ),
    );
  }
}
