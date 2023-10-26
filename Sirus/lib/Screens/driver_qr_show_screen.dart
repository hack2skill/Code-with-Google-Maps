import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:qr_flutter/qr_flutter.dart';

import '../Services/services.dart';

class DriverQR extends StatefulWidget {
  const DriverQR({Key? key}) : super(key: key);

  @override
  _DriverQRState createState() => _DriverQRState();
}

class _DriverQRState extends State<DriverQR> {
  @override
  Widget build(BuildContext context) {
    final sp = context.watch<SignInProvider>();

    return Scaffold(
      appBar: AppBar(),
      body: SizedBox(
        width: double.maxFinite,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Card(
              color: Colors.white,
              margin: const EdgeInsets.all(12),
              child: QrImage(
                data: '${sp.uidD}'"ZAR${sp.farePrice}",
                version: QrVersions.auto,
                size: 300,
                gapless: false,
                errorStateBuilder: (cxt, err) {
                  return const Center(
                    child: Text(
                      "Uh oh! Something went wrong...",
                      textAlign: TextAlign.center,
                    ),
                  );
                },
              ),
            ),
            /* ElevatedButton(
              child: const Text("Download the QR code"),
              onPressed: () {},
            )*/
          ],
        ),
      ),
    );
  }
}
