import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:sih_app/utils/components/bottomNav.dart';
import 'package:sih_app/views/map/maps.dart';
import 'package:sih_app/views/map/mapscreen.dart';

import 'package:sih_app/views/register/pages/registration_page.dart';

Future<void> _firebaseMessagingBackgroundHandler(RemoteMessage message) async {
  await Firebase.initializeApp();
}

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Turboroute',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.blueGrey,
        textSelectionTheme: const TextSelectionThemeData(
          cursorColor: Colors.black, //<-- SEE HERE
        ),
      ),
      home: RegisterPage(),
    );
  }
}
