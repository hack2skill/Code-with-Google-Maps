import 'package:cloud_firestore/cloud_firestore.dart';

import '../Models/models.dart';

class OrderServices {
  CollectionReference orders = FirebaseFirestore.instance.collection('orders');
//* Create an order in firebase
  Future createOrder({
    required Timestamp createdAt,
    required String orderID,
    required String riderID,
    required String riderName,
    required String driverID,
    required double total,
  }) async {
    final order = OrderModel(
      riderName: riderName,
      uidD: driverID,
      createdAt: createdAt,
      uidR: riderID,
      orderID: orderID,
      total: total,
    );
    final json = order.toJson();
    //*We create a collection in the riders name and one in the
    await orders.doc().set(json);
  }

  //* Getting a stream of all user orders
  Stream<List<OrderModel>> readRiderOrders({required String userId}) => orders
      .where("uidR", isEqualTo: userId)
      .snapshots()
      .map((snapshot) => snapshot.docs
          .map((doc) => OrderModel.fromJson(doc.data() as Map<String, dynamic>))
          .toList());

  //* Get all of today's orders
  Stream<List<OrderModel>> readDriverOrders(
          {required String driverID,}) =>
      orders
          .where("uidD", isEqualTo: driverID)
          .snapshots()
          .map((snapshot) => snapshot.docs
              .map((doc) =>
                  OrderModel.fromJson(doc.data() as Map<String, dynamic>))
              .toList());
}
