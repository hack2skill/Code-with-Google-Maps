import 'package:flutter/cupertino.dart';
import 'package:grabup/dataprovider/address.dart';
import 'package:grabup/dataprovider/destination.dart';

class AppData extends ChangeNotifier {
  Address? currentLocation;
  Destination? destination;

  void updateCurrentAddress(Address current) {
    currentLocation = current;
    notifyListeners();
  }

  void updateDestinationAddress(Destination currentDest) {
    destination = currentDest;
    notifyListeners();
  }
}
