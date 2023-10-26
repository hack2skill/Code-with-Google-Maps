import 'package:cloud_firestore/cloud_firestore.dart';

import '../Models/models.dart';

class ShortRouteService {
  CollectionReference shortRoutes =
      FirebaseFirestore.instance.collection('shortRoutes');

  //* Getting a stream of all available routes
  Stream<List<ShortRouteModel>> readAllShortRoutes() =>
      shortRoutes.snapshots().map((snapshot) => snapshot.docs
          .map((doc) =>
              ShortRouteModel.fromJson(doc.data() as Map<String, dynamic>))
          .toList());

  //* Getting a list of routes with a matching start_ID
  Stream<List<ShortRouteModel>> readShortRoutesByID(
          {required String startID}) =>
      shortRoutes.where("start_location", isEqualTo: startID).snapshots().map(
          (snapshot) => snapshot.docs
              .map((e) =>
                  ShortRouteModel.fromJson(e.data() as Map<String, dynamic>))
              .toList());
}
