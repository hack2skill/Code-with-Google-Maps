import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';
import 'package:tripn/view/navigationpage.dart';

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return Sizer(builder: (context, orientation, deviceType) {
      return const MaterialApp(
        debugShowCheckedModeBanner: false,
        home: NavigationPage(),
      );
    });
  }
}
