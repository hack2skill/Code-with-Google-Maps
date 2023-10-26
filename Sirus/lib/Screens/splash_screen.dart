import 'dart:async';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:taxiflex/Screens/screens.dart';

import '../Services/services.dart';
import '../Utils/utils.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({Key? key}) : super(key: key);

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  // init state
  @override
  void initState() {
    final sp = context.read<SignInProvider>();
    super.initState();
    // create a timer of 2 seconds
    Timer(const Duration(seconds: 2), () {
      if (sp.isSignedInAsRider == false && sp.isSignedInAsDriver == false) {
         nextScreenReplace(context, const LandingScreen());
      } else if (sp.isSignedInAsRider == false &&
          sp.isSignedInAsDriver == true) {
         nextScreenReplace(context, const DriverHomeScreen());
      } else if (sp.isSignedInAsRider == true &&
          sp.isSignedInAsDriver == false) {
         nextScreenReplace(context, const HomeNav());
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFB1C0DD),
      body: SafeArea(
        child: Center(
          child: Container(
            height: 100,
            width: 100,
            alignment: Alignment.center,
            decoration: const BoxDecoration(
              color: Color(0xFFB1C0DD),
              image: DecorationImage(
                image: AssetImage("lib/Assets/lolo.jpg"),
                alignment: Alignment.center,
              ),
            ),
          ),
        ),
      ),
    );
  }
}
