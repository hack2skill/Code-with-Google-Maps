import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:taxiflex/Screens/past_orders_screen.dart';
import 'package:taxiflex/Screens/screens.dart';
import 'package:taxiflex/Utils/next_screen.dart';
import 'package:uuid/uuid.dart';
import 'package:webview_flutter/webview_flutter.dart';

import '../Services/services.dart';
import '../Utils/rapyd.dart';

class CheckOutScreen extends StatefulWidget {
  final Rapyd rapyd;
  final double cost;
  final String driverID;

  const CheckOutScreen(
      {super.key,
      required this.rapyd,
      required this.cost,
      required this.driverID});
  @override
  State<StatefulWidget> createState() {
    return _CheckOutScreenState();
  }
}

OrderServices orderServices = OrderServices();

class _CheckOutScreenState extends State<CheckOutScreen> {
    Future getData() async {
    final sp = context.read<SignInProvider>();
    sp.getRiderDataFromSharedPreferences();
  }

  late Future<Map> createdCheckoutPage;
  @override
  void initState() {
    super.initState();
    getData();
    createdCheckoutPage = widget.rapyd.createCheckoutPage();
  }

  @override
  Widget build(BuildContext context) {
    final sp = context.watch<SignInProvider>();

    return Scaffold(
      resizeToAvoidBottomInset: true,
      appBar: AppBar(
        leading: const Icon(Icons.arrow_back_ios),
        title: const Align(
          child: Text("Checkout",
              textAlign: TextAlign.center,
              style:
                  TextStyle(color: Colors.black, fontWeight: FontWeight.bold)),
        ),
        backgroundColor: Colors.white,
        actions: const [
          SizedBox(
            width: 55,
          ),
        ],
        elevation: 0,
      ),
      body: FutureBuilder(
        future: createdCheckoutPage,
        builder: (BuildContext context, AsyncSnapshot<dynamic> snapshot) {
          switch (snapshot.connectionState) {
            case ConnectionState.waiting:
              return const Center(child: CircularProgressIndicator());
            default:
              if (snapshot.hasError) {
                return const Center(child: Text('Some error occurred!'));
              } else {
                return WebView(
                  initialUrl: snapshot.data["redirect_url"].toString(),
                  javascriptMode: JavascriptMode.unrestricted,
                  onPageStarted: (url) {
                    //Exit webview widget once the current url matches either checkout completed or canceled urls
                    if (url.contains(snapshot.data["complete_checkout_url"])) {
                      Uuid uuid = const Uuid();
                      orderServices
                          .createOrder(
                            createdAt: Timestamp.now(),
                            riderName: sp.name!,
                            orderID: uuid.v4(),
                            riderID: sp.uidR!,
                            driverID: widget.driverID,
                            total: widget.cost,
                          )
                          .then(
                            (value) => nextScreenReplace(
                              context,
                               PastOrdersScreen(),
                            ),
                          )
                          .then(
                            (value) =>
                                ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(
                                content:
                                    Text("Order completed successfully 🙌 🎉"),
                              ),
                            ),
                          );
                    } else if (url
                        .contains(snapshot.data["cancel_checkout_url"])) {
                      Navigator.pop(context);
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('Transaction Failed ⛔️'),
                        ),
                      );
                    }
                  },
                );
              }
          }
        },
      ),
    );
  }
}
