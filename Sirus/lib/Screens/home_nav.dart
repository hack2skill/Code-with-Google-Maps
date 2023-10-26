import 'package:flutter/material.dart';
import 'package:flutter_snake_navigationbar/flutter_snake_navigationbar.dart';
import 'package:provider/provider.dart';
import 'package:taxiflex/Screens/screens.dart';
import 'package:unicons/unicons.dart';

import '../Services/services.dart';


class HomeNav extends StatefulWidget {
  const HomeNav({Key? key}) : super(key: key);

  @override
  _HomeNavState createState() => _HomeNavState();
}

class _HomeNavState extends State<HomeNav> {

  Future getData() async {
    final sp = context.read<SignInProvider>();
    sp.getRiderDataFromSharedPreferences();
  }

  @override
  void initState() {
    super.initState();
    getData();
  }


  int currentIndex = 0;
  final screens = [
    const MapScreen(),
     const PastOrdersScreen(),
     AllRoutesScreen(),
  ];
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      bottomNavigationBar: SnakeNavigationBar.color(
        height: 60,
        currentIndex: currentIndex,
        onTap: (index) => setState(() {
          currentIndex = index;
        }),
        snakeShape: SnakeShape.indicator,
        showSelectedLabels: false,
        items: const [
          BottomNavigationBarItem(icon: Icon(UniconsLine.estate), label: 'Home'),
          BottomNavigationBarItem(
              icon: Icon(UniconsLine.history), label: 'Past Orders'),
          BottomNavigationBarItem(
              icon: Icon(UniconsLine.user_location), label: 'Near Me'),
        ],
      ),
      body: IndexedStack(
        index: currentIndex,
        children: screens,
      ),
    );
  }
}
