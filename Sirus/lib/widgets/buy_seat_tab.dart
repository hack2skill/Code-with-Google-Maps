import 'package:action_slider/action_slider.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_barcode_scanner/flutter_barcode_scanner.dart';
import 'package:taxiflex/Models/short_route_model.dart';
import 'package:timeline_tile/timeline_tile.dart';

import '../Screens/checkout_page.dart';
import '../Utils/rapyd.dart';

class BuySeatTab extends StatefulWidget {
  final ShortRouteModel routeModel;
  const BuySeatTab({Key? key, required this.routeModel}) : super(key: key);

  @override
  _BuySeatTabState createState() => _BuySeatTabState();
}

class _BuySeatTabState extends State<BuySeatTab> {
  //* QR Scanning initialisation and execution
  String _scanBarcode = 'Unknown';

  Future<void> scanQR() async {
    String barcodeScanRes;
    // Platform messages may fail, so we use a try/catch PlatformException.
    try {
      barcodeScanRes = await FlutterBarcodeScanner.scanBarcode(
          '#ff6666', 'Cancel', true, ScanMode.QR);
      print(barcodeScanRes);
    } on PlatformException {
      barcodeScanRes = 'Failed to get platform version.';
    }
    if (!mounted) return;
    setState(() {
      _scanBarcode = barcodeScanRes;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(20),
      child: Column(
        children: [
          Text(
            "Route",
            textAlign: TextAlign.start,
            style: TextStyle(
              color: Theme.of(context).colorScheme.onSecondaryContainer,
              fontWeight: FontWeight.w600,
              fontSize: 22,
            ),
          ),
          TimelineTile(
            alignment: TimelineAlign.start,
            afterLineStyle: LineStyle(
              color: Theme.of(context).colorScheme.onSecondaryContainer,
              thickness: 2,
            ),
            indicatorStyle: IndicatorStyle(
              color: Theme.of(context).colorScheme.onSecondaryContainer,
              height: 20,
              width: 20,
              padding: const EdgeInsets.only(
                bottom: 2,
              ),
              indicator: Icon(
                Icons.square_outlined,
                color: Theme.of(context).colorScheme.onSecondaryContainer,
                size: 20,
              ),
            ),
            lineXY: 0.7,
            isFirst: true,
            endChild: Container(
              padding: const EdgeInsets.only(
                left: 5,
              ),
              constraints: const BoxConstraints(
                minHeight: 50,
              ),
              child: Align(
                alignment: Alignment.centerLeft,
                child: Text(
                  widget.routeModel.startLocation,
                  style: TextStyle(
                      color: Theme.of(context).colorScheme.onSecondaryContainer,
                      fontWeight: FontWeight.w600),
                ),
              ),
            ),
          ),
          TimelineTile(
            alignment: TimelineAlign.start,
            beforeLineStyle: LineStyle(
              color: Theme.of(context).colorScheme.onSecondaryContainer,
              thickness: 2,
            ),
            indicatorStyle: IndicatorStyle(
              color: Theme.of(context).colorScheme.onSecondaryContainer,
              height: 20,
              width: 20,
              padding: const EdgeInsets.only(
                top: 2,
              ),
              indicator: Icon(
                Icons.circle_outlined,
                color: Theme.of(context).colorScheme.onSecondaryContainer,
                size: 20,
              ),
            ),
            lineXY: 0.7,
            isLast: true,
            endChild: Container(
              padding: const EdgeInsets.only(left: 5),
              constraints: const BoxConstraints(
                minHeight: 50,
              ),
              child: Align(
                alignment: Alignment.centerLeft,
                child: Text(
                  widget.routeModel.endLocation,
                  style: TextStyle(
                    fontWeight: FontWeight.w600,
                    color: Theme.of(context).colorScheme.onSecondaryContainer,
                  ),
                ),
              ),
            ),
          ),
          Divider(
            color: Theme.of(context).colorScheme.onSecondaryContainer,
          ),
          const Text(
            "ℹ️ In order to pay taxi fare, please scan it's QR code. Swipe to start the Checkout process👇",
          ),
          const Spacer(),
          ActionSlider.standard(
            sliderBehavior: SliderBehavior.stretch,
            foregroundBorderRadius: BorderRadius.circular(12),
            backgroundBorderRadius: BorderRadius.circular(16),
            child: const Text('Swipe to Checkout'),
            action: (controller) => scanQR().then((value) {
              var dataList = _scanBarcode.split('ZAR');
              String driverID = dataList[0];
              String Cost = dataList[1];
              Rapyd rapyd = Rapyd(double.parse(Cost));
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => CheckOutScreen(rapyd: rapyd,cost: double.parse(Cost),driverID: driverID),
                ),
              );
            }),
            width: 280,
            icon: Icon(Icons.navigate_next_rounded,
                color: Theme.of(context).colorScheme.onPrimary),
          ),
          Text('Scan result : $_scanBarcode\n'),
        ],
      ),
    );
  }
}
