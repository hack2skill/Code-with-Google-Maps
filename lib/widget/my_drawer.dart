import 'package:flutter/material.dart';
import 'package:users_app/global/global.dart';
import 'package:users_app/splash_Screen/splash_screen.dart';

class MyDrawer extends StatefulWidget {

  String ?name;
  String ?email;

  MyDrawer({this.name,this.email});

  @override
  State<MyDrawer> createState() => _MyDrawerState();
}

class _MyDrawerState extends State<MyDrawer> {
  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        children: [
          //drawer header
          Container(
            height: 165,
            color: Colors.grey,
            child: DrawerHeader(
              decoration: const BoxDecoration(
                color: Colors.black,
              ),
              child: Row(
                children: [
                  const Icon(Icons.person,
                  size: 40,
                  color: Colors.grey,),
                  const SizedBox(
                    width: 16,
                  ),
                  Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children:[
                      Text(widget.name.toString(),
                      style: const TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                        color: Colors.grey,
                      ),),
                      const SizedBox(
                        height: 10,
                      ),
                      Text(widget.email.toString(),
                        style: const TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                          color: Colors.grey,
                        ),)
                    ],
                  )
                ],
              ),
            ),
          ),
          const SizedBox(
            height: 12,
          ),
          //drawer body
          GestureDetector(
            onTap:(){

            },
            child: const ListTile(
              leading: Icon(Icons.history,color: Colors.grey,),
              title: Text(
                "History",
                style: TextStyle(
                  color: Colors.white54,
                ),
              ),
            ),
          ),
          GestureDetector(
            onTap:(){

            },
            child: const ListTile(
              leading: Icon(Icons.person,color: Colors.white54,),
              title: Text(
                "Visit Profile",
                style: TextStyle(
                  color: Colors.white54,
                ),
              ),
            ),
          ),
          GestureDetector(
            onTap:(){

            },
            child: const ListTile(
              leading: Icon(Icons.info,color: Colors.grey,),
              title: Text(
                "About",
                style: TextStyle(
                  color: Colors.white54,
                ),
              ),
            ),
          ),
          GestureDetector(
            onTap:(){
                fAuth.signOut();
                Navigator.push(context, MaterialPageRoute(builder: (c)=>MySplash_Screen()));
            },
            child: const ListTile(
              leading: Icon(Icons.logout,color: Colors.grey,),
              title: Text(
                "Sign Out",
                style: TextStyle(
                  color: Colors.white54,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
