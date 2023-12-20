// ignore_for_file: file_names
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:lottie/lottie.dart';
import 'package:sizer/sizer.dart';
import '../widgets/mapsview.dart';

bool isVisible = false;

class DashBoard extends StatefulWidget {
  const DashBoard({super.key});

  @override
  State<DashBoard> createState() => _DashBoardState();
}

class _DashBoardState extends State<DashBoard> {
  final TextEditingController _controller = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        SingleChildScrollView(
          child: Column(
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  AppBar(
                      elevation: 0,
                      actions: [
                        Icon(
                          Icons.camera_alt_outlined,
                          color: Colors.black54,
                          size: 4.h,
                        ),
                        SizedBox(
                          width: 5.w,
                        )
                      ],
                      title: Image.asset(
                        'assets/images/Logo.png',
                        width: 23.w,
                      ),
                      backgroundColor: const Color(0xffffffff)),
              
                  const Divider(
                    thickness: 0.7,
                    color: Colors.grey,
                  ),
                  Padding(
                    padding: EdgeInsets.only(left: 3.h, top: 2.h, right: 2.h),
                    child: SearchBar(
                      controller: _controller,
                      leading: Padding(
                        padding: EdgeInsets.all(8.0.sp),
                        child: const Icon(
                          Icons.location_pin,
                          color: Color(0xff009955),
                        ),
                      ),
                      hintText: 'Where can i take you today?',
                      hintStyle: MaterialStatePropertyAll(
                        GoogleFonts.poppins(fontWeight: FontWeight.w500),
                      ),
                      trailing: [
                        IconButton.filled(
                            onPressed: () {
                              getTrip(_controller.text, context);
                              setState(() {
                                isVisible = true;
                              });
                            },
                            icon: const Icon(
                              Icons.send,
                              color: Color(0xff009955),
                            )),
                      ],
                      elevation: const MaterialStatePropertyAll(0),
                      backgroundColor: const MaterialStatePropertyAll(
                          Color.fromARGB(205, 178, 239, 212)),
                    ),
                  ),
                  SizedBox(
                    height: 2.h,
                  ),
                  Align(
                    alignment: Alignment.center,
                    child: FloatingActionButton.extended(
                      onPressed: () {},
                      elevation: 0,
                      backgroundColor: const Color(0xff009955),
                      hoverColor: const Color.fromARGB(205, 227, 255, 246),
                      focusColor: const Color(0xff009955),
                      label: const Text('Tap to talk'),
                      icon: const Icon(Icons.mic),
                    ),
                  ),
                  SizedBox(
                    height: 2.h,
                  ),
                  Align(
                      alignment: Alignment.center,
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(10),
                        child: Image.asset(
                          'assets/images/explore.png',
                          width: 90.w,
                        ),
                      )),
                  SizedBox(
                    height: 2.h,
                  ),
                  Padding(
                    padding: EdgeInsets.only(left: 3.h),
                    child: Text(
                      'Quick Trip!',
                      style: GoogleFonts.poppins(
                        fontSize: 16.sp,
                        color: const Color(0xff009955),
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                  Padding(
                    padding: EdgeInsets.only(left: 3.h, top: 2.h),
                    child: quickTrip(),
                  )
                ],
              ),
            ],
          ),
        ),
        Visibility(
          visible: isVisible,
          child: Container(
            decoration: BoxDecoration(
              color: Colors.black.withOpacity(0.5),
            ),
            child: Center(
              child: Material(
                borderRadius: BorderRadius.circular(20),
                child: Lottie.network(
                    'https://lottie.host/8851ec49-bcae-4550-9917-f22b19c40926/lpGgyiL5Mk.json',
                    width: 20.h),
              ),
            ),
          ),
        )
      ],
    );
  }

  Row quickTrip() {
    return Row(
      children: [
        Column(
          children: [
            Container(
                width: 9.h,
                height: 9.h,
                decoration: BoxDecoration(
                  color: const Color(0xFCCECECE),
                  borderRadius: BorderRadius.circular(10.sp),
                ),
                child: Image.asset(
                  'assets/images/scooter.png',
                )),
            Text(
              'One day',
              style: GoogleFonts.poppins(
                  fontSize: 10.sp, fontWeight: FontWeight.w400),
            ),
          ],
        ),
        SizedBox(
          width: 1.8.h,
        ),
        Column(
          children: [
            Container(
              width: 9.h,
              height: 9.h,
              decoration: BoxDecoration(
                color: const Color(0xFCCECECE),
                borderRadius: BorderRadius.circular(10.sp),
              ),
              child: Image.asset(
                'assets/images/budget.png',
              ),
            ),
            Text(
              'Budget',
              style: GoogleFonts.poppins(
                  fontSize: 10.sp, fontWeight: FontWeight.w400),
            )
          ],
        ),
        SizedBox(
          width: 1.8.h,
        ),
        Column(
          children: [
            Container(
              width: 9.h,
              height: 9.h,
              decoration: BoxDecoration(
                color: const Color(0xFCCECECE),
                borderRadius: BorderRadius.circular(10.sp),
              ),
              child: Image.asset(
                'assets/images/foodtrip.png',
              ),
            ),
            Text(
              'Food trip',
              style: GoogleFonts.poppins(
                  fontSize: 10.sp, fontWeight: FontWeight.w400),
            )
          ],
        ),
        SizedBox(
          width: 1.8.h,
        ),
        Column(
          children: [
            Container(
              width: 9.h,
              height: 9.h,
              decoration: BoxDecoration(
                color: const Color(0xFCCECECE),
                borderRadius: BorderRadius.circular(10.sp),
              ),
              child: Image.asset(
                'assets/images/adventurer.png',
              ),
            ),
            Text(
              'Adventures',
              style: GoogleFonts.poppins(
                  fontSize: 10.sp, fontWeight: FontWeight.w400),
            )
          ],
        )
      ],
    );
  }

  Future<void> getTrip(question, context) async {
    Map resultMap = {};
    print(question);
    final result = await http.post(
      Uri.parse('https://web-production-77cb.up.railway.app/text'),
      headers: <String, String>{
        'Content-Type': 'application/json',
      },
      body: jsonEncode(<String, dynamic>{
        "address": "Govt.Model Engineering College,Thrikakara",
        "latitude": "10.02817195",
        "longitude": "76.32843611331214",
        "text": question
      }),
    );
    if (result.statusCode == 200) {
      // If the server returns a successful response, navigate to the next page.
      final decodedData = jsonDecode(result.body);
      // Ensure you're in a StatefulWidget context and use setState to navigate
      setState(() {
        resultMap = decodedData;
        isVisible = false;
        Navigator.push(
          context,
          MaterialPageRoute(
              builder: (context) => MapSample(
                    pointMap: resultMap,
                  )),
        );
      });
      print(
        resultMap,
      );
    } else {
      // If there's an error in the HTTP request, you may want to handle it here.
      setState(() {
        isVisible = false;
      });
      throw Exception(result.statusCode);
    }
  }
}

class StoryBlock extends StatelessWidget {
  const StoryBlock({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    List names = [
      'Alfred Jimmy',
      'Goutham C arun',
      'Athul Babu',
      'Anand a',
      'Jamal P',
      'Jeff Prakash',
      'Akshay John'
    ];
    List url = [
      'https://images.pexels.com/photos/208745/pexels-photo-208745.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/678725/pexels-photo-678725.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/2884866/pexels-photo-2884866.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/3073666/pexels-photo-3073666.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/372490/pexels-photo-372490.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/1831545/pexels-photo-1831545.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/3214975/pexels-photo-3214975.jpeg?auto=compress&cs=tinysrgb&w=1600'
    ];
    return Padding(
      padding: EdgeInsets.only(
        top: 0.5.h,
      ),
      child: SizedBox(
        height: 14.5.h,
        child: ListView.builder(
            scrollDirection: Axis.horizontal,
            physics: const BouncingScrollPhysics(),
            itemCount: names.length,
            itemBuilder: (context, index) {
              return Padding(
                padding: EdgeInsets.only(left: 1.5.h),
                child: SizedBox(
                  width: 24.w,
                  child: Column(
                    children: [
                      CircleAvatar(
                        radius: 12.w,
                        backgroundColor: const Color.fromARGB(255, 0, 201, 111),
                        child: CircleAvatar(
                          backgroundColor: Colors.white,
                          radius: 11.w,
                          child: CircleAvatar(
                            radius: 10.w,
                            backgroundImage: NetworkImage(url[index]),
                          ),
                        ),
                      ),
                      Text(
                        names[index],
                        style: GoogleFonts.poppins(
                            fontSize: 8.sp,
                            fontWeight: FontWeight.w500,
                            textStyle: const TextStyle(
                              overflow: TextOverflow.ellipsis,
                            )),
                      )
                    ],
                  ),
                ),
              );
            }),
      ),
    );
  }
}
