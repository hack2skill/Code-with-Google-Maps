import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:snap_trash/pages/homeScreen.dart';
import 'package:snap_trash/pages/infoMainPage.dart';
import 'package:snap_trash/pages/infoMainPage.dart';

class auth extends StatelessWidget {
  const auth({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: StreamBuilder<User?>(
        stream: FirebaseAuth.instance.authStateChanges(),
        builder: (context, snapshot) {
          // check if user logged in
          if (snapshot.hasData) {
            return homeScreen();
            // Navigator.pop(context);
          }

          // user is not logged in
          else {
            return infoMainPage();
          }
        },
      ),
    );
  }
}
