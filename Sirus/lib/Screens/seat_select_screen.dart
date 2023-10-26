import 'package:flutter/material.dart';

import '../Utils/utils.dart';

class SeatSelectScreen extends StatefulWidget {
  const SeatSelectScreen({super.key});

  @override
  State<SeatSelectScreen> createState() => _SeatSelectScreenState();
}

class _SeatSelectScreenState extends State<SeatSelectScreen> {
  bool isSelected = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Seat Select"),
        centerTitle: true,
      ),
      body: Stack(
        children: [
          Center(
            child: CustomPaint(
              size: Size(
                320,
                (320 * 2.425233644859813).toDouble(),
              ),
              painter: RPSCustomPainter(),
            ),
          ),
          Positioned(
            bottom: 30,
            left: 80,
            right: 80,
            top: 160,
            child: Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    InkWell(
                      onTap: () {
                        setState(() {
                          isSelected = !isSelected;
                        });
                      },
                      child: Container(
                        height: 60,
                        width: 60,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(15),
                          border: Border.all(
                            color: isSelected == true? Colors.greenAccent : Colors.grey,
                            width: 3,
                          ),
                          color: isSelected == true ? Colors.greenAccent : Colors.transparent,
                        ),
                        child: Icon(
                         isSelected == true ? Icons.check_circle: Icons.circle_outlined,
                          color: isSelected == true ? Colors.white :Colors.grey,
                        ),
                      ),
                    ),
                    const SizedBox(width: 10),
                    Container(
                      height: 65,
                      width: 60,
                      color: Colors.red,
                    ),
                    const Spacer(),
                    Container(
                      height: 65,
                      width: 60,
                      color: Colors.grey,
                    ),
                  ],
                ),
                const SizedBox(height: 30),
                Row(
                  children: [
                    const Spacer(),
                    Container(
                      height: 65,
                      width: 60,
                      color: Colors.red,
                    ),
                    const SizedBox(width: 10),
                    Container(
                      height: 65,
                      width: 60,
                      color: Colors.red,
                    ),
                  ],
                ),
                const SizedBox(height: 30),
                Row(
                  children: [
                    Container(
                      height: 65,
                      width: 60,
                      color: Colors.red,
                    ),
                    const Spacer(),
                    Container(
                      height: 65,
                      width: 60,
                      color: Colors.red,
                    ),
                    const SizedBox(width: 10),
                    Container(
                      height: 65,
                      width: 60,
                      color: Colors.red,
                    ),
                  ],
                ),
                const SizedBox(height: 30),
                Row(
                  children: [
                    Container(
                      height: 65,
                      width: 60,
                      color: Colors.red,
                    ),
                    const Spacer(),
                    Container(
                      height: 65,
                      width: 60,
                      color: Colors.red,
                    ),
                    const SizedBox(width: 10),
                    Container(
                      height: 65,
                      width: 60,
                      color: Colors.red,
                    ),
                  ],
                ),
                const SizedBox(height: 30),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Container(
                      height: 65,
                      width: 50,
                      color: Colors.red,
                    ),
                    Container(
                      height: 65,
                      width: 50,
                      color: Colors.red,
                    ),
                    Container(
                      height: 65,
                      width: 50,
                      color: Colors.red,
                    ),
                    Container(
                      height: 65,
                      width: 50,
                      color: Colors.red,
                    ),
                  ],
                ),
              ],
            ),
          )
        ],
      ),
    );
  }
}
