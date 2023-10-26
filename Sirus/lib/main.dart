import 'package:flex_color_scheme/flex_color_scheme.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:rapyd/rapyd.dart';
import 'package:taxiflex/Screens/screens.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:taxiflex/Services/services.dart';
import 'Helper/secrets.dart';
import 'firebase_options.dart';

RapydClient rapydClient = RapydClient(
  rapydAccessKey,
  rapydSecretKey,
);

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  runApp(MultiProvider(
    providers: [
      Provider(create: (_) => StartLocationService()),
      Provider(create: (_) => ShortRouteService()),
      Provider(create: (_) => OrderServices()),
      ChangeNotifierProvider(create: (_) => SignInProvider()),
      ChangeNotifierProvider(create: (_) => StartSelectionService()),
      ChangeNotifierProvider(create: (_) => InternetProvider()),
    ],
    child: const MyApp(),
  ));
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'taxiflex',
      debugShowCheckedModeBanner: false,
      theme: FlexThemeData.light(
  scheme: FlexScheme.bigStone,
  surfaceMode: FlexSurfaceMode.highScaffoldLowSurface,
  blendLevel: 20,
  appBarOpacity: 0.95,
  subThemesData: const FlexSubThemesData(
    blendOnLevel: 20,
    blendOnColors: false,
    inputDecoratorUnfocusedBorderIsColored: false,
  ),
  visualDensity: FlexColorScheme.comfortablePlatformDensity,
),
darkTheme: FlexThemeData.dark(
  scheme: FlexScheme.bigStone,
  surfaceMode: FlexSurfaceMode.highScaffoldLowSurface,
  blendLevel: 15,
  appBarOpacity: 0.90,
  subThemesData: const FlexSubThemesData(
    blendOnLevel: 30,
    inputDecoratorUnfocusedBorderIsColored: false,
  ),
  visualDensity: FlexColorScheme.comfortablePlatformDensity,

),

      themeMode: ThemeMode.system,
      home: const SplashScreen(),
    );
  }
}
