import 'package:flutter/material.dart';
import 'package:taxiflex/Models/start_location_model.dart';

class StartSelectionService extends ChangeNotifier {
  //* A class to contain the currently selected start location
  StartLocationModel? _startLocation;

  StartLocationModel? get selectedStartLocation => _startLocation;
  set selectedStartLocation(StartLocationModel? value) {
    _startLocation = value;
    notifyListeners();
  }
}
