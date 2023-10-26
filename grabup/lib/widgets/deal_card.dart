import 'package:flutter/material.dart';

class DealCard extends StatefulWidget {
  final deal;
  DealCard({super.key, this.deal});

  @override
  State<DealCard> createState() => _DealCardState();
}

class _DealCardState extends State<DealCard> {
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
                  child: Image.asset(widget.deal.image),
                ), //CircleAvatar
                const SizedBox(
                  height: 20,
                ), //SizedBox
                Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      widget.deal.offer ?? '',
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
                          Color.fromARGB(255, 27, 27, 27),
                        ),
                      ),
                      child: Padding(
                        padding: const EdgeInsets.all(4),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(Icons.card_giftcard),
                            SizedBox(
                              width: 30,
                            ),
                            Text('Min Selling  ₹'),
                            Text(widget.deal.amount.toString())
                          ],
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
