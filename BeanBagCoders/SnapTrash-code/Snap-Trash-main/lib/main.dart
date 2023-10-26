import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:snap_trash/firebase_options.dart';
import 'package:snap_trash/pages/cameraScreen.dart';
import 'package:snap_trash/pages/locationPages/locationPrompt.dart';
import 'package:snap_trash/pages/infoMainPage.dart';
import 'package:camera/camera.dart';
import 'package:geolocator/geolocator.dart';
import 'package:snap_trash/pages/loginSignin/authentication/auth.dart';
import 'package:snap_trash/properties/colourProp.dart';
import 'package:firebase_auth/firebase_auth.dart';

late List<CameraDescription> _cameras;
// late bool serviceEnabled;

List<CameraDescription> getCamera() {
  return _cameras;
}

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  _cameras = await availableCameras();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );

  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: auth(),
    );
  }
}

// camera

class cameraMain extends StatefulWidget {
  const cameraMain({super.key});

  @override
  State<cameraMain> createState() => _cameraMainState();
}

class _cameraMainState extends State<cameraMain> {
  late CameraController _cameraController;

  Future<void> initCamera({required bool frontCamera}) async {
    _cameraController =
        CameraController(_cameras[(frontCamera) ? 0 : 1], ResolutionPreset.max);
    _cameraController.initialize().then((_) {
      if (!mounted) {
        return;
      }
      setState(() {});
    }).catchError(
      (Object e) {
        if (e is CameraException) {
          switch (e.code) {
            case 'CameraAccessDenied':
              // Handle access errors here.
              break;
            default:
              // Handle other errors here.
              break;
          }
        }
      },
    );
  }

  @override
  void initState() {
    super.initState();
    if (_cameras.isNotEmpty) {
      initCamera(frontCamera: true);
    }
    initCamera(frontCamera: true);
  }

  @override
  void dispose() {
    if (_cameraController != null) {
      _cameraController.dispose();
    }
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return cameraScreen(
      cameraController: _cameraController,
      initCamera: initCamera,
    );
  }
}

// location

class getLocationCoordinates extends StatefulWidget {
  const getLocationCoordinates({super.key});
  static String? locationMessage;

  @override
  State<getLocationCoordinates> createState() => _getLocationCoordinatesState();
}

class _getLocationCoordinatesState extends State<getLocationCoordinates> {
  late String lat;
  late String long;
  late String? locationMessage;

  // for location to work
  Future<Position> getCurrentLocation() async {
    Position position = await Geolocator.getCurrentPosition(
      desiredAccuracy: LocationAccuracy.high,
    );

    bool serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
      return Future.error('location services are dissabled');
    }

    LocationPermission permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
      if (permission == LocationPermission.denied) {
        return Future.error('location Permission are denied');
      }
    }

    if (permission == LocationPermission.deniedForever) {
      return Future.error(
        'locationpermission denied,  we cannot process request',
      );
    }
    return await Geolocator.getCurrentPosition();
  }

  @override
  Widget build(BuildContext context) {
    String? locationMessagePass() {
      return locationMessage;
    }

    // size variable
    double screenWidth = MediaQuery.of(context).size.width;
    double screenheight = MediaQuery.of(context).size.height;

    return ElevatedButton(
      onPressed: () {
        getCurrentLocation().then(
          (value) {
            lat = '${value.latitude}';
            long = '${value.longitude}';
            locationMessage = 'latitude: $lat, Longitude: $long';
            print(locationMessage);
          },
        );
        Navigator.push(
          context,
          DialogRoute(
            context: context,
            builder: (context) => locationPromptPage(),
          ),
        );
      },
      style: ElevatedButton.styleFrom(
        backgroundColor: Colors.transparent,
        // foregroundColor: Colors.black,
        elevation: 0,
      ),
      child: Icon(
        Icons.circle_outlined,
        size: screenheight * 0.1,
        color: rangBackground,
      ),
    );
  }
}
