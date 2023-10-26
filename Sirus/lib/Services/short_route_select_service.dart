import 'package:flutter/material.dart';

import '../Models/models.dart';

class ShortRouteSelectService extends ChangeNotifier {
  ShortRouteModel? _shortRouteModel;

  ShortRouteModel? get selectedShortRoute => _shortRouteModel;
  set selectedShortRoute(ShortRouteModel? value) {
    _shortRouteModel = value;
    notifyListeners();
  }
}
