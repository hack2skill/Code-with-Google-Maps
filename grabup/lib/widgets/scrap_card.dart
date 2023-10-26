import 'package:flutter/material.dart';

class ScrapCard extends StatefulWidget {
  final scrap;
  ScrapCard({super.key, this.scrap});

  @override
  State<ScrapCard> createState() => _ScrapCardState();
}

class _ScrapCardState extends State<ScrapCard> {
  @override
  Widget build(BuildContext context) {
    return Center(
      /** Card Widget **/
      child: Card(
        elevation: 50,
        shadowColor: Colors.black,
        color: Color.fromARGB(255, 255, 255, 255),
        child: SizedBox(
          width: MediaQuery.of(context).size.width * 0.94,
          height: 350,
          child: Padding(
            padding: const EdgeInsets.all(10.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Container(
                  width: 350,
                  height: 150,
                  child: Image.asset(widget.scrap.image),
                ), //CircleAvatar
                const SizedBox(
                  height: 20,
                ), //SizedBox
                Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      widget.scrap.title ?? '',
                      style: TextStyle(
                        fontSize: 20,
                        color: Color.fromARGB(255, 51, 51, 51),
                        fontWeight: FontWeight.w600,
                      ), //Textstyle
                    ),
                    SizedBox(
                      height: 10,
                      width: 20,
                    ),
                    ElevatedButton(
                      onPressed: () => 'Null',
                      style: ButtonStyle(
                        backgroundColor: MaterialStateProperty.all(
                          Color.fromARGB(255, 71, 197, 62),
                        ),
                      ),
                      child: Padding(
                        padding: const EdgeInsets.all(4),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: const [Icon(Icons.delete), Text('Remove')],
                        ),
                      ),
                    ),
                  ],
                ), //Textext
                const SizedBox(
                  height: 10,
                ), //SizedBoxizedBox
              ],
            ), //Column
          ), //Padding
        ), //SizedBox
      ), //Card
    );
  }
}
