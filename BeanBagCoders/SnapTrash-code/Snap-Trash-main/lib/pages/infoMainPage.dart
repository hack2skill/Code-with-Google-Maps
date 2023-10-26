import 'package:flutter/material.dart';
import 'package:lottie/lottie.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:snap_trash/pages/homeScreen.dart';
import 'package:snap_trash/pages/loginSignin/loginPage.dart';
import 'package:snap_trash/properties/colourProp.dart';

class infoMainPage extends StatefulWidget {
  const infoMainPage({super.key});

  @override
  State<infoMainPage> createState() => _infoMainPageState();
}

class _infoMainPageState extends State<infoMainPage> {
  @override
  Widget build(BuildContext context) {
    // size variable
    double screenWidth = MediaQuery.of(context).size.width;
    double screenheight = MediaQuery.of(context).size.height;

    return Scaffold(
      backgroundColor: rang6,
      body: Center(
        child: Padding(
          padding: EdgeInsets.all(0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
              Padding(
                padding: EdgeInsets.all(screenheight * 0.03),
                child: Text(
                  "Snap Trash",
                  style: GoogleFonts.montserrat(
                    fontWeight: FontWeight.bold,
                    fontSize: screenheight / 15,
                    color: rangNeutral,
                  ),
                ),
              ),
              Lottie.asset(
                'assets/animations/trashAnimation.json',
                repeat: true,
                fit: BoxFit.fill,
                height: 300,
                width: 300,
              ),
              Container(
                height: screenheight * 0.35,
                decoration: BoxDecoration(
                  color: rangSecondary,
                  // shape: BoxShape.circle,
                  borderRadius: BorderRadius.only(
                    topLeft: Radius.circular(screenWidth * 3),
                    topRight: Radius.circular(screenWidth * 3),
                  ),
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    Container(
                      height: screenheight / 12,
                      width: screenWidth / 2,
                      child: ElevatedButton(
                        child: Text(
                          "Log In",
                          style: GoogleFonts.montserrat(
                            fontWeight: FontWeight.bold,
                            fontSize: screenheight / 27,
                            color: rangNeutral,
                          ),
                        ),
                        style: ElevatedButton.styleFrom(
                          shape: RoundedRectangleBorder(
                            borderRadius:
                                BorderRadius.circular(screenheight * 0.5),
                          ),
                          // elevation: 5,
                          backgroundColor: rang6,
                          foregroundColor: rang6,
                        ),
                        onPressed: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => loginPage(),
                            ),
                          );
                        },
                      ),
                    ),
                    Container(
                      height: screenheight / 40, // space box
                    ),
                    Container(
                      height: screenheight / 12,
                      width: screenWidth / 2,
                      child: ElevatedButton(
                        child: Text(
                          "Sign Up",
                          style: GoogleFonts.montserrat(
                            fontWeight: FontWeight.bold,
                            fontSize: screenheight / 27,
                            color: rangNeutral,
                          ),
                        ),
                        style: ElevatedButton.styleFrom(
                          shape: RoundedRectangleBorder(
                            borderRadius:
                                BorderRadius.circular(screenheight * 0.5),
                          ),
                          // elevation: 5,
                          backgroundColor: rang6,
                          foregroundColor: rang6,
                        ),
                        onPressed: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => homeScreen(),
                            ),
                          );
                        },
                      ),
                    ),
                    Container(
                      height: screenheight / 40,
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
