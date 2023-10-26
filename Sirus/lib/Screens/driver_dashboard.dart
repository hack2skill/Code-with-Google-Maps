import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';
import 'package:sleek_circular_slider/sleek_circular_slider.dart';
import 'package:taxiflex/Screens/driver_qr_show_screen.dart';
import 'package:taxiflex/Screens/screens.dart';
import 'package:we_slide/we_slide.dart';

import '../Services/services.dart';
import '../Utils/utils.dart';

class DriverDashboard extends StatefulWidget {
  const DriverDashboard({Key? key}) : super(key: key);

  @override
  _DriverDashboardState createState() => _DriverDashboardState();
}

class _DriverDashboardState extends State<DriverDashboard> {
  final GlobalKey<ScaffoldState> _driverKey = GlobalKey();

  @override
  Widget build(BuildContext context) {
    final double panelMinSize = MediaQuery.of(context).size.height * 0.50;
    final double panelMaxSize = MediaQuery.of(context).size.height * 0.90;
    final slideController = WeSlideController();
    final sp = context.watch<SignInProvider>();
    final orders = context.watch<OrderServices>();
    return Scaffold(
      key: _driverKey,
      drawer: Drawer(
        child: Column(
          children: [
            const SizedBox(
              height: 70,
            ),
            ListTile(
              onTap: () {
                nextScreen(context, const DriverQR());
              },
              title: const Text("Show My QR Code"),
              trailing: const Icon(Icons.qr_code_rounded),
            ),
            const Spacer(),
            ListTile(
              onTap: () {
                sp.userSignOut();
                nextScreenReplace(context, const LandingScreen());
              },
              title: const Text("Sign Out"),
              trailing: const Icon(Icons.logout_outlined),
            )
          ],
        ),
      ),
      appBar: AppBar(
        title: const Text("Driver Dashboard"),
        leading: IconButton(
          icon: Icon(
            Icons.menu,
            color: Theme.of(context).colorScheme.onPrimary,
          ),
          onPressed: () {
            _driverKey.currentState!.openDrawer();
          },
        ),
      ),
      body: 
      StreamBuilder(
        stream: orders.readDriverOrders(driverID: sp.uidD!),
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            return WeSlide(
              panelMaxSize: panelMaxSize,
              panelMinSize: panelMinSize,
              controller: slideController,
              panel: Container(
                width: double.maxFinite,
                color: Theme.of(context).cardColor,
                child: ListView.builder(
                  itemCount: snapshot.data!.length,
                  itemBuilder: (BuildContext context, int index) {
                    return Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: ListTile(title: Text(snapshot.data![index].riderName),
                      subtitle: Text(DateFormat('dd-MMM-yyy').format(snapshot.data![index].createdAt.toDate()))),
                    );
                  },
                ),
              ),
              body: Container(
                color: Theme.of(context).colorScheme.background,
                child: Column(children: [
                  const SizedBox(height: 26),
                  SleekCircularSlider(
                    appearance: CircularSliderAppearance(
                      size: 250,
                      spinnerMode: false,
                      infoProperties: InfoProperties(
                        modifier: (double value) {
                          final count = value.toInt();
                          return '$count';
                        },
                        topLabelText: "Passengers Today",
                        topLabelStyle: TextStyle(
                            color: Theme.of(context).colorScheme.onBackground,
                            fontWeight: FontWeight.w600),
                        mainLabelStyle: TextStyle(
                            color: Theme.of(context).colorScheme.onBackground,
                            fontWeight: FontWeight.w600,
                            fontSize: 24),
                      ),
                      customColors: CustomSliderColors(
                        dynamicGradient: true,
                        progressBarColors: [
                          Theme.of(context).colorScheme.secondary,
                          Theme.of(context).colorScheme.secondaryContainer,
                        ],
                        hideShadow: true,
                        shadowColor: Theme.of(context).colorScheme.secondary,
                        trackColors: [
                          Theme.of(context).colorScheme.onBackground,
                          Theme.of(context).colorScheme.secondary
                        ],
                      ),
                      customWidths: CustomSliderWidths(
                        progressBarWidth: 30,
                        trackWidth: 5,
                      ),
                    ),
                    min: 0,
                    max: 15,
                    initialValue:
                        double.parse(snapshot.data!.length.toString()),
                  ),
                ]),
              ),
            );
          }
          //* If no orders have been made that day
          if (!snapshot.hasData || snapshot.data == null) {
            return WeSlide(
              panelMaxSize: panelMaxSize,
              panelMinSize: panelMinSize,
              controller: slideController,
              panel: Container(
                width: double.maxFinite,
                color: Theme.of(context).cardColor,
                child: Column(
                  children: [
                    TextButton.icon(
                      onPressed: () {
                        print(snapshot.data!.length);
                      },
                      icon: const Icon(Icons.keyboard_arrow_up_sharp),
                      label: const Text("Pull to see more"),
                    ),
                    const Center(
                      child: Text("No fares have been paid today..."),
                    )
                  ],
                ),
              ),
              body: Container(
                color: Theme.of(context).colorScheme.background,
                child: Column(children: [
                  const SizedBox(height: 26),
                  SleekCircularSlider(
                    appearance: CircularSliderAppearance(
                      // spinnerMode: true,
                      spinnerDuration: 12000,
                      size: 250,
                      infoProperties: InfoProperties(
                        modifier: (double value) {
                          final count = value.toInt();
                          return '$count';
                        },
                        topLabelText: "Waiting for orders...",
                        topLabelStyle: TextStyle(
                            color: Theme.of(context).colorScheme.onBackground,
                            fontWeight: FontWeight.w600),
                        mainLabelStyle: TextStyle(
                            color: Theme.of(context).colorScheme.onBackground,
                            fontWeight: FontWeight.w600,
                            fontSize: 24),
                      ),
                      customColors: CustomSliderColors(
                        dynamicGradient: true,
                        progressBarColors: [
                          Theme.of(context).colorScheme.secondary,
                          Theme.of(context).colorScheme.secondaryContainer,
                        ],
                        hideShadow: true,
                        shadowColor: Theme.of(context).colorScheme.secondary,
                        trackColors: [
                          Theme.of(context).colorScheme.onBackground,
                          Theme.of(context).colorScheme.secondary
                        ],
                      ),
                      customWidths: CustomSliderWidths(
                        progressBarWidth: 30,
                        trackWidth: 5,
                      ),
                    ),
                    min: 0,
                    max: 15,
                    initialValue: 0,
                  ),
                ]),
              ),
            );
          } else {
            return Container();
          }
        },
      ),
    );
  }
}
