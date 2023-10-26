import 'package:flutter/material.dart';
import 'package:taxiflex/Screens/screens.dart';
import 'package:taxiflex/Utils/utils.dart';

class LandingScreen extends StatelessWidget {
  const LandingScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          Container(
            width: double.maxFinite,
            height: double.maxFinite,
            decoration: const BoxDecoration(
              image: DecorationImage(
                alignment: Alignment.bottomCenter,
                fit: BoxFit.cover,
                image: AssetImage(
                  "lib/Assets/img_3.jpg",
                ),
              ),
            ),
          ),
          Container(
            height: MediaQuery.of(context).size.height * 0.60,
            width: double.maxFinite,
            decoration: BoxDecoration(
              gradient: LinearGradient(
                stops: const [0.5, 1],
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [Theme.of(context).canvasColor, Colors.transparent],
              ),
            ),
            child: Padding(
              padding: const EdgeInsets.only(top: 100, left: 20, right: 20),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(
                    width: MediaQuery.of(context).size.width * 0.70,
                    child: const Text(
                      "Welcome to TaxiFlex 👋🏽",
                      softWrap: true,
                      maxLines: 2,
                      style:
                          TextStyle(fontSize: 32, fontWeight: FontWeight.w700),
                    ),
                  ),
                ],
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(20.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                ElevatedButton.icon(
                  onPressed: () => nextScreen(context, const RiderSignIn()),
                  label: const Text(
                    "Sign in as Rider",
                    style: TextStyle(fontWeight: FontWeight.w600),
                  ),
                  icon: const Icon(Icons.person),
                ),
                //******
                ElevatedButton.icon(
                  onPressed: () => nextScreen(context, const DriverSignIn()),
                  label: const Text(
                    "Sign in as Driver",
                    style: TextStyle(fontWeight: FontWeight.w600),
                  ),
                  icon: const Icon(
                    Icons.drive_eta_rounded,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
