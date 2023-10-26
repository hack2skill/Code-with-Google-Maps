import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';

import '../Models/models.dart';
import '../Services/services.dart';

class PastOrdersScreen extends StatefulWidget {
  const PastOrdersScreen({
    Key? key,
  }) : super(key: key);

  @override
  State<PastOrdersScreen> createState() => _PastOrdersScreenState();
}

class _PastOrdersScreenState extends State<PastOrdersScreen> {
  @override
  Widget build(BuildContext context) {
    OrderServices orderServices = Provider.of<OrderServices>(context);
    final sp = context.watch<SignInProvider>();
    return Scaffold(
      appBar: AppBar(
        title: const Text("Order History"),
      ),
      body: StreamBuilder<List<OrderModel>>(
        stream: orderServices.readRiderOrders(userId: sp.uidR!),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.done) {
            if (snapshot.data != null) {
              return ListView.builder(
                itemCount: snapshot.data!.length,
                itemBuilder: (context, index) {
                  return ListTile(
                    title: Text(snapshot.data![index].orderID),
                  );
                },
              );
            } else {
              return Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: const [
                    Image(
                      image: AssetImage("lib/Assets/no_result.png"),
                      width: 200,
                      height: 200,
                    ),
                    Text("There are no notifications to show"),
                  ],
                ),
              );
            }
          } else if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(
              child: CircularProgressIndicator(),
            );
          } else {
            return ListView.builder(
              itemCount: snapshot.data!.length,
              itemBuilder: (context, index) {
                return ListTile(
                  title: Text(snapshot.data![index].orderID),
                  leading: Icon(Icons.numbers),
                  subtitle: Text(DateFormat('dd-MMM-yyy')
                      .format(snapshot.data![index].createdAt.toDate())),
                );
              },
            );
          }
        },
      ),
    );
  }
}
