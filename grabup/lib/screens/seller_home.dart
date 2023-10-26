import 'package:flutter/material.dart';
import 'package:grabup/screens/seller/deal_screen.dart';
import 'package:grabup/screens/seller/listing_screen.dart';
import 'package:grabup/screens/seller/map_screen.dart';
import 'package:grabup/screens/seller/scrap_list.dart';
import 'package:salomon_bottom_bar/salomon_bottom_bar.dart';

class SellerScreen extends StatefulWidget {
  const SellerScreen({super.key});

  @override
  State<SellerScreen> createState() => _SellerScreenState();
}

class _SellerScreenState extends State<SellerScreen> {
  var _currentIndex = 0;

  static const List<Widget> _pages = <Widget>[
    MapScreen(),
    ScrapList(),
    ListingScreen(),
    DealScreen()
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Grabup',
          style: TextStyle(color: Colors.white),
        ),
        automaticallyImplyLeading: false,
        backgroundColor: Color.fromARGB(255, 19, 19, 19),
      ),
      body: Center(
        child: _pages.elementAt(_currentIndex),
      ),
      bottomNavigationBar: Container(
        height: 80,
        decoration: BoxDecoration(
          boxShadow: [
            BoxShadow(
              color: Color.fromARGB(255, 19, 19, 19),
              spreadRadius: 5,
              offset: Offset(0, 3), // changes position of shadow
            ),
          ],
        ),
        child: SalomonBottomBar(
          // backgroundColor: Colors.white,
          unselectedItemColor: Colors.white,
          currentIndex: _currentIndex,
          onTap: (i) => setState(() => _currentIndex = i),
          items: [
            /// Home
            SalomonBottomBarItem(
              icon: Icon(Icons.add_location_alt),
              title: Text("Buyers"),
              selectedColor: Colors.white,
            ),

            /// Likes
            SalomonBottomBarItem(
              icon: Icon(Icons.ballot_rounded),
              title: Text("Scrap List"),
              selectedColor: Colors.white,
            ),

            /// Search
            SalomonBottomBarItem(
              icon: Icon(Icons.add_box_rounded),
              title: Text("Listing"),
              selectedColor: Colors.white,
            ),

            /// Profile
            SalomonBottomBarItem(
              icon: Icon(Icons.card_giftcard_rounded),
              title: Text("Deals"),
              selectedColor: Colors.white,
            ),
          ],
        ),
      ),
    );
  }
}
