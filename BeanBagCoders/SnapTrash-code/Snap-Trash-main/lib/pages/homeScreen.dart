import 'package:flutter/material.dart';
import 'package:google_nav_bar/google_nav_bar.dart';
import 'package:snap_trash/main.dart';
import 'package:snap_trash/pages/cameraScreen.dart';
import 'package:snap_trash/pages/leaderBoard.dart';
import 'package:snap_trash/pages/localReports.dart';
import 'package:snap_trash/properties/colourProp.dart';

class homeScreen extends StatefulWidget {
  const homeScreen({super.key});

  @override
  State<homeScreen> createState() => _homeScreenState();
}

class _homeScreenState extends State<homeScreen> {
  int _selectedIndex = 1;

  void _navigateBottomBar(int index) {
    setState(
      () {
        _selectedIndex = index;
      },
    );
  }

  static const List<Widget> _widgetOptions = <Widget>[
    leaderBoard(),
    ClipRRect(child: cameraMain()),
    localReports(),
  ];

  @override
  Widget build(BuildContext context) {
    // size variable
    double screenWidth = MediaQuery.of(context).size.width;
    double screenheight = MediaQuery.of(context).size.height;

    return Scaffold(
      backgroundColor: rang6,
      body: Center(
        child: _widgetOptions.elementAt(_selectedIndex),
      ),
      bottomNavigationBar: Stack(children: [
        Container(
          clipBehavior: Clip.none,
          height: screenheight * 0.15,
          decoration: BoxDecoration(
              borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(20), topRight: Radius.circular(20)),
              color: rang6),
          child: Padding(
            padding: EdgeInsets.all(screenWidth / 20),
            child: Container(
              // height: screenheight * 0.2,
              decoration: BoxDecoration(
                  borderRadius: BorderRadius.all(Radius.circular(20)),
                  color: rang6Light),
              child: GNav(
                selectedIndex: _selectedIndex,
                onTabChange: (index) {
                  setState(
                    () {
                      _selectedIndex = index;
                    },
                  );
                },
                rippleColor:
                    rangBackground, // tab button ripple color when pressed
                hoverColor: rang7, // tab button hover color
                haptic: true, // haptic feedback
                tabBorderRadius: 20,
                textSize: screenheight / 40,
                // tabActiveBorder:
                //     Border.all(color: rang7, width: 10), // tab button border
                // tabBorder:
                //     Border.all(color: prop.rang5, width: 1), // tab button border
                // tabShadow: [
                //   BoxShadow(color: prop.rang1, blurRadius: 2)
                // ], // tab button shadow
                curve: Curves.easeInCubic, // tab animation curves
                // duration:
                //     Duration(milliseconds: 1000), // tab animation duration
                gap: 5, // the tab button gap between icon and text
                // color: prop.rang6, // unselected icon color
                // activeColor: prop.rang1, // selected icon and text color
                iconSize: screenWidth / 12, // tab button icon size
                tabBackgroundColor:
                    rang6Light2, // selected tab background color
                padding: EdgeInsets.symmetric(
                  horizontal: screenWidth / 15,
                  vertical: screenheight * 0.02,
                ), // navigation bar padding
                tabs: [
                  GButton(
                    iconActiveColor: rang7,
                    iconColor: rang7,
                    icon: Icons.format_list_numbered_rounded,
                    textColor: rang7,
                    text: 'Rank',
                    textSize: screenheight,
                  ),
                  GButton(
                    iconActiveColor: rang7,
                    iconColor: rang7,
                    icon: Icons.photo_camera_outlined,
                    textColor: rang7,
                    text: '',
                  ),
                  GButton(
                    iconActiveColor: rang7,
                    iconColor: rang7,
                    icon: Icons.upcoming_outlined,
                    textColor: rang7,
                    text: 'Reports',
                  ),
                ],
              ),
            ),
          ),
        ),
      ]),
    );
  }
}
