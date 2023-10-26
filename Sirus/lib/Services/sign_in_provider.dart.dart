import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class SignInProvider extends ChangeNotifier {
  // instance of firebaseauth
  final FirebaseAuth firebaseAuth = FirebaseAuth.instance;

  bool _isSignedInAsRider = false;
  bool get isSignedInAsRider => _isSignedInAsRider;

  bool _isSignedInAsDriver = false;
  bool get isSignedInAsDriver => _isSignedInAsDriver;

  //hasError, errorCode, provider,uid, email, name, imageUrl
  final bool _hasError = false;
  bool get hasError => _hasError;

  String? _errorCode;
  String? get errorCode => _errorCode;

  String? _provider;
  String? get provider => _provider;

  String? _accNo;
  String? get accNo => _accNo;

  String? _farePrice;
  String? get farePrice => _farePrice;

  String? _uidD;
  String? get uidD => _uidD;

    String? _uidR;
  String? get uidR => _uidR;

  String? _phoneNo;
  String? get phoneNo => _phoneNo;

  String? _name;
  String? get name => _name;

  String? _seatCount;
  String? get seatCount => _seatCount;

  String? _numberPlate;
  String? get numberPlate => _numberPlate;

  SignInProvider() {
    checkSignInRider();
    checkSignInDriver();
  }

  Future checkSignInRider() async {
    final SharedPreferences s = await SharedPreferences.getInstance();
    _isSignedInAsRider = s.getBool("signed_in_as_rider") ?? false;
    notifyListeners();
  }

  Future checkSignInDriver() async {
    final SharedPreferences s = await SharedPreferences.getInstance();
    _isSignedInAsDriver = s.getBool("signed_in_as_driver") ?? false;
    notifyListeners();
  }

  Future setSignInAsRider() async {
    final SharedPreferences s = await SharedPreferences.getInstance();
    s.setBool("signed_in_as_rider", true);
    _isSignedInAsRider = true;
    notifyListeners();
  }

  Future setSignInAsDriver() async {
    final SharedPreferences s = await SharedPreferences.getInstance();
    s.setBool("signed_in_as_driver", true);
    _isSignedInAsDriver = true;
    notifyListeners();
  }

  // ENTRY FOR CLOUDFIRESTORE RIDERS
  Future getDriverDataFromFirestore(uidD) async {
    await FirebaseFirestore.instance
        .collection("riders")
        .doc(uidD)
        .get()
        .then((DocumentSnapshot snapshot) => {
              _uidD = snapshot['uidD'],
              _name = snapshot['name'],
              _phoneNo = snapshot['phoneNo'],
              _provider = snapshot['provider'],
              _farePrice = snapshot['farePrice'],
            });
  }

  //* wfioewfioginpghdipgmpdiorhmdpriohmdriohpdrhjmpdrhmpdiodimoprhdmr

  Future getRiderDataFromFirestore(uidR) async {
    await FirebaseFirestore.instance
        .collection("drivers")
        .doc(uidR)
        .get()
        .then((DocumentSnapshot snapshot) => {
              _uidR = snapshot['uidR'],
              _accNo = snapshot['accNo'],
              _numberPlate = snapshot['numberPlate'],
              _seatCount = snapshot['seatCount'],
              _name = snapshot['name'],
              _phoneNo = snapshot['phoneNo'],
              _provider = snapshot['provider'],
            });
  }

  Future saveRiderDataToFirestore() async {
    final DocumentReference r =
        FirebaseFirestore.instance.collection("riders").doc(uidR);
    await r.set({
      "name": _name,
      "phoneNo": _phoneNo,
      "uidR": _uidR,
      "provider": _provider,
    });
    notifyListeners();
  }

  //* wfioewfioginpghdipgmpdiorhmdpriohmdriohpdrhjmpdrhmpdiodimoprhdmr
  Future saveDriverDataToFirestore() async {
    final DocumentReference r =
        FirebaseFirestore.instance.collection("drivers").doc(uidD);
    await r.set({
      "name": _name,
      "phoneNo": _phoneNo,
      "uidD": _uidD,
      "provider": _provider,
      "accNo": _accNo,
      "seatCount": _seatCount,
      "numberPlate": _numberPlate,
      "farePrice": _farePrice,
    });
    notifyListeners();
  }

  Future saveRiderDataToSharedPreferences() async {
    final SharedPreferences s = await SharedPreferences.getInstance();
    await s.setString('name', _name!);
    await s.setString('uidR', _uidR!);
    await s.setString('phoneNo', _phoneNo!);
    await s.setString('provider', _provider!);
    notifyListeners();
  }

  //* wfioewfioginpghdipgmpdiorhmdpriohmdriohpdrhjmpdrhmpdiodimoprhdmr
  Future saveDriverDataToSharedPreferences() async {
    final SharedPreferences s = await SharedPreferences.getInstance();
    await s.setString('name', _name!);
    await s.setString('uidD', _uidD!);
    await s.setString('phoneNo', _phoneNo!);
    await s.setString('provider', _provider!);
    await s.setString('accNo', _accNo!);
    await s.setString('numberPlate', _numberPlate!);
    await s.setString('farePrice', _farePrice!);
    await s.setString('seatCount', _seatCount!);
    notifyListeners();
  }

  Future getRiderDataFromSharedPreferences() async {
    final SharedPreferences s = await SharedPreferences.getInstance();
    _name = s.getString('name');
    _uidR = s.getString('uidR');
    _phoneNo = s.getString('phoneNo');
    _provider = s.getString('provider');
    notifyListeners();
  }

  //* wfioewfioginpghdipgmpdiorhmdpriohmdriohpdrhjmpdrhmpdiodimoprhdmr
  Future getDriverDataFromSharedPreferences() async {
    final SharedPreferences s = await SharedPreferences.getInstance();
    _name = s.getString('name');
    _uidD = s.getString('uidD');
    _phoneNo = s.getString('phoneNo');
    _provider = s.getString('provider');
    _farePrice = s.getString('farePrice');
    _accNo = s.getString('accNo');
    _seatCount = s.getString('seatCount');
    _numberPlate = s.getString('numberPlate');
    notifyListeners();
  }

  // check Rider exists or not in cloudfirestore
  Future<bool> checkRiderExists() async {
    DocumentSnapshot snap =
        await FirebaseFirestore.instance.collection('riders').doc(_uidR).get();
    if (snap.exists) {
      print("EXISTING USER");
      return true;
    } else {
      print("NEW USER");
      return false;
    }
  }

  //* wfioewfioginpghdipgmpdiorhmdpriohmdriohpdrhjmpdrhmpdiodimoprhdmr

  Future<bool> checkDriverExists() async {
    DocumentSnapshot snap =
        await FirebaseFirestore.instance.collection('drivers').doc(_uidD).get();
    if (snap.exists) {
      print("EXISTING USER");
      return true;
    } else {
      print("NEW USER");
      return false;
    }
  }

  Future clearStoredData() async {
    final SharedPreferences s = await SharedPreferences.getInstance();
    s.clear();
  }

  // signout
  Future userSignOut() async {
    await firebaseAuth.signOut;

    _isSignedInAsRider = false;
    _isSignedInAsDriver = false;
    notifyListeners();
    // clear all storage information
    clearStoredData();
  }

  void phoneNumberDriver(
      {required User user, name, numberPlate, accNo, seatCount, phoneNo, farePrice}) {
    _name = name;
    _accNo = accNo;
    _farePrice = farePrice;
    _seatCount = seatCount;
    _numberPlate = numberPlate;
    _uidD = user.uid;
    _phoneNo = phoneNo;
    _provider = "PHONE";
    notifyListeners();
  }

  //* wfioewfioginpghdipgmpdiorhmdpriohmdriohpdrhjmpdrhmpdiodimoprhdmr
  void phoneNumberRider({
    required User user,
    phoneNo,
    name,
  }) {
    _name = name;
    _uidR = user.uid;
    _phoneNo = phoneNo;
    _provider = "PHONE";
    notifyListeners();
  }
}
