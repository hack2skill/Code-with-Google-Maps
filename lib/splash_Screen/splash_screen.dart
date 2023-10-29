import 'dart:async';

import 'package:flutter/material.dart';
import 'package:users_app/asistants/asistant_methods.dart';

import '../Main_Screen/main_screen.dart';
import '../authentication/login_screeen.dart';
import '../global/global.dart';


class MySplash_Screen extends StatefulWidget {
  const MySplash_Screen({Key? key}) : super(key: key);

  @override
  State<MySplash_Screen> createState() => _MySplash_ScreenState();
}

class _MySplash_ScreenState extends State<MySplash_Screen> {
  startTimer() {
    currentFirebaseUser!= null ? AssistantMethods.readCurrentOnlineUserInfo() : null;
    Timer(const Duration(seconds: 3), () async {
    if(fAuth.currentUser!=null){
      currentFirebaseUser=fAuth.currentUser;
   Navigator.push(context, MaterialPageRoute(builder: (c) => MainScreen()));
    }
    else{
      Navigator.push(context, MaterialPageRoute(builder: (c) => LoginScreen()));
    }

    });
  }
    @override
    void initState(){
      super.initState();
      startTimer();
    }

  @override
  Widget build(BuildContext context) {
    return Material(
      child: Container(
        color: Colors.black,
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Image.asset("lib/images/logo.png"),
              const Text("EzPark",
              style: TextStyle(
                fontSize: 20,
                color: Colors.white,
                fontWeight: FontWeight.bold
              ),),

            ],
          ),
        ),
      ),
    );
  }
}
