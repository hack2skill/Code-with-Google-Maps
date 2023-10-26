import 'package:flutter/material.dart';
import 'package:flutter_snake_navigationbar/flutter_snake_navigationbar.dart';
import 'package:provider/provider.dart';
import 'package:taxiflex/Screens/screens.dart';
import '../Services/services.dart';

class DriverHomeScreen extends StatefulWidget {
  const DriverHomeScreen({Key? key}) : super(key: key);

  @override
  _DriverHomeScreenState createState() => _DriverHomeScreenState();
}

class _DriverHomeScreenState extends State<DriverHomeScreen> {
  Future getData() async {
    final sp = context.read<SignInProvider>();
    sp.getDriverDataFromSharedPreferences();
  }

  @override
  void initState() {
    super.initState();
    getData();
  }

  int currentIndex = 0;
  final screens = [
    const DriverDashboard(),
    const DriverPastOrders(),
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
        snakeShape: SnakeShape.circle,
        items: const [
           BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
          BottomNavigationBarItem(
              icon: Icon(Icons.credit_card_outlined), label: 'Past orders'),
        ],
      ),
      body: IndexedStack(
        index: currentIndex,
        children: screens,
      ),

    );
  }
}
