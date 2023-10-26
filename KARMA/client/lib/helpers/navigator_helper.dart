import 'package:flutter/material.dart';

class NavigationHelper {
  static void navigateToSecondRoute(BuildContext context, Widget route) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => route,
      ),
    );
  }
}
