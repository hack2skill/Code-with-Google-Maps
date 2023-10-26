import 'package:flutter/material.dart';

class Profile extends StatelessWidget {
  const Profile({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Center(
        child: ListView(
          children: [
            Padding(
              padding: const EdgeInsets.all(30.0),
              child: Center(
                child: Text(
                  'Your Profile Section',
                  style: TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                      color: const Color.fromARGB(255, 30, 30, 30)),
                ),
              ),
            ),
            SizedBox(
              height: 20,
            ),
            CircleAvatar(
              radius: 78,
              child: const CircleAvatar(
                backgroundImage: NetworkImage(
                    "https://media.istockphoto.com/id/1158344437/photo/close-up-portrait-of-indian-men.jpg?s=612x612&w=0&k=20&c=9hOIrHSkW0HwRRJF8yhlTPie1QRS2596UmNFa13JlfA="), //NetworkImage
                radius: 100,
              ), //CircleAvatar
            ),
            Column(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                SizedBox(
                  height: 30,
                ),
                Center(
                  child: Text(
                    'Ranjan Das',
                    style: TextStyle(
                      fontSize: 24,
                      color: const Color.fromARGB(255, 41, 41, 41),
                      fontWeight: FontWeight.w500,
                    ), //Textstyle
                  ),
                ),
                SizedBox(
                  height: 30,
                ),
                Center(
                  child: Text(
                    '8-A Lajpat Nagar,\nDamodar Colony,\nDelhi',
                    style: TextStyle(
                      fontSize: 20,
                      color: const Color.fromARGB(255, 41, 41, 41),
                      fontWeight: FontWeight.w500,
                    ), //Textstyle
                  ),
                ),
                SizedBox(
                  height: 30,
                ),
                Center(
                  child: Text(
                    'Montly Buying: ₹60,000',
                    style: TextStyle(
                      fontSize: 18,
                      color: const Color.fromARGB(255, 41, 41, 41),
                      fontWeight: FontWeight.w500,
                    ), //Textstyle
                  ),
                ),
              ],
            )
          ],
        ),
      ),
    );
  }
}
