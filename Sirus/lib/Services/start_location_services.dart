import 'package:cloud_firestore/cloud_firestore.dart';

import '../Models/models.dart';

class StartLocationService {
  CollectionReference starts = FirebaseFirestore.instance.collection("starts");

  //* Getting a stream of starts to populat search and markers
  Stream<List<StartLocationModel>> readAllStarts() =>
      starts.snapshots().map((snapshot) => snapshot.docs
          .map((doc) =>
              StartLocationModel.fromJson(doc.data() as Map<String, dynamic>))
          .toList());
}
