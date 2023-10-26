import 'package:cloud_firestore/cloud_firestore.dart';

class OrderModel {
  Timestamp createdAt;
  String uidD;
  String uidR;
  String riderName;
  String orderID;
  double total;
  OrderModel(
      {required this.createdAt,
      required this.orderID,
      required this.riderName,
      required this.uidR,
      required this.uidD,
      required this.total});

  static OrderModel fromJson(Map<String, dynamic> json) => OrderModel(
        uidD: json['uidD'],
        createdAt: json['createdAt'],
        orderID: json['orderID'],
        riderName: json['riderName'],
        uidR: json['uidR'],
        total: double.parse((json['total']).toString()),
      );
  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['uidD'] = uidD;
    data['createdAt'] = createdAt;
    data['orderID'] = orderID;
    data['riderName'] = riderName;
    data['uidR'] = uidR;
    data['total'] = total;
    return data;
  }
}
